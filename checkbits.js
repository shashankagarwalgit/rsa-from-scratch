function countBits(str) {
    // Convert the string to a binary string.
    const binary = str.toString(2);
  
    // Return the length of the binary string.
    return binary.length;
  }
  
  // Example usage:
  const str = 'hello this is a secret message';
  const numBits = countBits(str);
  
  console.log(`The string "${str}" has ${numBits} bits.`);