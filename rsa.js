const crypto = require('crypto');

// Function to generate a prime number of specified bits using crypto library
function generatePrime(bits) {
    return new Promise((resolve, reject) => {
        crypto.generatePrime(bits, { safe: true }, (err, prime) => {
            if (err) reject(err);
            var primeno = Buffer.from(prime).toString('hex');
            resolve(BigInt(`0x${primeno}`));
        });
    });
}

// Function to calculate the greatest common divisor (GCD) of two numbers
function gcd(a, b) {
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Function to compute modular inverse using Extended Euclidean Algorithm
function modInverse(e, phi) {
    let [m0, y, x] = [phi, 0n, 1n];
    while (e > 1n) {
        const q = e / phi;
        [e, phi] = [phi, e % phi];
        [x, y] = [y, x - q * y];
    }
    return x < 0n ? x + m0 : x;
}

// Function to generate RSA keys
async function generateRSAKeys(bits) {
    // Step 1: Generate two large random prime numbers, p and q
    const [p, q] = await Promise.all([generatePrime(bits), generatePrime(bits)]);

    // Step 2: Calculate n = p * q (modulus)
    const n = p * q;

    // Step 3: Calculate the totient of n: phi(n) = (p-1)(q-1)
    const phi = (p - 1n) * (q - 1n);

    // Step 4: Choose an integer e such that 1 < e < phi(n) and gcd(e, phi(n)) = 1
    let e = 65537n; // Commonly used prime number for e
    if (gcd(e, phi) !== 1n) {
        e = 3n;
        while (gcd(e, phi) !== 1n) {
            e += 2n;
        }
    }

    // Step 5: Compute d, the modular multiplicative inverse of e (mod phi(n))
    const d = modInverse(e, phi);

    // Return the public and private keys
    return {
        publicKey: { e, n },
        privateKey: { d, n }
    };
}

// Function for modular exponentiation
function modExp(base, exponent, modulus) {
    if (modulus === 1n) return 0n;
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent >> 1n;
        base = (base * base) % modulus;
    }
    return result;
}

// Function to encrypt a message using RSA
function encrypt(message, publicKey) {
    const { e, n } = publicKey;
    const messageBigInt = BigInt(`0x${message}`);
    const encryptedMessage = modExp(messageBigInt, BigInt(e), BigInt(n));
    return encryptedMessage.toString(16); // Return as hex string
}

// Function to decrypt a message using RSA
function decrypt(encryptedMessage, privateKey) {
    const { d, n } = privateKey;
    const encryptedBigInt = BigInt(`0x${encryptedMessage}`);
    const decryptedMessage = modExp(encryptedBigInt, BigInt(d), BigInt(n));
    return decryptedMessage.toString(16); // Return as hex string
}

// Export the functions
module.exports = {
    generateRSAKeys,
    encrypt,
    decrypt
};
