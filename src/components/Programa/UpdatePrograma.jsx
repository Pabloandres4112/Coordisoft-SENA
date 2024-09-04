import React, { useState, useEffect } from "react";
import { Button, Select, SelectItem, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";

const UpdatePrograma = ({ item, onClose, refreshData }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [nombrePrograma, setNombrePrograma] = useState("");
  const [areas, setAreas] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axiosClient.get("/area/");
        setAreas(response.data);
      } catch (error) {
        console.error("Error al obtener las áreas:", error);
        GlobalAlert.error("Hubo un error al obtener las áreas.");
      }
    };

    fetchAreas();
  }, []);

  useEffect(() => {
    if (item) {
      setNombrePrograma(item.nombre_programa || "");
      setSelectedArea(item.area_programa?.id?.toString() || "");
    }
  }, [item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!nombrePrograma || !selectedArea) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const data = {
      nombre_programa: nombrePrograma,
      area_programa: parseInt(selectedArea), // Enviar solo el ID
    };

    try {
      await axiosClient.put(`/programa/${item.id}/`, data);
      GlobalAlert.success("Programa actualizado correctamente.");
      onClose();
      if (refreshData) refreshData();
    } catch (error) {
      console.error("Error al actualizar el programa:", error.response?.data || error);
      GlobalAlert.error(`Hubo un error al actualizar el programa: ${error.response?.data?.detail || "Error desconocido"}`);
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={() => setIsOpen(!isOpen)}
      title="Actualizar Programa"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Nombre del Programa"
              placeholder="Ingrese el nombre del programa"
              value={nombrePrograma}
              onChange={(e) => setNombrePrograma(e.target.value)}
              required
            />
            <Select
              label="Selecciona un área"
              placeholder="Seleccione un área"
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              required
            >
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id.toString()}>
                  {area.nombre_area}
                </SelectItem>
              ))}
            </Select>
            {error && <p className="text-red-500">{error}</p>}
            <Button color="primary" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      }
      footer={() => (
        <Button color="danger" variant="light" onClick={onClose}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdatePrograma;
