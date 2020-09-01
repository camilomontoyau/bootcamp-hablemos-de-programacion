const palabraSinAcentos = (palabra) =>
  palabra
    .toLowerCase()
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u");

const numeroAleatorio = () => Math.random().toString(36).split(".")[1];

module.exports = {
  palabraSinAcentos,
  numeroAleatorio,
};
