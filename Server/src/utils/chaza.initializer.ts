import fs from 'fs';
import Chaza from '../models/Chaza';

export const initializeChazas = async (): Promise<void> => {
    try{
        //call assignOwnerToChazas
        //assignOwnerToChazas();
        // Leer el archivo chazas.json
        const rawData = fs.readFileSync('src/utils/data/chaza.json', 'utf-8');
        const chazas = JSON.parse(rawData);
        
        // Count Documents
        const count: number = await Chaza.estimatedDocumentCount();

        // Comprueba si ya existen productos y elimínalos si es necesario
        if(count>0){
            await Chaza.deleteMany();
        }
        // Crea los productos desde el archivo JSON
        await Chaza.insertMany(chazas);
    }catch(error){
        console.error('Error al inicializar chazas:', error);
    }
}