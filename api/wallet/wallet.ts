import axios from 'axios'
import { CONFIG, OPERATION } from '../consts'
import { CryptoHelper } from '../utils/rsa-CrytoHelper'

const genCreateWalletMessage = (obj: {
  did_address: string
}) => {
  return {
    operation: OPERATION.WALLET_CREATE,
    did_address: obj.did_address
  }
}

const genVCtoCloudMessage = (obj: {
  did_address: string, jwt: string
}) => {
  return {
    operation: OPERATION.WALLET_VC_ADD,
    did_address: obj.did_address,
    jwt: obj.jwt
  }
}

const genRequestData = (private_key: string, message: any) => {
  const messageData = CryptoHelper.encodeBase64(JSON.stringify(message))
  return {
    data: {
      message: messageData
    },
    headers: {
      'x-signature': CryptoHelper.sign(private_key, messageData)
    }
  }
}

const genSignDid = (private_key: string, didAddress: any) => {
  return {
    headers: {
      'x-signature': CryptoHelper.sign(private_key, didAddress)
    }
  }
}

export class Wallet {

  static async Create (didAddress: string, didKey: any) {
    const message = genCreateWalletMessage({
      did_address: didAddress
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: Create VC Wallet', JSON.stringify(message, null, 2))
    console.log('headers: Create VC Wallet', JSON.stringify(res.headers, null, 2))
    console.log('body: Create VC Wallet', JSON.stringify(res.data, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/api/wallet`,
      res.data, { headers: res.headers })
  }

  static async AddVCtoCloud (jwtVc: string, didAddress: string, didKey: any, didInUrl: string) {
    const message = genVCtoCloudMessage({
      did_address: didAddress,
      jwt: jwtVc
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: VC to Cloud ', JSON.stringify(message, null, 2))
    console.log('headers: VC to Cloud ', JSON.stringify(res.headers, null, 2))
    console.log('body: VC to Cloud ', JSON.stringify(res.data, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/api/wallet/${didInUrl}/vcs`,
      res.data, { headers: res.headers })
  }

  static async GetVCfromCloud (didAddress: string, didKey: any) {
    const res = genSignDid(didKey[0].private_key, didAddress)
    console.log('headers: VC to Cloud ', JSON.stringify(res.headers, null, 2))
    return await axios.get(`${CONFIG.BASE_URL}/api/wallet/${didAddress}/vcs`
      , { headers: res.headers })
  }

  static async GetVCByID (vcId: string, didAddress: string, didKey: any) {
    const res = genSignDid(didKey[0].private_key, didAddress)
    console.log('headers: VC to Cloud ', JSON.stringify(res.headers, null, 2))
    return await axios.get(`${CONFIG.BASE_URL}/api/wallet/${didAddress}/vcs/${vcId}`
      , { headers: res.headers })
  }

  static async GetWallet (didAddress: string, didKey: any) {
    const res = genSignDid(didKey[0].private_key, didAddress)
    console.log('headers: Get wallet ', JSON.stringify(res.headers, null, 2))
    return await axios.get(`${CONFIG.BASE_URL}/api/wallet/${didAddress}`
      , { headers: res.headers })
  }
}
