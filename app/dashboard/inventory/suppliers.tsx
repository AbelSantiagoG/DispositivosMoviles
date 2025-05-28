import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ProtectedRoute } from '../../../context/ProtectedRoute';
import { SuppliersList } from '../../../components/organisms/SuppliersList'
import { useSupplierService, SupplierData } from '../../../lib/suppliers'
import { PERMISSIONS } from '../../../constants/permissions';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<(SupplierData & { id: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supplierService = useSupplierService();

  const listSuppliers = async () => {
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
    listSuppliers();
  }, []);

  return (
    <ProtectedRoute permissionName={PERMISSIONS.GESTIONAR_INVENTARIO}>
      {loading ? (
        <Text className="text-white text-center mt-10">Cargando proveedores...</Text>
      ) : error ? (
        <Text className="text-red-500 text-center mt-10">{error}</Text>
      ) : (
        <SuppliersList suppliers={suppliers} listSuppliers={listSuppliers} />
      )}
    </ProtectedRoute>
  );
}

export default Suppliers;