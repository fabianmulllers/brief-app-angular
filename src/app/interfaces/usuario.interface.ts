export interface Usuarios {
    id?: number;
    nombre: string;
    email:  string;
    avatar: null;
    estado: boolean;
    area:   AreaRole;
    role:   AreaRole;
}

export interface AreaRole {
    id:     number;
    nombre: string;
}

export interface AgregarUsuario {
    id?: number;
    nombre: string;
    email:  string;
    password?: string;
    avatar?: string;
    area: number,
    role: number
}
