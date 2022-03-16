const { createVerify, createSign} = require('crypto')
const NodeRSA = require('node-rsa');
const rsaKeyPair = require('rsa-keypair')

describe('matching cities to foods', () => {
  // let privateKey = ''

  test('genKey', async () => {
    const key = new NodeRSA()
    const keyPair = key.generateKeyPair(2048);
    const keyPublic = keyPair.exportKey('pkcs1-public');
    const keyPrivate = keyPair.exportKey('pkcs1-private');
    console.log(keyPublic)
    console.log(keyPrivate)
  })

  // test('sign', async () => {
  //   const msg = { xxx: 3}
  //   const sig = CryptoHelper.sign(privateKey, msg)
  //   expect(sig).toBeTruthy()
  //
  // })
  //
  // test('encodeBase64', async () => {
  //   const base64 = CryptoHelper.encodeBase64('kuy')
  //   expect(base64).toBe('a3V5')
  // })

  test('test verify rsa', async () => {
    let keys = rsaKeyPair.generate(2048)
    const keyPem = {
      private_key: keys.privateKey.toString(),
      public_key: keys.publicKey.toString()
    }
    console.log(keyPem)

    const sign = createSign('SHA256');
    sign.write('ee9d254182c9014c8397ca85a8aed7bcebb7261140c4dc092babac7cc9e5048a');
    sign.end();
    const signature = sign.sign(keyPem.private_key, 'hex');

    const verify = createVerify('SHA256');
    verify.write('ee9d254182c9014c8397ca85a8aed7bcebb7261140c4dc092babac7cc9e5048a');
    verify.end();
    console.log(verify.verify(keyPem.public_key, signature, 'hex'));
  })

//   test('gen ec key', async () => {
//     const {
//       generateKeyPair
//     } = await import('crypto');
//
//     const genKeys = generateKeyPair('rsa', {
//       modulusLength: 4096,
//       publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem'
//       },
//       privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//         cipher: 'aes-256-cbc',
//         passphrase: 'top secret'
//       }
//     }, (err, publicKey, privateKey) => {
//       // Handle errors and use the generated key pair.
//     });
//
//     console.log(genKeys)
//
// })
})
