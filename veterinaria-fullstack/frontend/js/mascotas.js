const tipo = document.getElementById("tipo");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const indice = document.getElementById("indice");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btn-guardar");
const listaMascotas = document.getElementById("lista-mascotas");
const url = "https://veterinaria-backend.now.sh/mascotas";

let mascotas = [];

async function listarMascotas() {
  try {
    const respuesta = await fetch(url);
    const mascotasDelServer = await respuesta.json();
    if (Array.isArray(mascotasDelServer)) {
      mascotas = mascotasDelServer;
    }
    if (mascotas.length > 0) {
      const htmlMascotas = mascotas
        .map(
          (mascota, index) => `<tr>
      <th scope="row">${index}</th>
      <td>${mascota.tipo}</td>
      <td>${mascota.nombre}</td>
      <td>${mascota.dueno}</td>
      <td>
          <div class="btn-group" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-info editar"><i class="fas fa-edit"></i></button>
              <button type="button" class="btn btn-danger eliminar"><i class="far fa-trash-alt"></i></button>
          </div>
      </td>
    </tr>`
        )
        .join("");
      listaMascotas.innerHTML = htmlMascotas;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
      Array.from(document.getElementsByClassName("eliminar")).forEach(
        (botonEliminar, index) => (botonEliminar.onclick = eliminar(index))
      );
      return;
    }
    listaMascotas.innerHTML = `<tr>
        <td colspan="5" class="lista-vacia">No hay mascotas</td>
      </tr>`;
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

async function enviarDatos(evento) {
  evento.preventDefault();
  try {
    const datos = {
      tipo: tipo.value,
      nombre: nombre.value,
      dueno: dueno.value,
    };
    let method = "POST";
    let urlEnvio = url;
    const accion = btnGuardar.innerHTML;
    if (accion === "Editar") {
      method = "PUT";
      mascotas[indice.value] = datos;
      urlEnvio = `${url}/${indice.value}`;
    }
    const respuesta = await fetch(urlEnvio, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
      mode: "cors",
    });
    if (respuesta.ok) {
      listarMascotas();
      resetModal();
    }
  } catch (error) {
    console.log({ error });
    $(".alert").show();
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = "Editar";
    $("#exampleModalCenter").modal("toggle");
    const mascota = mascotas[index];
    nombre.value = mascota.nombre;
    dueno.value = mascota.dueno;
    tipo.value = mascota.tipo;
    indice.value = index;
  };
}

function resetModal() {
  nombre.value = "";
  dueno.value = "";
  tipo.value = "";
  indice.value = "";
  btnGuardar.innerHTML = "Crear";
}

function eliminar(index) {
  const urlEnvio = `${url}/${index}`;
  return async function clickEnEliminar() {
    try {
      const respuesta = await fetch(urlEnvio, {
        method: "DELETE",
      });
      if (respuesta.ok) {
        listarMascotas();
        resetModal();
      }
    } catch (error) {
      console.log({ error });
      $(".alert").show();
    }
  };
}

listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
