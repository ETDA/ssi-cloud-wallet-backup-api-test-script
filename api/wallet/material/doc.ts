import axios from 'axios'
import { CONFIG } from '../../consts'

export class DIDDoc {
  static async Get (didAddress: string) {
    return await axios.get(`${CONFIG.BASE_URL}/did/${didAddress}/document/latest`)
  }

  static async GetHistory (didAddress: string) {
    return await axios.get(`${CONFIG.BASE_URL}/did/${didAddress}/document/history`)
  }

  static async GetVersion (didAddress: string, version: string) {
    return await axios.get(`${CONFIG.BASE_URL}/did/${didAddress}/document/${version}`)
  }
}
