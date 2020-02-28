const listaUsuarios = document.getElementById("body-usuarios");
const boton = document.getElementById("boton");
const nombre = document.getElementById("nombre");
let usuarios = [];

function render() {
  const usuariosRender = usuarios
    .map(usuario => `<tr><td>${usuario.nombre}</td></tr>`)
    .join("");
  console.log(usuariosRender);
  listaUsuarios.innerHTML = usuariosRender;
}

function enviarDatos() {
  const datos = {nombre: nombre.value};
  fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    })
    .then((response) => response.json())
    .then(respuestaJson=>{
      console.log('respuestaJson', respuestaJson)
      refrescar();
    })
}

function refrescar() {
  fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
  .then(response=>response.json())
  .then(respuestaUsuarios=>{
    console.log('respuestaUsuarios', respuestaUsuarios)
    usuarios = respuestaUsuarios
    render();
  })
}

refrescar();

boton.onclick = enviarDatos;
