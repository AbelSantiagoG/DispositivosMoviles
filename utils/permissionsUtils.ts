import { UserDAO } from '../interfaces/Auth';

/**
 * Verifica si un usuario tiene un permiso específico
 * @param user Usuario actual
 * @param permissionName Nombre del permiso a verificar
 * @returns true si el usuario tiene el permiso, false en caso contrario
 */
export const hasPermission = (user: UserDAO | null, permissionName: string): boolean => {
  if (!user || !user.role || !user.role.permissions) return false;
  return user.role.permissions.some(permission => permission.name === permissionName);
};

/**
 * Verifica si un usuario tiene varios permisos
 * @param user Usuario actual
 * @param permissionNames Lista de nombres de permisos a verificar
 * @returns true si el usuario tiene todos los permisos, false en caso contrario
 */
export const hasAllPermissions = (user: UserDAO | null, permissionNames: string[]): boolean => {
  return permissionNames.every(permissionName => hasPermission(user, permissionName));
};

/**
 * Verifica si un usuario tiene alguno de los permisos especificados
 * @param user Usuario actual
 * @param permissionNames Lista de nombres de permisos a verificar
 * @returns true si el usuario tiene al menos uno de los permisos, false en caso contrario
 */
export const hasAnyPermission = (user: UserDAO | null, permissionNames: string[]): boolean => {
  return permissionNames.some(permissionName => hasPermission(user, permissionName));
}; 