export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
}

export const users: User[] = [
  {
    id: 1,
    email: 'admin@tienda.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin'
  },
  {
    id: 2,
    email: 'usuario@example.com',
    password: 'user123',
    name: 'Usuario Demo',
    role: 'user'
  }
];
