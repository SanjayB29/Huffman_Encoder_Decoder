document.addEventListener('DOMContentLoaded', function () {
    const mainInput = document.getElementById('main-input');
    const encodeInput = document.getElementById('encode-input');
    const decodeInput = document.getElementById('decode-input');
    const encodeButton = document.getElementById('encode-button');
    const decodeButton = document.getElementById('decode-button');
    const encodedText = document.getElementById('encoded-text');
    const decodedText = document.getElementById('decoded-text');

    encodeButton.addEventListener('click', function () {
        const charCountDict = countCharacters(mainInput.value);
        const root = buildHuffmanTree(charCountDict);
        const huffmanCodes = {};
        buildHuffmanCodes(root, '', huffmanCodes);
        const encodedTextValue = encodeText(encodeInput.value, huffmanCodes);
        encodedText.textContent = encodedTextValue;
    });

    decodeButton.addEventListener('click', function () {
        const encodedTextValue = decodeInput.value;
        const root = buildHuffmanTree(countCharacters(mainInput.value));
        const decodedTextValue = decodeText(encodedTextValue, root);
        decodedText.textContent = decodedTextValue;
    });

    function countCharacters(text) {
        const charSet = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM.,?!-_+=-*() \n";
        const mergedText = text + charSet;
        const charCountDict = {};

        for (const char of mergedText) {
            if (char in charCountDict) {
                charCountDict[char] += 1;
            } else {
                charCountDict[char] = 1;
            }
        }
        return charCountDict;
    }

    function HuffmanNode(char, freq) {
        this.char = char;
        this.freq = freq;
        this.left = null;
        this.right = null;
    }

    function buildHuffmanTree(charCountDict) {
        const priorityQueue = [];
        for (const char in charCountDict) {
            priorityQueue.push(new HuffmanNode(char, charCountDict[char]));
        }
        priorityQueue.sort((a, b) => a.freq - b.freq);

        while (priorityQueue.length > 1) {
            const left = priorityQueue.shift();
            const right = priorityQueue.shift();
            const mergedNode = new HuffmanNode(null, left.freq + right.freq);
            mergedNode.left = left;
            mergedNode.right = right;
            priorityQueue.push(mergedNode);
            priorityQueue.sort((a, b) => a.freq - b.freq);
        }

        return priorityQueue[0];
    }

    function buildHuffmanCodes(node, currentCode, huffmanCodes) {
        if (node === null) {
            return;
        }

        if (node.char !== null) {
            huffmanCodes[node.char] = currentCode;
        }

        buildHuffmanCodes(node.left, currentCode + '0', huffmanCodes);
        buildHuffmanCodes(node.right, currentCode + '1', huffmanCodes);
    }

    function encodeText(text, huffmanCodes) {
        let encodedText = '';
        for (const char of text) {
            encodedText += huffmanCodes[char];
        }
        return encodedText;
    }

    function decodeText(encodedText, root) {
        let decodedText = '';
        let currentNode = root;

        for (const bit of encodedText) {
            if (bit === '0') {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }

            if (currentNode.char !== null) {
                decodedText += currentNode.char;
                currentNode = root;
            }
        }

        return decodedText;
    }
});
const textarea = document.getElementById('myTextarea');
        textarea.addEventListener('input', () => {
            textarea.style.resize = 'none';
        });
