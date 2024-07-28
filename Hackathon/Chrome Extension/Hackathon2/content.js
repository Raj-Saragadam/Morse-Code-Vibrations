const morseCode = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 
  'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 
  's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 
  'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', 
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', 
  '9': '----.', '0': '-----', ' ': ' '
};

function textToMorse(text) {
  return text.toLowerCase().split('').map(char => morseCode[char] || '').join(' ');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Loaded");
  if (request.action === "getHighlight") {
    const selectedText = window.getSelection().toString();
    console.log(`Selected text: ${selectedText}`);
    const morse = textToMorse(selectedText);
    window.open(`http://172.21.161.101:8081/?message=${encodeURIComponent(selectedText)}`);
    console.log(`Morse code: ${morse}`);
    morseToSoundPattern(morse);
  }
});

document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText) {
    let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    showButton(rect, selectedText);
  }
});

function showButton(rect, text) {
  removeButton(); // Remove any existing button

  const button = document.createElement('button');
  button.textContent = 'Take Action';
  button.style.position = 'absolute';
  button.style.top = `${rect.top + window.scrollY - 30}px`;
  button.style.left = `${rect.left + window.scrollX}px`;
  button.style.zIndex = 1000;
  button.style.backgroundColor = '#4285F4';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.padding = '5px 10px';
  button.style.cursor = 'pointer';
  
  button.addEventListener('click', function() {
    // Open a new tab or perform any action with the selected text
    window.open(`http://172.21.161.101:8081/?query=${encodeURIComponent(text)}`);
    removeButton();
  });

  document.body.appendChild(button);
}

function removeButton() {
  const existingButton = document.querySelector('button');
  if (existingButton) {
    existingButton.remove();
  }
}