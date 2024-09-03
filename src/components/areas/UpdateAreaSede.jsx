import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdateAreaSede = ({ item, onClose, refreshData }) => {
  const [sedes, setSedes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [selectedSede, setSelectedSede] = useState(item.sede_area || "");
  const [selectedArea, setSelectedArea] = useState(item.area_AreaSede || "");
  const [selectedAdmin, setSelectedAdmin] = useState(item.persona_administra || "");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSedes = async () => {
      try {
        const response = await axiosClient.get("sede/");
        setSedes(response.data);
      } catch (error) {
        console.error("Error fetching sedes:", error);
        GlobalAlert.error("Error al obtener las sedes.");
      }
    };

    const fetchAreas = async () => {
      try {
        const response = await axiosClient.get("/area/");
        setAreas(response.data);
      } catch (error) {
        console.error("Error fetching areas:", error);
        GlobalAlert.error("Error al obtener las áreas.");
      }
    };

    const fetchAdministradores = async () => {
      try {
        const response = await axiosClient.get("auth/users/");
        setAdministradores(response.data);
      } catch (error) {
        console.error("Error fetching administrators:", error);
        GlobalAlert.error("Error al obtener los administradores.");
      }
    };

    fetchSedes();
    fetchAreas();
    fetchAdministradores();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedSede || !selectedArea || !selectedAdmin) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.put(`/areaSede/${item.id}/`, {
        sede_area: selectedSede,
        area_AreaSede: selectedArea,
        persona_administra: selectedAdmin
      });
      console.log("Server response:", response.data);
      GlobalAlert.success("Sede actualizada correctamente.");
      refreshData();
      onClose();
    } catch (error) {
      console.error("Error updating area sede:", error);
      GlobalAlert.error("Error al actualizar la sede. " + (error.response?.data?.message || "Error interno del servidor."));
    }
  };

  return (
    <GlobalModal
      isOpen={true}
      onOpenChange={onClose}
      title="Actualizar Sede"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <label className="block">
          <span className="text-gray-700">Selecciona una sede</span>
          <select
            value={selectedSede}
            onChange={(e) => setSelectedSede(e.target.value)}
            className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>Seleccione una sede</option>
            {sedes.map((sede) => (
              <option key={sede.id} value={sede.id}>
                {sede.nombre_sede}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Selecciona un área</span>
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>Seleccione un área</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.nombre_area}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Selecciona un administrador</span>
          <select
            value={selectedAdmin}
            onChange={(e) => setSelectedAdmin(e.target.value)}
            className="border w-full rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          >
            <option value="" disabled>Seleccione un administrador</option>
            {administradores.map((admin) => (
              <option key={admin.id} value={admin.id}>
                {`${admin.first_name} ${admin.last_name}`}
              </option>
            ))}
          </select>
        </label>

        {error && <p className="text-red-500">{error}</p>}

        <Button color="primary" type="submit">
          Enviar
        </Button>
      </form>
      <Button color="danger" variant="light" onClick={onClose}>
        Cerrar
      </Button>
    </GlobalModal>
  );
};

export default UpdateAreaSede;
