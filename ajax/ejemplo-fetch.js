const listaUsuarios = document.getElementById("body-usuarios");
const boton = document.getElementById("boton");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const pais = document.getElementById("pais");
let usuarios = [];
let botonesEliminar = null;

function render() {
  const usuariosRender = usuarios
    .map((usuario, indice) => {
      return `<tr>  
        <td>${usuario.nombre ? usuario.nombre : 'vacio'}</td>
        <td>${usuario.apellido ? usuario.apellido : 'vacio'}</td>
        <td>${usuario.pais ? usuario.pais : 'vacio'}</td>
        <td><button class="eliminar" data-indice=${indice}  >Eliminar</button></td>
      </tr>`
    })
    .join("");
  console.log(usuariosRender);
  listaUsuarios.innerHTML = usuariosRender;
  botonesEliminar = document.getElementsByClassName('eliminar');
  Array.from(botonesEliminar).forEach(botonEliminar => {
    botonEliminar.onclick = eliminarUnUsuario;
  });
}

function enviarDatos(e) {
  e.preventDefault();
  const datos = {
    nombre: nombre.value, 
    apellido: apellido.value, 
    pais: pais.value
  };
  fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios', {
      method: 'POST',
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

function eliminarUnUsuario(e) {
  e.preventDefault();
  console.log('eliminarUnUsuario', e);
  fetch(`https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios/${e.target.dataset.indice}`, {
      method: 'DELETE',
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
//Create, Read, Update,  Delete, Listar

refrescar();

boton.onclick = enviarDatos;
