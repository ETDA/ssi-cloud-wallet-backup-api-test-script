export const EXAMPLE_VC = {
  SUBJECT: {
    'credentialSubject': {
      'tax_id': '0123456',
      'name': 'ฟินีม่า',
      'branch': '00000',
      'address': 'เลขที่ 98 ซอยอารี',
      'invoice_id': 'TIV-0123456',
      'net_price': 12500,
      'vat_price': 875,
      'total_price': 13375,
      'customer': {
        'name': 'ครีเอทีฟบ็อกซ์ จำกัด',
        'address': 'เลขที่ 83/488 หมู่ 5',
        'tax_id': '012345678',
        'branch': '00000'
      },
      'items': [
        {
          'detail': 'ระบบยืนยันตัวบุคคล 2',
          'amount': 1,
          'price': 12500,
          'total_price': 12500
        }
      ]
    },
    'issuanceDate': '2021-03-04T09:25:53.043047+00:00'
  },
  TYPE: ['VerifiableCredential', 'Invoice'],
  EXAMPLE_STRING: { 'example_string': 'Tony' }
}

export const EXAMPLE_VP = {
  TYPE: 'VerifiablePresentation'
}
