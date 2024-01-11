const convertToBin = (x: number) => Number(x).toString(2).padStart(9, "0");

const convertToDec = (x: string) => parseInt(x, 2);

const splitTo9Bit = (str: string): string[] => {
  const splitted = str.match(/.{1,9}/g);
  return splitted ? splitted : [""];
};

const ascii7Decoder = (encoded: string) => {
  let decoded = "";

  // Enlarge input string length to be divisible by 7
  const rem = encoded.length % 7;
  for (let i = rem; i < 7; i++) {
    encoded = "0" + encoded;
  }

  for (let i = 0; i < encoded.length; i += 7) {
    // Extract 7 bits at a time and convert to decimal ASCII code
    const sevenBits = encoded.substring(i, i + 7);
    const asciiCode = parseInt(sevenBits, 2);
    decoded += String.fromCharCode(asciiCode);
  }
  return decoded;
};

const ascii7Encoder = (text: string) => {
  let encoded = "";
  for (let i = 0; i < text.length; i++) {
    const asciiCode = text.charCodeAt(i);
    const binaryCode = asciiCode.toString(2).padStart(7, "0");
    encoded += binaryCode;
  }

  // As string after decoding to ASCII will be same length or longer than original -
  // - trim leading zeros so string length is again divisible by 9
  const rem = encoded.length % 9;
  return encoded.substring(rem);
};

const serialize = (nums: number[]) =>
  ascii7Decoder(nums.map(convertToBin).join(""));

const deserialize = (str: string) =>
  splitTo9Bit(ascii7Encoder(str)).map(convertToDec);

export { serialize, deserialize };
