// @ts-ignore
import keypair from 'keypair'

const { createSign } = require('crypto')
// const rsaKeyPair = require('rsa-keypair')
// @ts-ignore
import ECKey from 'ec-key'
import sha256 from 'js-sha256'

interface IKEY {
  private_key: string
  public_key: string
}

export class CryptoHelper {
  static genKeys (): IKEY {
    // const key = new NodeRSA()
    // const keyPair = key.generateKeyPair(2048)
    // const keyPublic = keyPair.exportKey('pkcs1-public')
    // const keyPrivate = keyPair.exportKey('pkcs1-private')
    // return {
    //   private_key: keyPrivate,
    //   public_key: keyPublic,
    //   keyPair: keyPair
    // }
    let keys = keypair()
    return {
      private_key: keys.private.toString(),
      public_key: keys.public.toString()
    }

  }

  static sign (privateKey: any, message: any): string {
    // console.log(message)
    // const messageToSign = CryptoHelper.sha256(message)
    // console.log(messageToSign)
    // const signature = keys.sign(messageToSign,'base64','base64')
    // return signature
    const sign = createSign('SHA256')
    sign.update(message)
    sign.end()
    const signature = sign.sign(privateKey, 'base64')
    return signature
    // const key = new ECKey(privateKey, 'pem')
    // return key.createSign('SHA256')
    //   .update(message)
    //   .sign('base64')
  }

  static encodeBase64 (data: any): string {
    if (typeof Buffer === 'function') {
      return Buffer.from(data, 'utf-8').toString('base64')
    } else {
      throw new Error('Failed to determine the platform specific encoder')
    }
  }

  static sha256 (msg: string): string {
    // @ts-ignore
    return sha256(msg)
  }
}

