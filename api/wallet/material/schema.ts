import axios from 'axios'
import { AUTHORIZATION, CONFIG } from '../../consts'

const genCreateSchemaMessage = (obj: {
  schema_name: string, schema_type: string, schema_body: any
}) => {
  return {
    // schema: {
    schema_name: obj.schema_name,
    schema_type: obj.schema_type,
    schema_body: obj.schema_body
    // }
  }
}

const genUpdateSchemaMessage = (obj: {
  schema_name: string, schema_type: string, schema_body: any, version: string
}) => {
  return {
    // id: obj.schema_id,
    // operation: OPERATION.VC_SCHEMA_UPDATE,
    // did_address: obj.did_address,
    // nonce: obj.nonce,
    // schema: {
    schema_name: obj.schema_name,
    schema_type: obj.schema_type,
    schema_body: obj.schema_body,
    version: obj.version
    // },
  }
}

const genSchemaValidateMessage = (obj: {
  schema_id: string, document: string
}) => {
  return {
    schema_id: obj.schema_id,
    document: obj.document
  }
}

const genHeader = () => {
  return {
    headers: {
      'Authorization': `FINEMA ${AUTHORIZATION.TOKEN}`
    }
  }
}

export class Schema {

  static async Create (schemaName: string, schemaType: string, schemaBody: any) {
    const message = genCreateSchemaMessage({
      schema_name: schemaName,
      schema_type: schemaType,
      schema_body: schemaBody
    })
    const res = genHeader()
    console.log('request: Create VC schema ', JSON.stringify(message, null, 2))
    console.log('headers: Create VC schema', JSON.stringify(res.headers, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/api/schemas`,
      message, { headers: res.headers })
  }

  static async Update (schemaId: string, schemaName: string, schemaType: string,
    schemaBody: any, version: string) {
    const message = genUpdateSchemaMessage({
      // schema_id: schemaId,
      schema_name: schemaName,
      schema_type: schemaType,
      schema_body: schemaBody,
      version: version
    })
    const res = genHeader()
    console.log('request: Update VC schema ', JSON.stringify(message, null, 2))
    console.log('headers: Update VC schema', JSON.stringify(res.headers, null, 2))
    return await axios.put(`${CONFIG.BASE_URL}/api/schemas/${schemaId}`,
      message, { headers: res.headers })
  }

  static async Upload (formData: any) {
    const response = await axios({
      method: 'post',
      url: `${CONFIG.BASE_URL}/api/schemas/upload`,
      data: formData,
      headers: {
        // @ts-ignore
        'content-type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `FINEMA ${AUTHORIZATION.TOKEN}`
      }
    })
    return response
  }

  static async Validate (fullSchemaID: string, document: any) {
    const message = genSchemaValidateMessage({
      schema_id: fullSchemaID,
      document: document
    })
    const res = genHeader()
    console.log('request: Validate schema ', JSON.stringify(message, null, 2))
    console.log('headers: Validate schema', JSON.stringify(res.headers, null, 2))
    return await axios.post(`${CONFIG.BASE_URL}/api/schemas/validate`,
      message, { headers: res.headers })
  }
}
