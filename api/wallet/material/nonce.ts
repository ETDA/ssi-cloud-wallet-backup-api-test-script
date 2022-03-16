import axios from 'axios'
import { CONFIG } from '../../consts'

export class DIDNonce {

  static async getDIDNonce (didAddress: string) {
    return await axios.get(`${CONFIG.BASE_URL}/did/${didAddress}/nonce`)
  }
}
