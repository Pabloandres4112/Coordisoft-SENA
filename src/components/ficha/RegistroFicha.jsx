import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import axiosClient from "../../configs/axiosClient";
import GlobalAlert from "../componets_globals/GlobalAlert";
import GlobalModal from "../componets_globals/GlobalModal";
import { useDisclosure } from "@nextui-org/react";

export const RegistroFicha = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [idFicha, setIdFicha] = useState("");
  const [personaFichaId, setPersonaFichaId] = useState("");
  const [programaId, setProgramaId] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos requeridos
    if (!idFicha || !personaFichaId || !programaId || !slug) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await axiosClient.post("/ficha/", {
        id_ficha: idFicha, // Incluir el id_ficha en la petición
        persona_ficha: parseInt(personaFichaId, 10),
        programa: parseInt(programaId, 10),
        slug: slug,
      });

      GlobalAlert.success("Ficha registrada correctamente.");
      // Limpiar los campos del formulario
      setIdFicha("");
      setPersonaFichaId("");
      setProgramaId("");
      setSlug("");
      onClose();
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      console.error("Error al registrar la ficha:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
        setError(error.response.data.detail || "Hubo un error al registrar la ficha.");
      } else {
        setError("Hubo un error al registrar la ficha.");
      }
      GlobalAlert.error("Hubo un error al registrar la ficha.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Ficha</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Ficha"
        children={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                label="ID de la Ficha"
                placeholder="Ingrese el ID de la ficha"
                value={idFicha}
                onChange={(e) => setIdFicha(e.target.value)}
                required
              />
              <Input
                type="text"
                label="ID de Persona Ficha"
                placeholder="Ingrese el ID de la persona ficha"
                value={personaFichaId}
                onChange={(e) => setPersonaFichaId(e.target.value)}
                required
              />
              <Input
                type="text"
                label="ID del Programa"
                placeholder="Ingrese el ID del programa"
                value={programaId}
                onChange={(e) => setProgramaId(e.target.value)}
                required
              />
              <Input
                type="text"
                label="Slug"
                placeholder="Ingrese un slug único"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
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
    </div>
  );
};

export default RegistroFicha;
