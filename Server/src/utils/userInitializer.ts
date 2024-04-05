import fs from 'fs';
import User from '../models/User';

export const initializeUsers = async (): Promise<void> => {
  try {
    // Leer el archivo usuarios.json
    const rawData = fs.readFileSync('src/utils/data/users.json', 'utf-8');
    const users = JSON.parse(rawData);

    // Count Documents (si es necesario)
    const count: number = await User.estimatedDocumentCount();

    // Comprueba si ya existen usuarios y elimínalos si es necesario
    if (count > 0) {
        await User.deleteMany();
    }

    // Crea los usuarios desde el archivo JSON (reemplaza User con el modelo correcto)
    User.insertMany(users);

    console.log('Usuarios inicializados correctamente.');
  } catch (error) {
    // Manejar cualquier error aquí
    console.error('Error al inicializar usuarios:', error);
  }
};

