const obtenerNombre = () => "Camilo";

const obtenerApellido = () => "Montoya";

function obtenerNombreCompleto() {
  const nombre = obtenerNombre();
  const apellido = obtenerApellido();
  return `${nombre} ${apellido}`;
}

const nombreCompleto = obtenerNombreCompleto();

console.log("nombre completo ", nombreCompleto);
