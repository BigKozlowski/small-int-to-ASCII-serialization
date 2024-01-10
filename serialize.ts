const convertToBin = (x: number) => Number(x).toString(2).padStart(9, "0");

const convertToDec = (x: string) => parseInt(x, 2);

const splitTo9Bit = (str: string): string[] => {
  const splitted = str.match(/.{1,9}/g);
  return splitted ? splitted : [""];
};

const zip = (a1: any[], a2: any[]): [any, any][] =>
  Array.from({ length: Math.max(a1.length, a2.length) }, (_, i) => [
    a1[i],
    a2[i],
  ]);

const ascii7Decoder = (encoded: string) => {
  let decoded = "";
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
  const rem = encoded.length % 9;
  return encoded.substring(rem);
};

const serialize = (nums: number[]) =>
  ascii7Decoder(nums.map(convertToBin).join(""));

const deserialize = (str: string) =>
  splitTo9Bit(ascii7Encoder(str)).map(convertToDec);

export { serialize, deserialize };
