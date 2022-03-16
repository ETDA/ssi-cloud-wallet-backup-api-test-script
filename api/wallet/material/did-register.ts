import { CONFIG, KEY_TYPE, OPERATION } from '../../consts'
import axios from 'axios'
import { CryptoHelper as RsaHelper } from '../../utils/rsa-CrytoHelper'
import { CryptoHelper as EcdsaHelper } from '../../utils/ecdsa-CryptoHelper'

const genEcdsaKeys = (count: number) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(EcdsaHelper.genKeys())
  }
  return result
}

const genRsaKeys = (count: number) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(RsaHelper.genKeys())
  }
  return result
}

const genRegisterMessage = (obj: {
  public_key: string, key_type: string
}) => {
  return {
    operation: OPERATION.DID_REGISTER,
    public_key: obj.public_key,
    key_type: obj.key_type
  }
}

const genRequestData = (private_key: string, message: any) => {
  const messageData = RsaHelper.encodeBase64(JSON.stringify(message))
  return {
    data: {
      message: messageData
    },
    headers: {
      'x-signature': RsaHelper.sign(private_key, messageData)
    }
  }
}

export class DID {
  static async Register (keyType: string) {
    let didKey1: any
    let didKey2: any
    let didKey3: any
    let didKey4: any
    if (keyType == KEY_TYPE.EcdsaSecp256r1VerificationKey2019) {
      didKey1 = genEcdsaKeys(1)
      didKey2 = genEcdsaKeys(1)
      didKey3 = genEcdsaKeys(1)
      didKey4 = genEcdsaKeys(1)
    } else {
      didKey1 = genRsaKeys(1)
      didKey2 = genRsaKeys(1)
      didKey3 = genRsaKeys(1)
      didKey4 = genRsaKeys(1)
    }

    const public_key = didKey1[0].public_key
    const message = genRegisterMessage({
      public_key: public_key,
      key_type: keyType
    })
    const res = genRequestData(didKey1[0].private_key, message)
    console.log('keys:', JSON.stringify(didKey1, null, 2))
    console.log('request: DID register', JSON.stringify(message, null, 2))
    console.log('headers: DID register', JSON.stringify(res.headers, null, 2))
    console.log('body: DID register', JSON.stringify(res.data, null, 2))
    return {
      request: await axios.post(`${CONFIG.BASE_URL}/did`,
        res.data, { headers: res.headers }),
      didKey1,
      didKey2,
      didKey3,
      didKey4
    }
  }

  static async RegisterWithIncorrectKey (keyType: string) {
    let didKey1: any
    if (keyType == KEY_TYPE.EcdsaSecp256r1VerificationKey2019) {
      didKey1 = genEcdsaKeys(1)
    } else {
      didKey1 = genRsaKeys(1)
    }
    const public_key = 'public_key'
    const message = genRegisterMessage({
      public_key: public_key,
      key_type: keyType
    })
    const res = genRequestData(didKey1[0].private_key, message)
    console.log('request: DID register', JSON.stringify(message, null, 2))
    return {
      request: await axios.post(`${CONFIG.BASE_URL}/did`,
        res.data, { headers: res.headers }),
      didKey1
    }
  }

  static async RegisterWithoutKey (keyType: string) {
    let didKey1: any
    if (keyType == KEY_TYPE.EcdsaSecp256r1VerificationKey2019) {
      didKey1 = genEcdsaKeys(1)
    } else {
      didKey1 = genRsaKeys(1)
    }
    const public_key = ''
    const message = genRegisterMessage({
      public_key: public_key,
      key_type: keyType
    })
    const res = genRequestData(didKey1[0].private_key, message)
    console.log('request: DID register', JSON.stringify(message, null, 2))
    return {
      request: await axios.post(`${CONFIG.BASE_URL}/did`,
        res.data, { headers: res.headers }),
      didKey1
    }
  }
}
