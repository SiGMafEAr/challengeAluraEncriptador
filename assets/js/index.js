const textAreaInp = document.querySelector(".inputSectionTextarea");
const btnEncrypt = document.querySelector(".buttonEncrypt");
const btnDecrypt = document.querySelector(".buttonDecrypt");
const textAreaOut = document.querySelector(".outputSectionTextarea");
const btnCopy = document.querySelector(".buttonCopy");
const containerNotMessage = document.querySelector(".outputSectionContainerNotMessage");
const rules = {
  "a": "ai",
  "e": "enter",
  "i": "imes",
  "o": "ober",
  "u": "ufat"
};
const regex = /^[a-z.,!?\s]*$/;

document.addEventListener("DOMContentLoaded", function () {
  btnCopy.style.display = "none";
});

textAreaInp.addEventListener("input", function () {
  const hasInput = textAreaInp.value.trim() !== "" || textAreaOut.value.trim() !== "";
  containerNotMessage.style.display = hasInput ? "none" : "";
  btnCopy.style.display = hasInput ? "" : "none";
});

btnEncrypt.addEventListener("click", function () {
  const textUser = textAreaInp.value.trim();
  if (!textUser) {
    return myAlert("error", "Introducir el texto a encriptar, por favor");
  }
  if (!regex.test(textUser)) {
    return myAlert("error", "El texto no tiene el formato requerido");
  }
  showMessageOutput(encryptText(textUser));
});

btnDecrypt.addEventListener("click", function () {
  const textEncrypted = textAreaInp.value.trim();
  if (!textEncrypted) {
    return myAlert("error", "Introducir el texto a desencriptar, por favor");
  }
  if (!regex.test(textEncrypted)) {
    return myAlert("error", "El texto no tiene el formato requerido");
  }
  showMessageOutput(decryptText(textEncrypted));
});

btnCopy.addEventListener("click", function () {
  const trimmedOutput = textAreaOut.value.trim();
  if (!trimmedOutput) {
    return myAlert("error", "No hay texto para copiar");
  }
  navigator.clipboard.writeText(trimmedOutput)
    .then(() => myAlert("success", "Texto copiado"))
    .catch(() => myAlert("error", "Error al copiar el texto"));
});

/*Uso de spread (...textUser) para convertir el texto en un array de caracteres: [...textUser]
  Mapeo de cada carácter a su equivalente encriptado: map(char => rules[char] || char)
  Unión de los caracteres encriptados en un nuevo texto: join("")
  Devolución del texto encriptado*/
function encryptText(textUser) {
  myAlert("success", "¡Texto encriptado con éxito!");
  return [...textUser].map(char => rules[char] || char).join("");
}

/*Iteración a través de las reglas de encriptación: entries(rules)
  Reemplazo de los caracteres encriptados por sus equivalentes originales: 
    reduce((acc, [key, value]) => acc.split(value).join(key), textUser)
  Devolución del texto desencriptado: */
function decryptText(textUser) {
  myAlert("success", "¡Texto desencriptado con éxito!");
  //return Object.entries(rules).reduce((acc, [key, value]) => acc.replaceAll(value, key), textUser);
  return Object.entries(rules).reduce((acc, [key, value]) => acc.split(value).join(key), textUser);
}

function showMessageOutput(phrase) {
  textAreaOut.value = phrase;
}

function myAlert(icon, message) {
  Swal.fire({
    icon: icon,
    text: message,
    timer: 1500,
    showConfirmButton: false,
    width: '30em'
  });
}