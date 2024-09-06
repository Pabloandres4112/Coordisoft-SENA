import React, { useState, useEffect } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import axiosClient from '../../configs/axiosClient';
import GlobalAlert from '../componets_globals/GlobalAlert';
import GlobalModal from '../componets_globals/GlobalModal';
import { useDisclosure } from '@nextui-org/react';

const RegistroSitio = ({ onRegisterSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [personaEncargada, setPersonaEncargada] = useState("");
  const [nombreSitio, setNombreSitio] = useState("");
  const [tipoSitio, setTipoSitio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fichaTecnica, setFichaTecnica] = useState("");
  const [tiposSitioOptions, setTiposSitioOptions] = useState([]);
  const [personasOptions, setPersonasOptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [personasResponse, tiposResponse] = await Promise.all([
          axiosClient.get('/auth/me'),
          axiosClient.get('/tipo_sitio/')
        ]);

        // Procesa personasResponse
        const personasData = Array.isArray(personasResponse.data) ? personasResponse.data : [personasResponse.data];
        setPersonasOptions(personasData.map(persona => ({
          id: persona.id,
          username: persona.username
        })));

        // Procesa tiposResponse
        if (Array.isArray(tiposResponse.data)) {
          setTiposSitioOptions(tiposResponse.data.map(tipo => ({
            id: tipo.id,
            nombre_tipoSitio: tipo.tipo_movimiento
          })));
        } else {
          console.error('La respuesta de tipos de sitio no es un array:', tiposResponse.data);
          GlobalAlert.error('Error en la respuesta de tipos de sitio.');
        }
      } catch (error) {
        console.error('Error al obtener opciones:', error);
        GlobalAlert.error('Hubo un error al obtener las opciones.');
      }
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!personaEncargada || !nombreSitio || !tipoSitio || !ubicacion || !fichaTecnica) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const data = {
      persona_encargada: personaEncargada ? parseInt(personaEncargada, 10) : null,
      nombre_sitio: nombreSitio,
      tipo_sitio: tipoSitio ? parseInt(tipoSitio, 10) : null,
      ubicacion,
      ficha_tecnica: fichaTecnica
    };

    console.log('Datos enviados:', data);

    try {
      await axiosClient.post('/sitio/', data);
      GlobalAlert.success('Sitio registrado exitosamente!');
      resetForm();
      onClose();
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (error) {
      console.error('Error al registrar el sitio:', error.response?.data || error);
      GlobalAlert.error('Hubo un error al registrar el sitio.');
    }
  };

  const resetForm = () => {
    setPersonaEncargada('');
    setNombreSitio('');
    setTipoSitio('');
    setUbicacion('');
    setFichaTecnica('');
    setError('');
  };

  return (
    <div className="flex flex-col gap-2">
      <Button onPress={onOpen} className="max-w-fit">Registrar Sitio</Button>
      <GlobalModal
        isOpen={isOpen}
        onOpenChange={onClose}
        title="Formulario de Registro de Sitio"
        footer={() => (
          <Button color="danger" variant="light" onClick={onClose}>
            Cerrar
          </Button>
        )}
      >
        <form onSubmit={handleSubmit}>
        <Select
  css={{ width: '100%' }}
  label="Persona Encargada"
  placeholder="Seleccione la persona encargada"
  value={personaEncargada}
  onChange={(value) => setPersonaEncargada(value)}
  required
>
  {personasOptions.map((persona) => (
    <SelectItem key={persona.id} value={persona.id.toString()}>
      {persona.username}
    </SelectItem>
  ))}
</Select>


          <Input
            label="Nombre del Sitio"
            placeholder="Ingrese el nombre del sitio"
            value={nombreSitio}
            onChange={(e) => setNombreSitio(e.target.value)}
            required
          />

          <Select
            css={{ width: '100%' }}
            label="Tipo de Sitio"
            placeholder="Seleccione el tipo de sitio"
            value={tipoSitio}
            onChange={(value) => setTipoSitio(value)}
            required
          >
            {tiposSitioOptions.map((tipo) => (
              <SelectItem key={tipo.id} value={tipo.id.toString()}>
                {tipo.nombre_tipoSitio}
              </SelectItem>
            ))}
          </Select>

          <Input
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />

          <Input
            label="Ficha Técnica"
            placeholder="Ingrese la ficha técnica"
            value={fichaTecnica}
            onChange={(e) => setFichaTecnica(e.target.value)}
            required
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Registrar</Button>
        </form>
      </GlobalModal>
    </div>
  );
};

export default RegistroSitio;
