import { Wallet } from './wallet'
import { INVALID, KEY_TYPE, VC_STATUS } from '../consts'
import { DID } from './material/did-register'
import { DIDNonce } from './material/nonce'
import { VC } from './material/vc'
import { VCStatus } from './material/status'
import { Gen } from './material/gen-vc-vp'
import { Verify } from './material/verify'
import { DIDDoc } from './material/doc'
import { SchemaBody } from './material/schema-body'
import { Schema } from './material/schema'
import { v4 as uuidv4 } from 'uuid'

const faker = require('faker')

let getInitState: any = () => ({
  schemaId: '',
  didKey1: [],
  didKey2: [],
  data: {
    did: '',
    nonce: '',
    did2: '',
    nonce2: ''
  },
  issuer: {
    did: ''
  },
  keyId: '',
  vcId: ''
})

describe('Get VC from cloud wallet', () => {
  const state = getInitState()
  jest.setTimeout(20000)

  beforeEach(() => {
    state.didKey1 = []
  })

  test('Get VC from cloud wallet', async () => {
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

      const schemaName = faker.name.title()
      const schemaType = faker.name.firstName() + `'sDocument` + '_Type'
      const schemabodyDesc = faker.name.jobTitle()
      const schemaBodyType = 'object'
      const schemaBodyProperties = {
        'example_string': {
          'type': 'string'
        }
      }
      const schemaRequired = ['example_string']
      const additional = true

      const schemaBody = SchemaBody.Message(schemaName, schemabodyDesc, schemaBodyType, schemaBodyProperties, schemaRequired, additional)
      console.log('SchemaBody: ', JSON.stringify(schemaBody, null, 2))

      const createSchema = await Schema.Create(schemaName, schemaType, schemaBody)
      console.log('Create Schema: ', JSON.stringify(createSchema.data, null, 2))
      // expect(createSchema.status).toEqual(201)
      state.schemaId = createSchema.data.id
      state.schemaName = createSchema.data.schema_name

      const didDocHistory1 = await DIDDoc.GetHistory(state.issuer.did)
      console.log('DID Doc History1 : ', JSON.stringify(didDocHistory1.data, null, 2))
      expect(didDocHistory1.status).toEqual(200)
      state.keyId = didDocHistory1.data.did_document[0].verificationMethod[0].id

      const nonce3 = await DIDNonce.getDIDNonce(state.issuer.did)
      console.log('Nonce 3: ', JSON.stringify(nonce3.data, null, 2))
      expect(nonce3.status).toEqual(200)
      state.data.nonce = nonce3.data.nonce

      const vcSubject = { 'example_string': 'Tony' }
      const jwtVc = await Gen.VC(state.cid, state.data.did, state.issuer.did, state.issuerKey1,
        state.keyId, state.schemaId, state.schemaName, schemaType, state.issuanceDate, vcSubject)

      const vcAddStatus = await VCStatus.Add(state.cid, state.issuer.did, VC_STATUS.ACTIVE,
        state.issuerKey1, state.data.nonce, jwtVc)
      console.log('Add VC Status: ', JSON.stringify(vcAddStatus.data, null, 2))
      expect(vcAddStatus.status).toEqual(200)

      const vcGetStatus = await VCStatus.Get(state.cid)
      console.log('Get VC Status: ', JSON.stringify(vcGetStatus.data, null, 2))
      expect(vcGetStatus.status).toEqual(200)
      state.issuanceDate = vcGetStatus.data.created_at

      const vcVerify = await Verify.VC(jwtVc)
      console.log('VC Verify: ', JSON.stringify(vcVerify.request.data, null, 2))
      expect(vcVerify.request.status).toEqual(200)
      expect(vcVerify.request.data.verification_result).toBe(true)

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)

      const addVCtoCloud = await Wallet.AddVCtoCloud(jwtVc, state.data.did, state.didKey1, state.data.did)
      console.log('Add VC to Cloud: ', JSON.stringify(addVCtoCloud.data, null, 2))
      expect(addVCtoCloud.status).toEqual(200)

      const getVCfromCloud = await Wallet.GetVCfromCloud(state.data.did, state.didKey1)
      console.log('Get VC from Cloud: ', JSON.stringify(getVCfromCloud.data, null, 2))
      expect(getVCfromCloud.status).toEqual(200)
      expect(getVCfromCloud.data.items[0].id).toBe(state.cid)
      expect(getVCfromCloud.data.items[0].cid).toBe(state.cid)
      expect(getVCfromCloud.data.items[0].jwt).toBe(jwtVc)
      expect(getVCfromCloud.data.items[0].issuer).toBe(state.issuer.did)
      expect(getVCfromCloud.data.items[0].holder).toBe(state.data.did)
      expect(getVCfromCloud.data.items[0].status).toBe(VC_STATUS.ACTIVE)
    } catch (err) {
      console.log(err.response)
      expect(err).not.toBeTruthy()
    }
  })

  test('Get VC from cloud wallet by invalid signature', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1
      state.didKey2 = didRegister.didKey2

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)

      const getVCfromCloud = await Wallet.GetVCfromCloud(state.data.did, state.didKey2)
      console.log('Get VC from Cloud: ', JSON.stringify(getVCfromCloud.data, null, 2))
      expect(getVCfromCloud.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.SIGNATURE.CODE)
      expect(err.response.data.message).toBe(INVALID.SIGNATURE.MESSAGE)
    }
  })

  test('Get VC from cloud wallet by incorrect did_address', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1
      state.didKey2 = didRegister.didKey2

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)

      const dummyDid = `did:idin:${uuidv4()}`
      const getVCfromCloud = await Wallet.GetVCfromCloud(dummyDid, state.didKey1)
      console.log('Get VC from Cloud: ', JSON.stringify(getVCfromCloud.data, null, 2))
      expect(getVCfromCloud.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.INVALID_DID_ADDRESS.CODE)
      expect(err.response.data.message).toBe(INVALID.INVALID_DID_ADDRESS.MESSAGE)
    }
  })
})
