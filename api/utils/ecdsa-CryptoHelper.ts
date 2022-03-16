// @ts-ignore
import ECKey from 'ec-key'
import sha256 from 'js-sha256'

interface IKEY {
  private_key: string
  public_key: string
}

export class CryptoHelper {
  static genKeys (): IKEY {
    const key = ECKey.createECKey('P-256')
    return {
      private_key: key.toString('pem'),
      public_key: key.asPublicECKey().toString('pem')
    }
  }

  static sign (privateKey: string, message: any): string {
    const key = new ECKey(privateKey, 'pem')
    return key.createSign('SHA256')
      .update(message)
      .sign('base64')
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

