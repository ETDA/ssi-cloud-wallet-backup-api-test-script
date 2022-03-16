import axios from 'axios'
import { CONFIG, OPERATION } from '../../consts'
import { CryptoHelper } from '../../utils/rsa-CrytoHelper'

const genAddVCStatusMessage = (obj: {
  status: string, cid: string, did_address: string, nonce: string, vc_hash: string
}) => {
  return {
    operation: OPERATION.VC_ADD_STATUS,
    status: obj.status,
    cid: obj.cid,
    did_address: obj.did_address,
    vc_hash: obj.vc_hash,
    nonce: obj.nonce
  }
}

const genUpdateVCStatusMessage = (obj: {
  status: string, cid: string, did_address: string, nonce: string
}) => {
  return {
    operation: OPERATION.VC_UPDATE_STATUS,
    status: obj.status,
    cid: obj.cid,
    did_address: obj.did_address,
    nonce: obj.nonce
  }
}

const genTagsVCStatusMessage = (obj: {
  cids: any, tags: any, did_address: string, nonce: string
}) => {
  return {
    operation: OPERATION.VC_TAG_STATUS,
    cids: obj.cids,
    tags: obj.tags,
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

export class VCStatus {

  static async Get (cid: string) {
    return await axios.get(`${CONFIG.BASE_URL}/vc/status/${cid}`)
  }

  static async GetIssuerDID (cid: string) {
    return await axios.get(`${CONFIG.BASE_URL}/vc/${cid}`)
  }

  static async Add (cid: string, didAddress: string, status: string, didKey: any, nonce: string, jwtVc:string) {

    const message = genAddVCStatusMessage({
      cid: cid,
      status: status,
      did_address: didAddress,
      nonce: nonce,
      vc_hash: jwtVc
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: VC Add Status ', JSON.stringify(message, null, 2))
    console.log('headers: VC Add Status', JSON.stringify(res.headers, null, 2))
    console.log('body: VC Add Status', JSON.stringify(res.data, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/vc/status`,
      res.data, { headers: res.headers })
  }

  static async Update (cid: string, cidInUrl:string, didAddress: string, status: string, didKey: any, nonce: string) {

    const message = genUpdateVCStatusMessage({
      cid: cid,
      status: status,
      did_address: didAddress,
      nonce: nonce
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: VC Update Status ', JSON.stringify(message, null, 2))
    console.log('headers: VC Update Status', JSON.stringify(res.headers, null, 2))
    console.log('body: VC Update Status', JSON.stringify(res.data, null, 2))
    return await axios.put(`${CONFIG.BASE_URL}/vc/status/${cidInUrl}`,
      res.data, { headers: res.headers })
  }

  static async Tags (cids: any, tags:any, didAddress: string, didKey: any, nonce: string) {

    const message = genTagsVCStatusMessage({
      cids: cids,
      tags: tags,
      did_address: didAddress,
      nonce: nonce
    })
    const res = genRequestData(didKey[0].private_key, message)
    console.log('request: VC Tag ', JSON.stringify(message, null, 2))
    console.log('headers: VC Tag', JSON.stringify(res.headers, null, 2))
    console.log('body: VC Tag', JSON.stringify(res.data, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/vc/status/tags`,
      res.data, { headers: res.headers })
  }
}
