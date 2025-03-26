export interface StandardResponseDAO {
    status: number;
    message: string;
}

export interface PermissionDAO {
    id: number;
    name: string;
    description: string;
}

export interface RoleDAO {
    id: number;
    name: string;
    description: string;
    permissions: PermissionDAO[];
}

export interface EnterpriseDAO {
    id: number;
    name: string;
    NIT: string;
}

export interface UserDAO {
    id: number;
    name: string;
    lastname: string;
    email: string;
    code: string;
    telephone: string;
    enterprise_id: number;
    is_active: boolean;
    role: RoleDAO;
    enterprise: EnterpriseDAO;
}

export interface SuppierDAO{
    id: number;
    name: string;
    telephone: string;
    email : string;
    enterprise: EnterpriseDAO;
}

export interface AuthResponseDAO extends StandardResponseDAO {
    data: UserDAO;
    token?: string;
}

// Para uso en el contexto de autenticación
export interface AuthContextType {
    user: UserDAO | null;
    token: string | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}
