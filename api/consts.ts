export const CONFIG = {
  // BASE_URL: 'https://93b6f86bc25f.ngrok.io',
  BASE_URL: 'https://ssi-test.teda.th'
}

export const AUTHORIZATION = {
  TOKEN: 'f36788684ae6f8baa20b6988dd4b53c542bed161e1c0ea4ed89f275a7b3ee56c'
}

export const OPERATION = {
  DID_REGISTER: 'DID_REGISTER',
  DID_KEY_ADD: 'DID_KEY_ADD',
  DID_KEY_REVOKE: 'DID_KEY_REVOKE',
  VC_REGISTER: 'VC_REGISTER',
  VC_REVOKE: 'VC_REVOKE',
  VC_SCHEMA_CREATE: 'VC_SCHEMA_CREATE',
  VC_SCHEMA_UPDATE: 'VC_SCHEMA_UPDATE',
  VC_ADD_STATUS: 'VC_ADD_STATUS',
  VC_UPDATE_STATUS: 'VC_UPDATE_STATUS',
  VC_WALLET_CREATE: 'VC_WALLET_CREATE',
  VC_WALLET_ADD: 'VC_WALLET_ADD',
  VP_UPDATE_STATUS: 'VP_UPDATE_STATUS',
  WALLET_CREATE: 'WALLET_CREATE',
  WALLET_VC_ADD: 'WALLET_VC_ADD',
  WALLET_VP_ADD: 'WALLET_VP_ADD',
  REQUEST_CREATE: 'REQUEST_CREATE',
  DID_RECOVERER_ADD: 'DID_RECOVERER_ADD',
  DID_KEY_RESET: 'DID_KEY_RESET',
  VC_TAG_STATUS: 'VC_TAG_STATUS'
}

export const VC_STATUS = {
  ACTIVE: 'active',
  REVOKE: 'revoke',
  EXPIRED: 'expired'
}

export const CREDENTIAL_TYPE = {
  VC: 'VerifiableCredential',
  VP: 'VerifiablePresentation'
}

export const SCHEMA = {
  NAME: 'TEST_SCHEMA',
  TYPE: 'TEST_TYPE',
  VERSION: '1.0.0'
}

export const RESULT = {
  SUCCESS: 'success'
}

export const KEY_TYPE = {
  EcdsaSecp256r1VerificationKey2019: 'EcdsaSecp256r1VerificationKey2019',
  RsaVerificationKey2018: 'RsaVerificationKey2018'
}

export const ERROR = {
  KEY_PURPOSE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The key_purpose field must be one of AUTHENTICATION, SIGNING, PRIVATE_SIGNING'
  },
  KEY_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The key_type field must be one of Secp256r1VerificationKey2018'
  },
  KEY_ID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The key_id field's value is not exists`
  },
  DID_ADDRESS: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The did_address field's value is not exists`
  },
  RECOVERER: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The recoverer field's value is not exists`
  },
  REQUEST_DID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The request_did field's value is not exists`
  },
  CONTROLLER: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The new_key.controller field's value is not exists`
  },
  KEY_ROTATION: {
    CODE: 'UNIQUE',
    MESSAGE: `The next_key_hash field's value already exists`
  },
  NONCE: {
    CODE: 'NOT_EXISTS',
    MESSAGE: `The nonce field's value is not exists`
  },
  CID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The cid field\'s value is not exists'
  },
  RESETTER_EXISTS: {
    CODE: 'RESETTER_EXISTS',
    MESSAGE: 'Resetter already exists'
  },
  RESETTER_NOT_EXISTS: {
    CODE: 'RESETTER_NOT_EXISTS',
    MESSAGE: 'Resetter is not exists'
  },
  NOT_FOUND: {
    CODE: 'NOT_FOUND',
    MESSAGE: 'not found'
  },
  VC_STATUS: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The status field must be one of expired, revoke'
  }
}

