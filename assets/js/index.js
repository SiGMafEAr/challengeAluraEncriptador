const textAreaInp = document.querySelector(".inputSectionTextarea");
const btnEncrypt = document.querySelector(".buttonEncrypt");
const btnDecrypt = document.querySelector(".buttonDecrypt");
const textAreaOut = document.querySelector(".outputSectionTextarea");
const btnCopy = document.querySelector(".buttonCopy");
const containerNotMessage = document.querySelector(".outputSectionContainerNotMessage");
const regex = /^[a-z.,!?\s]*$/;

document.addEventListener("DOMContentLoaded", function () {
  btnCopy.style.display = "none";
});

textAreaInp.addEventListener("input", function () {
  if (textAreaInp.value != "" || textAreaOut.value != "") {
    containerNotMessage.style.display = "none";
    btnCopy.style.display = "";
  } else {
    containerNotMessage.style.display = "";
    btnCopy.style.display = "none";
  }
});

btnEncrypt.addEventListener("click", function () {

  const textUser = textAreaInp.value.trim();

  if (textUser.length > 0) {
    if (regex.test(textUser)) {
      let encryptedText = encryptText(textAreaInp.value);
      showMessageOutput(encryptedText);
      textAreaInp.value = "";
    } else {
      myAlert("error", "El texto no tiene el formato especificado");
      showMessageOutput("");
    }
  } else {
    myAlert("error", "Por favor, ingresa un texto a encriptar");
    showMessageOutput("");
  }

});

btnDecrypt.addEventListener("click", function () {

  const textEncrypted = textAreaInp.value.trim();

  if (textEncrypted.length > 0) {
    if (regex.test(textEncrypted)) {
      let decryptedText = decryptText(textAreaInp.value);
      showMessageOutput(decryptedText);
      textAreaInp.value = "";
    } else {
      myAlert("error", "El texto no tiene el formato requerido");
      showMessageOutput("");
    }
  } else {
    myAlert("error", "Por favor, ingresa un texto a desencriptar");
    showMessageOutput("");
  }

});

btnCopy.addEventListener("click", function () {

  textAreaOut.select();
  if (textAreaOut.value.trim().length > 0) {
    navigator.clipboard.writeText(textAreaOut.value)
      .then(() => { myAlert("success", "Texto copiado");
      showMessageOutput(""); })
      .catch(error => { myAlert("error", "No se pudo copiar"); });
  } else {
    myAlert("error", "No hay texto que copiar");
  }
});


function encryptText(textUser) {

  let encryptedText = "";

  for (let t = 0; t < textUser.length; t++) {

    let encryptedLetter = false;

    for (let i = 0; i < rules.length; i++) {
      if (textUser[t] == rules[i][0]) {
        encryptedText += rules[i][1];
        encryptedLetter = true;
        break;
      }
    }

    if (!encryptedLetter) {
      encryptedText += textUser[t];
    }
  }
  return encryptedText;
}

function decryptText(textUser) {

  for (let i = 0; i < rules.length; i++) {
    if (textUser.includes(rules[i][1])) {
      textUser = textUser.replaceAll(rules[i][1], rules[i][0]);
    }
  }
  return textUser;
}

function showMessageOutput(phrase) {
  textAreaOut.innerText = phrase;
}

function myAlert(icon, message) {
  Swal.fire({
    icon: icon,
    text: message,
    timer: 3000,
    showConfirmButton: false,
    width: '30em'
  });
}

const rules = [
  ["a", "ai"],
  ["e", "enter"],
  ["i", "imes"],
  ["o", "ober"],
  ["u", "ufat"]
]