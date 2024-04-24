class HuffmanNode {
  constructor(character, frequency) {
    this.character = character;
    this.frequency = frequency;
    this.left = null;
    this.right = null;
  }
}

class HuffmanTree {
  constructor() {
    this.root = null;
  }

  buildTree(characters, frequencies) {
    const nodes = [];
    for (let i = 0; i < characters.length; i++) {
      nodes.push(new HuffmanNode(characters[i], frequencies[i]));
    }

    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);
      const left = nodes.shift();
      const right = nodes.shift();
      const parent = new HuffmanNode(null, left.frequency + right.frequency);
      parent.left = left;
      parent.right = right;
      nodes.push(parent);
    }

    this.root = nodes[0];
  }

  encode(data) {
    const encodedData = [];
    const characterToCodeMap = this.buildCodeMap(this.root);
    for (let i = 0; i < data.length; i++) {
      encodedData.push(characterToCodeMap[data[i]]);
    }
    return encodedData.join("");
  }

  decode(encodedData) {
    const decodedData = [];
    let currentNode = this.root;
    for (let i = 0; i < encodedData.length; i++) {
      if (encodedData[i] === "0") {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      if (currentNode.character !== null) {
        decodedData.push(currentNode.character);
        currentNode = this.root;
      }
    }
    return decodedData.join("");
  }

  buildCodeMap(node, prefix = "") {
    const codeMap = {};
    if (node.character !== null) {
      codeMap[node.character] = prefix;
    } else {
      Object.assign(codeMap, this.buildCodeMap(node.left, prefix + "0"));
      Object.assign(codeMap, this.buildCodeMap(node.right, prefix + "1"));
    }
    return codeMap;
  }
}

const data = "Algortihms is a great course";
const characters = Array.from(new Set(data.split("")));
const frequencies = characters.map(
  (char) => data.split("").filter((c) => c === char).length
);
const huffmanTree = new HuffmanTree();
huffmanTree.buildTree(characters, frequencies);
const encodedData = huffmanTree.encode(data);
console.log("Encoded data:", encodedData);

const decodedData = huffmanTree.decode(encodedData);
console.log("Decoded data:", decodedData);