export const INVALID = {
  PARAMS: {
    CODE: 'INVALID_PARAMS',
    MESSAGE: 'Invalid parameters'
  },
  SIGNATURE: {
    CODE: 'INVALID_SIGNATURE',
    MESSAGE: 'Signature is not valid'
  },
  VC_ALREADY_TAGGED: {
    CODE: 'VC_CAN_NOT_TAG',
    MESSAGE: 'Can\'t Tag status. This VC was tagged previously.'
  },
  VC_NOT_ACTIVE_TO_TAG: {
    CODE: 'VC_CAN_NOT_TAG',
    MESSAGE: 'Can\'t Tag status. Please provide VC which status active only.'
  },
  CID_IS_INVALID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The cid[0] field\'s value is not exists'
  },
  SCHEMA_BODY: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'This schema.schema_body field must be requests.VCSchemaSchemaBody type'
  },
  SCHEMA_BODY_DEGREE_VALUE: {
    CODE: 'INVALID_JSON',
    MESSAGE: 'The schema.schema_body.degree.value field must be json object'
  },
  SCHEMA_BODY_DEGREE_REQUIRED: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'The schema.schema_body.degree.required field must be boolean'
  },
  SCHEMA_BODY_DEGREE_VALUE_NAME_REQUIRED: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'The schema.schema_body.degree.value.name.required field must be boolean'
  },
  SCHEMA_BODY_DEGREE_VALUE_TYPE_REQUIRED: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'The schema.schema_body.degree.value.type.required field must be boolean'
  },
  SCHEMA_BODY_DEGREE_ID_REQUIRED: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'The schema.schema_body.degree_id.required field must be boolean'
  },
  SCHEMA_BODY_DEGREE_NAME_TYPE_AS_OBJ: {
    CODE: 'NESTED_OBJECT_DISALLOWED',
    MESSAGE: 'The field degree.value.name.type cannot be object'
  },
  SCHEMA_BODY_DEGREE_TYPE_TYPE_AS_OBJ: {
    CODE: 'NESTED_OBJECT_DISALLOWED',
    MESSAGE: 'The field degree.value.type.type cannot be object'
  },
  SCHEMA_VERSION_INCORRECT_FORMAT: {
    CODE: 'INVALID_VERSION_FORMAT',
    MESSAGE: 'The field schema.version must be in format n.n.n where n is integer'
  },
  SCHEMA_ID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The id field\'s value is not exists'
  },
  SCHEMA_VERSION_UPDATE: {
    CODE: 'VERSION_DISALLOWED',
    MESSAGE: 'The current version (schema.version) on field 1.0.0 can only be updated to 2.0.0, 1.1.0 or 1.0.1'
  },
  CONTROLLER: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The new_key.controller field\'s value is not exists'
  },
  CLAIMS_SUB: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Claims.sub field\'s value is not exists'
  },
  CLAIMS_JTI: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Claims.jti field\'s value is not exists'
  },
  CLAIMS_AUD: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Claims.aud field\'s value is not exists'
  },
  CLAIMS_VC_TYPE: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Claims.vc.type[1] field\'s value is not exists'
  },
  CLAIMS_VP_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The Claims.vp.type field must be one of VerifiablePresentation'
  },
  CLAIMS_ISS: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Claims.iss field\'s value is not exists'
  },
  VC_CAN_NOT_UPDATE: {
    CODE: 'VC_CAN_NOT_UPDATE',
    MESSAGE: 'can\'t update. please add this vc status first'
  },
  SCHEMA_BODY_REQUIRED: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The required[0] field must be one of example_array'
  },
  SCHEMA_BODY_REQUIRED_TYPE: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'This schema.schema_body.required field must be []*string type'
  },
  SCHEMA_BODY_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The type field must be one of object'
  },
  SCHEMA_PROPERTY_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The properties.example_array field must be one of string, number, boolean, object, array'
  },
  SCHEMA_TYPE: {
    CODE: 'SCHEMA_TYPE_MISMATCH',
    MESSAGE: ''
  },
  HEADER_KID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The Header.kid field\'s value is not exists'
  },
  JWT: {
    CODE: 'INVALID_JWT',
    MESSAGE: 'JWT is not valid'
  },
  ISSUER: {
    CODE: 'ISSUER_IS_NOT_MATCH',
    MESSAGE: 'jwt\'s issuer is not match with your did address'
  },
  INVALID_DID_ADDRESS: {
    CODE: 'INVALID_DID_ADDRESS',
    MESSAGE: 'did address is invalid format or not registered'
  },
  EMAIL: {
    CODE: 'INVALID_EMAIL',
    MESSAGE: 'The email field must be Email Address'
  },
  OTP: {
    CODE: 'OTP_NOT_VALID',
    MESSAGE: 'OTP is not valid.'
  },
  UUID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The uuid field\'s value is not exists'
  },
  USER_ID: {
    CODE: 'NOT_EXISTS',
    MESSAGE: 'The id field\'s value is not exists'
  },
  KEY_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The key_type field must be one of EcdsaSecp256r1VerificationKey2019, RsaVerificationKey2018'
  },
  NEW_KEY_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The new_key.key_type field must be one of EcdsaSecp256r1VerificationKey2019, RsaVerificationKey2018'
  },
  INVALID_ADD_VC_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The status field must be one of active'
  },
  CIDS_TO_ADD_TAG: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'This cids field must be []string type'
  },
  TAGS_TO_ADD_TAG: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'This tags field must be []string type'
  }
}

