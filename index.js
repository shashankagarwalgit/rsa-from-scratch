const { generateRSAKeys, encrypt, decrypt } = require('./rsa');

// Example usage
async function main() {
    const keyLength = 512; // You can adjust the key length as needed
    const keys = await generateRSAKeys(keyLength);
    console.log("Public Key:", keys.publicKey);
    console.log("Private Key:", keys.privateKey);

    const message = 'hello this is a secret message and should be encrypted using RSA!';
    const messgHex = Buffer.from(message).toString('hex');
    console.log("Original Message:", message);

    const encryptedMessage = encrypt(messgHex, keys.publicKey);
    var base64String = Buffer.from(encryptedMessage, 'hex').toString('base64')
    console.log("Encrypted Message:", base64String);

    var hexString = Buffer.from(base64String, 'base64').toString('hex')
    const decryptedMessage = decrypt(hexString, keys.privateKey);
    console.log("Decrypted Message:", Buffer.from(decryptedMessage, 'hex').toString('utf-8'));
}
main();

