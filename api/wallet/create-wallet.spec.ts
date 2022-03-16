import { Wallet } from './wallet'
import { ERR_REQUIRE, INVALID, KEY_TYPE } from '../consts'
import { DID } from './material/did-register'
import { v4 as uuidv4 } from 'uuid'

let getInitState: any = () => ({
  schemaId: '',
  didKey1: [],
  didKey2: [],
  data: {
    did: '',
    nonce: '',
    did2: '',
    nonce2: ''
  }
})

describe('Create Wallet', () => {
  const state = getInitState()
  jest.setTimeout(20000)

  beforeEach(() => {
    state.didKey1 = []
  })

  test('Create Wallet', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      state.didKey1 = didRegister.didKey1
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1
      state.didKey2 = didRegister.didKey2

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)
      expect(createWallet.data.id).toBe(state.data.did)
      expect(createWallet.data.did_address).toBe(state.data.did)
      expect(createWallet.data.created_at).not.toBe(null)
      expect(createWallet.data.deleted_at).toBe(null)
    } catch (err) {
      console.log(err.response)
      console.log(err.response.data)
      expect(err).not.toBeTruthy()
    }
  })

  test('Create Wallet - Send request with incorrect did_address', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      state.didKey1 = didRegister.didKey1
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const dummyDid = `did:idin:${uuidv4()}`
      const createWallet = await Wallet.Create(dummyDid, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.INVALID_DID_ADDRESS.CODE)
      expect(err.response.data.message).toBe(INVALID.INVALID_DID_ADDRESS.MESSAGE)
    }
  })

  test('Create Wallet - Send request without did_address', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      state.didKey1 = didRegister.didKey1
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const createWallet = await Wallet.Create('', state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.PARAMS.CODE)
      expect(err.response.data.message).toBe(INVALID.PARAMS.MESSAGE)
      expect(err.response.data.fields.did_address.code).toBe(ERR_REQUIRE.DID_ADDRESS.CODE)
      expect(err.response.data.fields.did_address.message).toBe(ERR_REQUIRE.DID_ADDRESS.MESSAGE)
    }
  })

  test('Create Wallet by other\'s did & other\'s private_key', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const didRegister2 = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register2: ', JSON.stringify(didRegister2.request.data, null, 2))
      expect(didRegister2.request.status).toEqual(201)
      state.data.did2 = didRegister2.request.data.id
      state.didKey2 = didRegister2.didKey1

      const createWallet = await Wallet.Create(state.data.did, state.didKey2)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.SIGNATURE.CODE)
      expect(err.response.data.message).toBe(INVALID.SIGNATURE.MESSAGE)
    }
  })
})
