import { EXAMPLE_VC, EXAMPLE_VP } from './example-vc-vp'
import { CONFIG } from '../../consts'
import { CryptoHelper } from '../../utils/rsa-CrytoHelper'

const faker = require('faker')
const jwt = require('jsonwebtoken')

const genJsonBodyForVC = (obj: {
  cid: string, did_address: string, issuer_did: string, schema_id: string, schema_name:string,vc: string,
  vc_type: string, issuance_date: string
}) => {
  return {
    sub: obj.did_address,
    jti: obj.cid,
    iss: obj.issuer_did,
    nbf: 1541493724,
    // iat: 1541493724,
    // exp: 1573029723,
    vc: {
      credentialSchema: {
        id: `${CONFIG.BASE_URL}/api/schemas/${obj.schema_id}/1.0.0/${obj.schema_name.replace(/[^A-Za-z0-9]+/g, "")}.json`,
        type: 'JsonSchemaValidator2018'
      },
      type: [EXAMPLE_VC.TYPE[0], obj.vc_type],
      credentialSubject: obj.vc,
      issuanceDate: obj.issuance_date
    }
  }
}

const genJsonBodyForVP = (obj: {
  cid: string, issuer_did: string, audience_did: string, schema_id: string, vc: any, vp_type: string, issuance_date: string
}) => {
  return {
    // sub: obj.did_address,
    nbf: 1541493724,
    jti: obj.cid,
    aud: obj.audience_did,
    iss: obj.issuer_did,
    // nbf: 1541493724,
    // iat: 1541493724,
    // exp: 1573029723,
    vp: {
      // credentialSchema: {
      //   id: `${CONFIG.BASE_URL}/vc/schema/${obj.schema_id}/1.0.0`,
      //   type: 'JsonSchemaValidator2018'
      // },
      type: [obj.vp_type],
      verifiableCredential: [obj.vc],
      issuanceDate: obj.issuance_date
    }
  }
}

const genJsonBodyForVPwithMultipleVc = (obj: {
  cid: string, issuer_did: string, audience_did: string, schema_id: string, vc: any, vc_type: string, issuance_date: string
}) => {
  return {
    // sub: obj.did_address,
    jti: obj.cid,
    aud: obj.audience_did,
    iss: obj.issuer_did,
    // nbf: 1541493724,
    // iat: 1541493724,
    // exp: 1573029723,
    vp: {
      // credentialSchema: {
      //   id: `${CONFIG.BASE_URL}/vc/schema/${obj.schema_id}/1.0.0`,
      //   type: 'JsonSchemaValidator2018'
      // },
      type: [EXAMPLE_VP.TYPE, obj.vc_type],
      verifiableCredential: obj.vc,
      issuanceDate: obj.issuance_date
    }
  }
}

const genJsonHeader = (obj: {
  key_id: string
}) => {
  return {
    alg: 'ES256',
    typ: 'JWT',
    kid: obj.key_id
  }
}

export class Gen {
  static async VC (vcId: string, holderDid: string, issuerDid: string, didKey: any,
    keyId: string, schemaId: string, schemaName: string,vcType: string, issuanceDate: string, vc: any) {
    const header = genJsonHeader({
      key_id: keyId
    })
    const payload = genJsonBodyForVC({
      cid: vcId,
      did_address: holderDid,
      issuer_did: issuerDid,
      vc: vc,
      vc_type: vcType,
      schema_id: schemaId,
      schema_name: schemaName,
      issuance_date: issuanceDate
    })
    console.log('Header:', JSON.stringify(header, null, 2))
    console.log('Payload:', JSON.stringify(payload, null, 2))

    const secret = faker.name.firstName()
    console.log('Secret: ', secret)

    const token = await jwt.sign(payload, secret, { keyid: keyId })

    const base64Header = CryptoHelper.encodeBase64(JSON.stringify(header)).replace(/=/g, '')
    const header_payload = base64Header + '.' + token.split('.')[1]
    const signature = CryptoHelper.sign(didKey[0].private_key, header_payload)

    const jwtVc = `${header_payload}.${signature}`
    console.log('VC JWT Request: ', JSON.stringify(jwtVc, null, 2))
    return jwtVc
  }

  static async VP (jwtVc: any, vcId: string, issuerDid: string, audienceDid: string, didKey: any,
    keyId: string, schemaId: string, vpType: string, issuanceDate: string) {

    const header = genJsonHeader({
      key_id: keyId
    })

    const payload = genJsonBodyForVP({
      cid: vcId,
      vc: jwtVc,
      issuer_did: issuerDid,
      audience_did: audienceDid,
      schema_id: schemaId,
      issuance_date: issuanceDate,
      vp_type: vpType
    })
    console.log('Header:', JSON.stringify(header, null, 2))
    console.log('Payload:', JSON.stringify(payload, null, 2))

    const secret = faker.name.firstName()
    console.log('Secret: ', secret)

    const token = await jwt.sign(payload, secret, { keyid: keyId })

    const base64Header = CryptoHelper.encodeBase64(JSON.stringify(header)).replace(/=/g, '')
    const header_payload = base64Header + '.' + token.split('.')[1]
    const signature = CryptoHelper.sign(didKey[0].private_key, header_payload)

    const jwtVp = `${header_payload}.${signature}`
    console.log('VP JWT Request: ', JSON.stringify(jwtVp, null, 2))

    return jwtVp
  }

  static async VPwithMultipleVC (jwtVc: any, vcId: string, issuerDid: string, audienceDid: string, didKey: any,
    keyId: string, schemaId: string, vcType: string, issuanceDate: string) {

    const header = genJsonHeader({
      key_id: keyId
    })

    const payload = genJsonBodyForVPwithMultipleVc({
      cid: vcId,
      vc: jwtVc,
      issuer_did: issuerDid,
      audience_did: audienceDid,
      schema_id: schemaId,
      issuance_date: issuanceDate,
      vc_type: vcType
    })
    console.log('Header:', JSON.stringify(header, null, 2))
    console.log('Payload:', JSON.stringify(payload, null, 2))

    const secret = faker.name.firstName()
    console.log('Secret: ', secret)

    const token = await jwt.sign(payload, secret, { keyid: keyId })

    const base64Header = CryptoHelper.encodeBase64(JSON.stringify(header)).replace(/=/g, '')
    const header_payload = base64Header + '.' + token.split('.')[1]
    const signature = CryptoHelper.sign(didKey[0].private_key, header_payload)

    const jwtVp = `${header_payload}.${signature}`
    console.log('VP JWT Request: ', JSON.stringify(jwtVp, null, 2))

    return jwtVp
  }
}
