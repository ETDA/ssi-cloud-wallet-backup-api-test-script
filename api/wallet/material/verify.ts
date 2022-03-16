import axios from 'axios'
import { CONFIG } from '../../consts'

const genJWTRequest = (jwt: string) => {
  return {
    message: jwt
  }
}

export class Verify {

  static async VC (jwtVc: any) {
    const vcJwtRequest = genJWTRequest(jwtVc)
    console.log('VC Verify request',vcJwtRequest)
    return {
      request: await axios.post(`${CONFIG.BASE_URL}/vc/verify`, vcJwtRequest),
      jwtVc
    }
  }

  static async VP (jwtVp: any) {
    const jwtVpRequest = genJWTRequest(jwtVp)
    console.log('VP Verify request',jwtVpRequest)

    return await axios.post(`${CONFIG.BASE_URL}/vp/verify`, jwtVpRequest)
  }
}
