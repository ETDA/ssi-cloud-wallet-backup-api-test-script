import { DID } from './material/did-register'
import { INVALID, KEY_TYPE } from '../consts'
import { Wallet } from './wallet'
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
  },
  issuer: {
    did: ''
  },
  keyId: ''
})

describe('Get wallet', () => {
  const state = getInitState()
  jest.setTimeout(20000)

  beforeEach(() => {
    state.didKey1 = []
  })

  test('Get wallet', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)

      const getWallet = await Wallet.GetWallet(state.data.did, state.didKey1)
      console.log('Get wallet: ', JSON.stringify(getWallet.data, null, 2))
      expect(getWallet.status).toEqual(200)
      expect(getWallet.data.is_exists).toBe(true)
    } catch (err) {
      console.log(err.response)
      expect(err).not.toBeTruthy()
    }
  })

  test('Get wallet by invalid signature', async () => {
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

      const getWallet = await Wallet.GetWallet(state.data.did, state.didKey2)
      console.log('Get wallet: ', JSON.stringify(getWallet.data, null, 2))
      expect(getWallet.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.SIGNATURE.CODE)
      expect(err.response.data.message).toBe(INVALID.SIGNATURE.MESSAGE)
    }
  })

  test('Get wallet by incorrect did_address', async () => {
    try {
      const didRegister = await DID.Register(KEY_TYPE.EcdsaSecp256r1VerificationKey2019)
      console.log('DID Register: ', JSON.stringify(didRegister.request.data, null, 2))
      expect(didRegister.request.status).toEqual(201)
      state.data.did = didRegister.request.data.id
      state.didKey1 = didRegister.didKey1

      const createWallet = await Wallet.Create(state.data.did, state.didKey1)
      console.log('Create Wallet: ', JSON.stringify(createWallet.data, null, 2))
      expect(createWallet.status).toEqual(201)

      const dummyDid = `did:idin:${uuidv4()}`
      const getWallet = await Wallet.GetWallet(dummyDid, state.didKey1)
      console.log('Get wallet: ', JSON.stringify(getWallet.data, null, 2))
      expect(getWallet.status).toEqual(400)
    } catch (err) {
      console.log(err.response)
      expect(err).toBeTruthy()
      expect(err.response.status).toEqual(400)
      expect(err.response.data.code).toBe(INVALID.INVALID_DID_ADDRESS.CODE)
      expect(err.response.data.message).toBe(INVALID.INVALID_DID_ADDRESS.MESSAGE)
    }
  })
})