export const ERR_REQUIRE = {
  DID_ADDRESS: {
    CODE: 'REQUIRED',
    MESSAGE: 'The did_address field is required'
  },
  RECOVERER: {
    CODE: 'REQUIRED',
    MESSAGE: 'The recoverer field is required'
  },
  REQUEST_DID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The request_did field is required'
  },
  NEW_KEY_CONTROLLER: {
    CODE: 'REQUIRED',
    MESSAGE: `The new_key.controller field is required`
  },
  KEY_PEM: {
    CODE: 'REQUIRED',
    MESSAGE: 'The key_pem field is required'
  },
  NONCE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The nonce field is required'
  },
  KEY_ID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The key_id field is required'
  },
  KEY_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The key_type field is required'
  },
  CID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The cid field is required'
  },
  SCHEMA_NAME: {
    CODE: 'REQUIRED',
    MESSAGE: 'The schema.schema_name field is required'
  },
  SCHEMA_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The schema.schema_type field is required'
  },
  SCHEMA_BODY_DEGREE_ID_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The schema.schema_body.degree_id.type field is required'
  },
  SCHEMA_BODY_DEGREE_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The schema.schema_body.degree.type field is required'
  },
  SCHEMA_VERSION: {
    CODE: 'REQUIRED',
    MESSAGE: 'The schema.version field is required'
  },
  SCHEMA_ID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The id field\'s value is not exists'
  },
  CLAIMS_SUB: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.sub field is required'
  },
  CLAIMS_JTI: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.jti field is required'
  },
  CLAIMS_ISS: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.iss field is required'
  },
  CLAIMS_AUD: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.aud field is required'
  },
  HEADER_KID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Header.kid field is required'
  },
  CONTROLLER: {
    CODE: 'REQUIRED',
    MESSAGE: 'The controller field is required'
  },
  VC_STATUS: {
    CODE: 'REQUIRED',
    MESSAGE: 'The status field is required'
  },
  CLAIMS_VC_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.vc.type[1] field is required'
  },
  CLAIMS_VP_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The Claims.vp.type[0] field is required'
  },
  SCHEMA_BODY_DESC: {
    CODE: 'REQUIRED',
    MESSAGE: 'The description field is required'
  },
  SCHEMA_BODY_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The type field is required'
  },
  SCHEMA_BODY_TITLE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The title field is required'
  },
  JWT: {
    CODE: 'REQUIRED',
    MESSAGE: 'The jwt field is required'
  },
  SCHEMA_PROPERTY_TYPE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The properties.example_array field is required'
  },
  SCHEMA_PROPERTY_ARRAY_MIN_ITEMS: {
    CODE: 'INVALID_TYPE',
    MESSAGE: 'The properties.example_array.properties field cannot be empty object'
  },
  SCHEMA_PROPERTY_ITEM_TYPE: {
    CODE: 'INVALID_VALUE_NOT_IN_LIST',
    MESSAGE: 'The properties.example_array field must be one of string, number, boolean, object, array'
  },
  UUID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The uuid field is required'
  },
  TOKEN: {
    CODE: 'REQUIRED',
    MESSAGE: 'The token field is required'
  },
  USER_ID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The id field is required'
  },
  NEW_KEY: {
    CODE: 'REQUIRED',
    MESSAGE: 'The new_key.public_key field is required'
  },
  NEW_KEY_SIGNATURE: {
    CODE: 'REQUIRED',
    MESSAGE: 'The new_key.signature field is required'
  },
  DEVICE_UUID: {
    CODE: 'REQUIRED',
    MESSAGE: 'The device.uuid field is required'
  }
}

export const ERR_NOT_MATCH = {
  REQUEST_DID: {
    CODE: 'RECOVERER_IS_NOT_MATCH',
    MESSAGE: 'your did address is not match with request\'s recoverer did address'
  }
}

export const REQUEST_STATUS = {
  PENDING: 'PENDING'
}

