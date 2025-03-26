import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { SuppliersList } from '../../../components/organisms/SuppliersList'
import { supplierService, SupplierData } from '../../../lib/suppliers'
import { SuppierDAO } from '../../../interfaces/Auth'

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);
  const [loading, setLoading] = useState(true);

  const listESuppliers = async () => {
    try {
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error('Error al obtener proveedor:', error);
    } finally {
      setLoading(false); 
    }
  };
  useEffect(() => {
    listESuppliers();
  }, []);

  return (
    <ProtectedRoute permissionName="GESTIONAR_INVENTARIO">
      {loading ? (
        <Text className="text-white text-center mt-10">Cargando proveedores...</Text>
      ) : (
        <SuppliersList suppliers={suppliers} listSuppliers={listESuppliers} />
      )}
    </ProtectedRoute>
  );
}

export default Suppliers;