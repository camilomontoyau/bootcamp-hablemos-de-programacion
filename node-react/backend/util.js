const palabraSinAcentos = (palabra) =>
  palabra
    .toLowerCase()
    .replace("á", "a")
    .replace("é", "e")
    .replace("í", "i")
    .replace("ó", "o")
    .replace("ú", "u");

module.exports = {
  palabraSinAcentos,
};
