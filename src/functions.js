import { ethers } from "ethers";
import { PUBLIC_KEY, abi, contractAddress } from "./Constants";
import { Crypt, RSA } from "hybrid-crypto-js";

export const buy = async (userAddress, price) => {
  let transactiponResponse;
  try {
    console.log("1");
    const provider = await getProvider();
    console.log("2");
    const signer = provider.getSigner();
    console.log("price", price, typeof price);
    const contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
    const contractWithSigner = contract.connect(signer);

    transactiponResponse = await contractWithSigner.buy(userAddress, {
      value: ethers.utils.parseEther(String(price)),
    });
    console.log("4");
  } catch (e) {
    console.log(e);
  }
};

export const uploadData = async (data, typeOfData, price) => {
  try {
    // encrypting
    const encrypted_text = crypt("salt", data); // -> 426f666665
    console.log("!");
    const provider = await getProvider();
    console.log("!!");
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    transactiponResponse = await contract.uploadData(
      encrypted_text,
      typeOfData,
      price
    );
  } catch (e) {
    console.log(e);
  }
};

export const retractData = async () => {
  if (typeof window.etheruem !== undefined) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = await getProvider();
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    let transactiponResponse;
    try {
      transactiponResponse = await contract.retractData();
    } catch (e) {
      console.log(e);
    }
  }
};

export const getData = async () => {
  let transactiponResponse;
  const provider = await getProvider();
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    transactiponResponse = await contract.getData();
  } catch (e) {
    console.log(e);
  }
  transactiponResponse = processData(
    transactiponResponse,
    await signer.getAddress()
  );
  return transactiponResponse;
};

async function processData(data, address) {
  const newdata = [];
  const crypt = new Crypt();
  const rsa = new RSA();
  let publicKey;
  rsa.generateKeyPair(function (keyPair) {
    publicKey = keyPair.publicKey;
  });
  if (data == undefined) return [];
  for (let i = 0; i < data.length; i++) {
    const encrypted = await crypt.encrypt(PUBLIC_KEY, data[i][0], "");
    const encryptedobj = JSON.parse(encrypted);
    if (data[i][3] == 0) {
      continue;
    }
    if (data[i][1].length == 0) {
      newdata.push([
        encryptedobj.cipher,
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
      ]);
      continue;
    }
    if (data[i][1].includes(address)) {
      const decrypted_string = decrypt("salt", data[i][0]);
      // const [first, ...rest] = data[i][0];
      // data[i] = [decrypted_string];
      console.log("decrypted", decrypted_string);
      console.log(data[i][0]);
      newdata.push([
        decrypted_string,
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
      ]);
    } else {
      newdata.push([
        encryptedobj.cipher,
        data[i][1],
        data[i][2],
        data[i][3],
        data[i][4],
      ]);
    }
  }
  const uniqueArray = newdata.filter(function (item, pos) {
    return newdata.indexOf(item) == pos;
  });
  return uniqueArray;
}

async function requestAccount() {
  console.log("Requesting account...");

  // ❌ Check if Meta Mask Extension exists
  if (window.ethereum) {
    console.log("detected");

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
    } catch (error) {
      throw error;
    }
  } else {
    alert("Meta Mask not detected");
  }
}

// Create a provider to interact with a smart contract
export async function getProvider() {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider;
  }
}

const crypt = (salt, text) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
