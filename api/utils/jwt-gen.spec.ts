import { DID } from '../did/register/did-register'

const faker = require('faker')
const jwt = require('jsonwebtoken')

import { KEY_TYPE, VC_STATUS } from '../consts'
import { DIDNonce } from '../did/register/nonce'
import { VC } from '../vc/register/vc'
// import { SchemaBody } from '../verification/schema-body'
// import { Schema } from '../verification/schema'
import { DIDDoc } from '../did/docs/doc'
import { EXAMPLE_VP } from '../verification/vc-vp-verify/example-vc-vp'
import { CryptoHelper } from './rsa-CrytoHelper'
import { VCStatus } from '../vc/status/status'
import { Gen } from '../verification/vc-vp-verify/gen-vc-vp'

let getInitState: any = () => ({
  keyId: '',
  didKey1: [],
  didKey2: [],
  didKey3: [],
  issuerKey1: [],
  schemaId: '',
  issuanceDate: '',
  data: {
    did: '',
    nonce: ''
  },
  issuer: {
    did: ''
  },
  audience: {
    did: ''
  },
  didId: '',
  cid: ''
})

describe('JWT Gen', () => {

  const state = getInitState()
  jest.setTimeout(20000)

  test('jwt VC', async () => {
    try {
      const issRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('Issuer Register: ', JSON.stringify(issRegister.request.data, null, 2))
      expect(issRegister.request.status).toEqual(201)
      state.issuer.did = issRegister.request.data.id
      state.issuerKey1 = issRegister.didKey1

      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const nonce1 = await DIDNonce.getDIDNonce(state.issuer.did)
      console.log('Nonce 1: ', JSON.stringify(nonce1.data, null, 2))
      expect(nonce1.status).toEqual(200)
      state.data.nonce = nonce1.data.nonce

      const vcRegister = await VC.Register(state.issuer.did, state.issuerKey1, state.data.nonce)
      console.log('VC Register: ', JSON.stringify(vcRegister.data, null, 2))
      expect(vcRegister.status).toEqual(201)
      state.cid = vcRegister.data.cid

      const nonce2 = await DIDNonce.getDIDNonce(state.issuer.did)
      console.log('Nonce 2: ', JSON.stringify(nonce2.data, null, 2))
      expect(nonce2.status).toEqual(200)
      state.data.nonce = nonce2.data.nonce

      // const schemaName = faker.name.title()
      // const schemaType = faker.name.firstName() + `'sDocument` + '_Type'
      // const schemabodyDesc = faker.name.jobTitle()
      // const schemaBodyType = 'object'
      // const schemaBodyProperties = {
      //   'example_string': {
      //     'type': 'string'
      //   }
      // }
      // const schemaRequired = ['example_string']
      // const additional = false
      //
      // const schemaBody = SchemaBody.Message(schemaName, schemabodyDesc, schemaBodyType, schemaBodyProperties, schemaRequired, additional)
      // console.log('SchemaBody: ', JSON.stringify(schemaBody, null, 2))

      // const createSchema = await Schema.Create(schemaName, schemaType, schemaBody)
      // console.log('Create Schema: ', JSON.stringify(createSchema.data, null, 2))
      // // expect(createSchema.status).toEqual(201)
      // state.schemaId = createSchema.data.id

      const didDocHistory1 = await DIDDoc.GetHistory(state.issuer.did)
      console.log('DID Doc History1 : ', JSON.stringify(didDocHistory1.data, null, 2))
      expect(didDocHistory1.status).toEqual(200)
      state.keyId = didDocHistory1.data.did_document[0].VerificationMethod[0].id

      const nonce3 = await DIDNonce.getDIDNonce(state.issuer.did)
      console.log('Nonce 3: ', JSON.stringify(nonce3.data, null, 2))
      expect(nonce3.status).toEqual(200)
      state.data.nonce = nonce3.data.nonce

      const header = {
        alg: 'HS256',
        typ: 'JWT',
        kid: state.keyId
      }

      // const vcSubject = {
      //   'store': 'เช่าหนี่',
      //   'movies': [{
      //     'title': 'Iron Man',
      //     'year': 2008,
      //     'directors': [{
      //       'firstname': 'Jon',
      //       'lastname': 'Favreau'
      //     }]
      //   }],
      //   'customer': {
      //     'firstname': 'Tony',
      //     'lastname': 'Woonsen'
      //   }
      // }

      const vcSubject = {
        'store': 'เช่าหนี่',
        'customer': 'Tony Woonsen'

      }

      const payload = {
        'jti': state.cid,
        'iss': state.issuer.did,
        'sub': state.issuer.did,
        'issuanceDate': '2021-08-20T08:09:52.117Z',
        'expirationDate': '2022-08-20T08:09:52.117Z',
        vc: {
          '@context': [
            'https://www.w3.org/2018/credentials/v1'
          ],
          'type': [
            'VerifiableCredential',
            'JsonSchemaValidator2018'
          ],
          credentialSubject: vcSubject,
          'credentialSchema': {
            'id': 'https://ssi-test.teda.th/api/schemas/b6b96576-d823-40ae-8bff-97ba3884e207/2.0.0/schema',
            'type': 'JsonSchemaValidator2018'
          }
        }
        // 'vc': {
        //   '@context': ['https://www.w3.org/2018/credentials/v1'],
        //   type: [EXAMPLE_VC.TYPE[0], 'ok_type'],
        //   credentialSchema: {
        //     id: `https://ssi-test.teda.th/api/schemas/085dc5d5-51f1-49ff-89dd-8103421dd416/1.0.0/schema`,
        //     type: 'JsonSchemaValidator2018'
        //   },
        //   credentialSubject: vcSubject,
        //   'iat': 1629786033
        // }
      }

      console.log('Header:', JSON.stringify(header, null, 2))
      console.log('Payload:', JSON.stringify(payload, null, 2))

      const secret = faker.name.firstName()
      console.log('Secret: ', secret)

      const token = await jwt.sign(payload, secret, { keyid: state.keyId })
      console.log('token: ', token)

      const base64Header = CryptoHelper.encodeBase64(JSON.stringify(header)).replace(/=/g, '')
      const header_payload = base64Header + '.' + token.split('.')[1]
      console.log('h', header_payload)
      const signature = CryptoHelper.sign(state.issuerKey1[0].private_key, header_payload)

      const jwtVc = `${header_payload}.${signature}`
      console.log('VC JWT: ', JSON.stringify(jwtVc, null, 2))

      console.log('JWT: ', JSON.stringify(jwtVc, null, 2))

      const vcAddStatus = await VCStatus.Add(state.cid, state.issuer.did, VC_STATUS.ACTIVE,
        state.issuerKey1, state.data.nonce, jwtVc)
      console.log('Add VC Status: ', JSON.stringify(vcAddStatus.data, null, 2))
      expect(vcAddStatus.status).toEqual(200)
      expect(vcAddStatus.data.cid).toBe(state.cid)
      expect(vcAddStatus.data.did_address).toBe(state.issuer.did)
      expect(vcAddStatus.data.status).toBe(VC_STATUS.ACTIVE)
      expect(vcAddStatus.data.vc_hash).toBe(jwtVc)

    } catch (err) {
      console.log(err.response)
      expect(err).not.toBeTruthy()
    }
  })

  test('Gen VP', async () => {
    try {
      state.cid = '80bfc88dbf1145173f524b8be6ce6ef8a7bec2302608a2da6b4a5b84a74c8272'
      state.didKey1 = [
        {
          'private_key': '-----BEGIN PRIVATE KEY-----\nMIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgOmkocJIImAxd2wjW\np4LGwAH7oq+EDz5X4EZHph6DL4WhRANCAARrL/sIo0terRlrR+fIFRYQ4hAm7Wto\nkdhDDS6JmYFEIYCXrcdfLNTBw/ZtmWU11bmK4m7jga8OqhIW0Rzw1Tri\n-----END PRIVATE KEY-----\n',
          'public_key': '-----BEGIN PUBLIC KEY-----\nMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEay/7CKNLXq0Za0fnyBUWEOIQJu1r\naJHYQw0uiZmBRCGAl63HXyzUwcP2bZllNdW5iuJu44GvDqoSFtEc8NU64g==\n-----END PUBLIC KEY-----\n'
        }
      ]
      state.issuanceDate = ''
      state.data.did = 'did:idin:8cdfa799ed00cb7d78aceaa334dbc7c14bb1e2deb76b56e13e9443024c83d61c'
      state.audience.did = 'did:idin:80171d414813793e2fe813c0b43ae5a537ac43a77094f60701d809db804c94d6'
      state.keyId = '29edf321776473f2d5b0fb569ea859d97aff713ea8e468437abd672ead4d5734'
      state.schemaId = 'https://ssi-test.teda.th/api/schemas/d5f11a63-1a04-441a-aa27-bb16e1fe431d/1.0.4/schema'
      const jwtVc = 'yJhbGciOiJFUzI1NiIsImtpZCI6IjI5ZWRmMzIxNzc2NDczZjJkNWIwZmI1NjllYTg1OWQ5N2FmZjcxM2VhOGU0Njg0MzdhYmQ2NzJlYWQ0ZDU3MzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJkaWQ6aWRpbjo4MDE3MWQ0MTQ4MTM3OTNlMmZlODEzYzBiNDNhZTVhNTM3YWM0M2E3NzA5NGY2MDcwMWQ4MDlkYjgwNGM5NGQ2IiwianRpIjoiZDZmMTBiYjcxMjMzMjQ3NmViMTc2ODI1MzM4MjU3Zjg2NDU3OGMyZDM5ZGY5MTdjMDc4ZTA3Mzk4MmJjNGU4OSIsIm5iZiI6MTYzMDU1OTY4NCwibm9uY2UiOiI0Yjk3OGI3MTNkZmU3ZDM3M2ExYzZhMzcwZGE1Y2FmMiIsInN1YiI6ImRpZDppZGluOjhjZGZhNzk5ZWQwMGNiN2Q3OGFjZWFhMzM0ZGJjN2MxNGJiMWUyZGViNzZiNTZlMTNlOTQ0MzAyNGM4M2Q2MWMiLCJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiR2lsbGlhbidzRG9jdW1lbnRfVHlwZSJdLCJjcmVkZW50aWFsU3ViamVjdCI6eyJleGFtcGxlX3N0cmluZyI6IlRvbnkifSwiY3JlZGVudGlhbFNjaGVtYSI6eyJpZCI6Imh0dHBzOi8vc3NpLXRlc3QudGVkYS50aC9hcGkvc2NoZW1hcy8xOWVlMjljMS0wYjY1LTRlZTUtYmE2Ny0zNmU3ZGNmZDQ2MmIvMS4wLjAvc2NoZW1hIiwidHlwZSI6IkdpbGxpYW4nc0RvY3VtZW50X1R5cGUifX19.MEQCICo5ky1F3uyVG8oqwi7ZaklcysclJ+NnbZ1rqOdpK2m5AiAlErBpdPRve6BFiu17TgvzKDXMQlbhfuQ79Aa+L3skwg=='
      // @ts-ignore
      const jwtVp = await Gen.VP(jwtVc, state.cid, state.data.did,
        state.audience.did, state.didKey1, state.keyId,
        state.schemaId, EXAMPLE_VP.TYPE)
      console.log('vp_jwt: ', jwtVp)
    } catch (err) {
      console.log(err.response)
      expect(err).not.toBeTruthy()
    }
  })
})
