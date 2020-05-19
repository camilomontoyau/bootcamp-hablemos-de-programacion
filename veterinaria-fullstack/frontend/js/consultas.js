const listaConsultas = document.getElementById("lista-consultas");
const mascota = document.getElementById("mascota");
const veterinaria = document.getElementById("veterinaria");
const historia = document.getElementById("historia");
const diagnostico = document.getElementById("diagnostico");
const indice = document.getElementById("indice");
const btnGuardar = document.getElementById("btn-guardar");

let consultas = [];
let mascotas = [];
let veterinarias = [];

const url = "http://localhost:5000";

async function listarConsultas() {
  const entidad = "consultas";
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const consultasDelServidor = await respuesta.json();
    if (Array.isArray(consultasDelServidor)) {
      consultas = consultasDelServidor;
    }
    if (respuesta.ok) {
      const htmlConsultas = consultas
        .map(
          (consulta, indice) =>
            `<tr>
          <th scope="row">${indice}</th>
          <td>${consulta.mascota.nombre}</td>
          <td>${consulta.veterinaria.nombre} ${consulta.veterinaria.apellido}</td>
          <td>${consulta.diagnostico}</td>
          <td>${consulta.fechaCreacion}</td>
          <td>${consulta.fechaEdicion}</td>
          
          <td>
              <div class="btn-group" role="group" aria-label="Basic example">
                <button class="editar" type="button" class="btn btn-info">editar</button>
              </div>
          </td>
        </tr>`
        )
        .join("");
      listaConsultas.innerHTML = htmlConsultas;
      Array.from(document.getElementsByClassName("editar")).forEach(
        (botonEditar, index) => (botonEditar.onclick = editar(index))
      );
    }
  } catch (error) {
    throw error;
  }
}

async function listarMascotas() {
  const entidad = "mascotas";
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const mascotasDelServidor = await respuesta.json();
    if (Array.isArray(mascotasDelServidor)) {
      mascotas = mascotasDelServidor;
    }
    if (respuesta.ok) {
      mascotas.forEach((_mascota, indice) => {
        const optionActual = document.createElement("option");
        optionActual.innerHTML = _mascota.nombre;
        optionActual.value = indice;
        mascota.appendChild(optionActual);
      });
    }
  } catch (error) {
    throw error;
  }
}

async function listarVeterinarias() {
  const entidad = "veterinarias";
  try {
    const respuesta = await fetch(`${url}/${entidad}`);
    const veterinariasDelServidor = await respuesta.json();
    if (Array.isArray(veterinariasDelServidor)) {
      veterinarias = veterinariasDelServidor;
    }
    if (respuesta.ok) {
      veterinarias.forEach((_veterinaria, indice) => {
        const optionActual = document.createElement("option");
        optionActual.innerHTML = `${_veterinaria.nombre} ${_veterinaria.apellido}`;
        optionActual.value = indice;
        veterinaria.appendChild(optionActual);
      });
    }
  } catch (error) {
    throw error;
  }
}

function editar(index) {
  return function cuandoCliqueo() {
    btnGuardar.innerHTML = "Editar";
    $("#exampleModalCenter").modal("toggle");
    const consulta = consultas[index];
    indice.value = index;
    mascota.value = consulta.mascota.id;
    veterinaria.value = consulta.veterinaria.id;
    historia.value = consulta.historia;
    diagnostico.value = consulta.diagnostico;
  };
}

async function enviarDatos(evento) {
  const entidad = "consultas";
  evento.preventDefault();
  try {
    const datos = {
      mascota: mascota.value,
      veterinaria: veterinaria.value,
      historia: historia.value,
      diagnostico: diagnostico.value,
    };
    const accion = btnGuardar.innerHTML;
    let urlEnvio = `${url}/${entidad}`;
    let method = "POST";
    if (accion === "Editar") {
      urlEnvio += `/${indice.value}`;
      method = "PUT";
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
      listarConsultas();
      //resetModal();
    }
  } catch (error) {
    throw error;
  }
}

btnGuardar.onclick = enviarDatos;

listarMascotas();
listarConsultas();
listarVeterinarias();
