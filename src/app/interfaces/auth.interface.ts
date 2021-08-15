export interface Auth {
    usuario: Usuario;
    token:   string;
}

export interface Usuario {
    id?: number;
    nombre: string;
    email:  string;
    avatar?: null;
    area:   Area;
    role:   Area;
}

export interface Area {
    id:     number;
    nombre: string;
}