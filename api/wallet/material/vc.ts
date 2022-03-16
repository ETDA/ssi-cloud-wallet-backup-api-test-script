import axios from 'axios'
import { CONFIG, OPERATION } from '../../consts'
import { CryptoHelper } from '../../utils/rsa-CrytoHelper'

const genVCRegisterMessage = (obj: {
  did_address: string, nonce: string
}) => {
  return {
    operation: OPERATION.VC_REGISTER,
    did_address: obj.did_address,
    nonce: obj.nonce
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

export class VC {

  static async Register (didAddress: string, didKey: any, nonce: string) {
    const message = genVCRegisterMessage({
      did_address: didAddress,
      nonce: nonce
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: VC Register', JSON.stringify(message, null, 2))
    console.log('headers: VC register',JSON.stringify(res.headers,null, 2))
    console.log('body: VC register',JSON.stringify(res.data,null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/vc`,
      res.data, { headers: res.headers })
  }
}
