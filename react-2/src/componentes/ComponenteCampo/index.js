import React, { useState, useEffect } from "react";
import Input from "../Input";
import Select from "../Select";
import { listarEntidad } from "../../servicio";

const opcionesIniciales = {
  tipo: [
    { valor: "Perro", etiqueta: "Perro" },
    { valor: "Gato", etiqueta: "Gato" },
    { valor: "Pájaro", etiqueta: "Pájaro" },
    { valor: "Otro", etiqueta: "Otro" },
  ],
  diagnostico: [
    { valor: "Prurito de piel (sarna)", etiqueta: "Prurito de piel (sarna)" },
    { valor: "Moquillo", etiqueta: "Moquillo" },
    { valor: "Trauma cefálico", etiqueta: "Trauma cefálico" },
    { valor: "Parvovirosis", etiqueta: "Parvovirosis" },
  ],
};

function ComponenteCampo({
  manejarInput = () => {},
  objeto = {},
  nombreCampo = "",
}) {
  const [options, setOptions] = useState(opcionesIniciales);

  useEffect(() => {
    const obtenerOptionsBackend = async () => {
      const mascotasPromise = listarEntidad({ entidad: "mascotas" });
      const veterinariasPromise = listarEntidad({ entidad: "veterinarias" });
      const duenosPromise = listarEntidad({ entidad: "duenos" });
      let [mascota, veterinaria, dueno] = await Promise.all([
        mascotasPromise,
        veterinariasPromise,
        duenosPromise,
      ]);
      console.log("uno", { mascota, veterinaria, dueno });
      mascota = mascota.map((_mascota, index) => ({
        valor: index,
        etiqueta: `${_mascota.nombre} (${_mascota.tipo})`,
      }));
      veterinaria = veterinaria.map((_veterinaria, index) => ({
        valor: index,
        etiqueta: `${_veterinaria.nombre} ${_veterinaria.apellido}`,
      }));
      dueno = dueno.map((_dueno, index) => ({
        valor: index,
        etiqueta: `${_dueno.nombre} ${_dueno.apellido}`,
      }));

      const nuevasOpciones = { ...options, mascota, veterinaria, dueno };
      setOptions(nuevasOpciones);
    };

    obtenerOptionsBackend();
  }, []);

  switch (nombreCampo) {
    case "tipo":
    case "mascota":
    case "veterinaria":
    case "diagnostico":
    case "dueno":
      return (
        <div className="col">
          <Select
            nombreCampo={nombreCampo}
            options={options[nombreCampo]}
            onChange={manejarInput}
            placeholder={nombreCampo}
            value={objeto[nombreCampo]}
          />
        </div>
      );

    case "nombre":
    case "apellido":
    case "documento":
    case "historia":
      return (
        <div className="col">
          <Input
            nombreCampo={nombreCampo}
            tipo="text"
            onInput={manejarInput}
            placeholder={nombreCampo}
            value={objeto[nombreCampo]}
          />
        </div>
      );
    default:
      return false;
  }
}

export default ComponenteCampo;
