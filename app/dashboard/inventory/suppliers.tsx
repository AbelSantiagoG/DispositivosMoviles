import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { SuppliersList } from '../../../components/organisms/SuppliersList'
import { supplierService, SupplierData } from '../../../lib/suppliers'
import { SuppierDAO } from '../../../interfaces/Auth'
import { PERMISSIONS } from '../../../constants/permissions';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const listESuppliers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await supplierService.getAllSuppliers();
      setSuppliers(data);
    } catch (error) {
      setError('No se pudieron cargar los proveedores');
    } finally {
      setLoading(false); 
    }
  };
  
  useEffect(() => {
    listESuppliers();
  }, []);

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_INVENTARIO}>
      {loading ? (
        <Text className="text-white text-center mt-10">Cargando proveedores...</Text>
      ) : error ? (
        <Text className="text-red-500 text-center mt-10">{error}</Text>
      ) : (
        <SuppliersList suppliers={suppliers} listSuppliers={listESuppliers} />
      )}
    </ProtectedRoute>
  );
}

export default Suppliers;