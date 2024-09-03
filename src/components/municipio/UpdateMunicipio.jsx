import React, { useState, useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert"; // Asegúrate de que la ruta sea correcta
import GlobalModal from "../componets_globals/GlobalModal"; // Asegúrate de que la ruta sea correcta
import { useDisclosure } from "@nextui-org/react";

export const UpdateMunicipio = ({ item, onClose, refreshData }) => {
  const { isOpen, onOpen, onClose: closeModal } = useDisclosure({ defaultOpen: true });
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    if (item) {
      setNombre(item.nombre);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/municipios/${item.id}/`, { nombre });
      GlobalAlert.success("Municipio actualizado exitosamente!");
      setNombre("");
      closeModal();
      refreshData();
    } catch (error) {
      GlobalAlert.error("Error al actualizar el municipio. Por favor, intente de nuevo.");
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={closeModal}
      title="Formulario de Actualización de Municipio"
      children={
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              label="Nombre del Municipio"
              placeholder="Ingrese el nombre del municipio"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Button color="primary" type="submit">
              Actualizar
            </Button>
          </div>
        </form>
      }
      footer={() => (
        <Button color="danger" variant="light" onClick={closeModal}>
          Cerrar
        </Button>
      )}
    />
  );
};

export default UpdateMunicipio;
