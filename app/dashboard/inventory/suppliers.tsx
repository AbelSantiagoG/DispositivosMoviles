import { View, Text } from 'react-native'
import React from 'react'
import {SuppliersList} from '../../../components/organisms/SuppliersList'
import { SuppierDAO } from '../../../interfaces/Auth'


const mockSuppliers: SuppierDAO[]= [
  {
    id: 1,
    name: 'Proveedor 1',
    telephone: '123-456-7890',
    email : 'proveedor1@gmail.com',
    enterprise: {
      id: 1,
      name: 'Empresa 1',
      NIT: '123456789',
    }
  },
  {
    id: 2,
    name: 'Proveedor 2',
    telephone: '987-654-3210',
    email : 'proveedor2@gmail.com',
    enterprise: {
      id: 2,
      name: 'Empresa 2',
      NIT: '23456789',
    }
  },
  {
    id: 3,
    name: 'Proveedor 3',
    telephone: '555-555-5555',
    email : 'proveedor3@gmail.com',
    enterprise: {
      id: 3,
      name: 'Empresa 3',
      NIT: '09876',
    }
  },
]

const suppliers = () => {
  return (
    <SuppliersList suppliers={mockSuppliers} />
  )
}

export default suppliers