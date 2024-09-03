import React, { useState } from 'react';
import { Input, Button, Switch, Spacer } from '@nextui-org/react';
import GlobalModal from '../componets_globals/GlobalModal';
import GlobalAlert from '../componets_globals/GlobalAlert';
import axiosClient from '../../configs/axiosClient';

const RegistroElementoMaterial = ({ isOpen, onOpenChange, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    sitio: '',
    CodigoSena_Material: '',
    Categoria_Material: '',
    Tipo_Material: '',
    Nombre_Material: '',
    Descripcion_Material: '',
    stock: '',
    unidad_medida: '',
    producto_perecedero: false,
    FechaDevencimiento: '',
  });

  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axiosClient.post('/elemento_material/', formData);
      GlobalAlert.success('Elemento creado exitosamente');
      onRegisterSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Error al crear el elemento:', error);
      GlobalAlert.error('Hubo un error al crear el elemento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Registrar Nuevo Elemento"
      footer={(onClose) => (
        <Button auto onClick={handleSubmit} loading={loading}>
          Registrar
        </Button>
      )}
    >
      <Input
        label="Sitio"
        name="sitio"
        value={formData.sitio}
        onChange={handleChange}
        placeholder="Ingrese el sitio"
        fullWidth
      />
      <Input
        label="Código SENA Material"
        name="CodigoSena_Material"
        value={formData.CodigoSena_Material}
        onChange={handleChange}
        placeholder="Ingrese el código SENA"
        fullWidth
      />
      <Input
        label="Categoría Material"
        name="Categoria_Material"
        value={formData.Categoria_Material}
        onChange={handleChange}
        placeholder="Ingrese la categoría del material"
        fullWidth
      />
      <Input
        label="Tipo Material"
        name="Tipo_Material"
        value={formData.Tipo_Material}
        onChange={handleChange}
        placeholder="Ingrese el tipo de material"
        fullWidth
      />
      <Input
        label="Nombre Material"
        name="Nombre_Material"
        value={formData.Nombre_Material}
        onChange={handleChange}
        placeholder="Ingrese el nombre del material"
        fullWidth
      />
      <Input
        label="Descripción Material"
        name="Descripcion_Material"
        value={formData.Descripcion_Material}
        onChange={handleChange}
        placeholder="Ingrese una descripción del material"
        fullWidth
        multiline
        rows={3}
      />
      <Input
        label="Stock"
        name="stock"
        type="number"
        value={formData.stock}
        onChange={handleChange}
        placeholder="Ingrese el stock"
        fullWidth
      />
      <Input
        label="Unidad Medida"
        name="unidad_medida"
        value={formData.unidad_medida}
        onChange={handleChange}
        placeholder="Ingrese la unidad de medida"
        fullWidth
      />
      <Switch
        checked={formData.producto_perecedero}
        onChange={(e) => setFormData({ ...formData, producto_perecedero: e.target.checked })}
      >
        Producto Perecedero
      </Switch>
      <Input
        label="Fecha de Vencimiento"
        name="FechaDevencimiento"
        type="date"
        value={formData.FechaDevencimiento}
        onChange={handleChange}
        placeholder="Ingrese la fecha de vencimiento"
        fullWidth
      />
      <Button auto flat onClick={() => setIsExpanded(!isExpanded)} css={{ mt: '$4' }}>
        {isExpanded ? 'Ocultar Opciones Adicionales' : 'Mostrar Opciones Adicionales'}
      </Button>

      {isExpanded && (
        <div style={{ marginTop: '1rem' }}>
          <h4>Opciones Adicionales</h4>
          {/* Aquí puedes agregar opciones adicionales si es necesario */}
        </div>
      )}
    </GlobalModal>
  );
};

export default RegistroElementoMaterial;
