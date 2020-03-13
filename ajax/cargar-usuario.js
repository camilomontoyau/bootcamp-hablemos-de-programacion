let usuarios = [];

function obtenerUsuario() {
    fetch('https://bootcamp-dia-3.camilomontoyau.now.sh/usuarios')
    .then(response=>response.json())
    .then(respuestaUsuarios=>{
      console.log('respuestaUsuarios', respuestaUsuarios)
      usuarios = respuestaUsuarios
      render();
    })
  }

obtenerUsuario()