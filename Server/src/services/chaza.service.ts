import multer from "multer";
import multerS3 from "multer-s3";
import Chaza from "../models/Chaza";
import { s3Config } from "../config/s3";
import {
  ChazaI,
  ChazaCreateI,
  ChazaUpdateI,
  ChazaReadI,
  ChazaQRI,
  ChazaLocationI,
  comment,
  chazaNumbers,
  Stats
} from "../types/chaza";
import orderService from "./Order.service";
import productService from "./product.service";
import chaza from "../controllers/chaza.controller";

const chazaService = {
  get: async function (_id: String): Promise<ChazaReadI | null> {
    //Consultar en la colección de chazas de la base de datos
    const chazaDB = await Chaza.findOne({ owner: _id }).exec();
    if (!chazaDB) return null;
    const products = await productService.getProductsList(
      chazaDB.products.map((product) => product._id.toString())
    );

    //Convertir el resultado a un objeto de tipo ChazaI
    let chaza: ChazaReadI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
      comments: chazaDB.comments,
      qr: chazaDB.qr,
    };
    //Retornar la chaza
    return chaza;
  },
  getLocations: async function (): Promise<ChazaLocationI[]> {
    //Consultar la colección de chazas de la base de datos
    const chazaListDB = await Chaza.find().exec();
    //Convertir el resultado a un arreglo de objetos de tipo ChazaI
    let locations = chazaListDB.map((chaza) => ({
      _id: chaza._id,
      address: chaza.address,
    }));
    //Retornar el arreglo de chazas
    return locations;
  },
  getByName: async function (name: String): Promise<ChazaReadI | null> {
    //Consultar en la colección de chazas de la base de datos
    const chazaDB = await Chaza.findOne({ name: name }).exec();
    if (!chazaDB) return null;
    const products = await productService.getProductsList(
      chazaDB.products.map((product) => product._id.toString())
    );

    //Convertir el resultado a un objeto de tipo ChazaI
    let chaza: ChazaReadI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
      comments: chazaDB.comments,
      qr: chazaDB.qr,
    };
    //Retornar la chaza
    return chaza;
  },
  getAll: async function (): Promise<ChazaI[]> {
    //Consultar la colección de chazas de la base de datos
    const chazaListDB = await Chaza.find().exec();
    //Convertir el resultado a un arreglo de objetos de tipo ChazaI
    let chazas = chazaListDB.map((chaza) => ({
      _id: chaza._id,
      owner: chaza.owner,
      name: chaza.name,
      description: chaza.description,
      type: chaza.type,
      address: chaza.address,
      phone: chaza.phone,
      products: chaza.products,
      score: chaza.score,
      image: chaza.image,
      payment_method: chaza.payment_method,
      qr: chaza.qr,
    }));
    //Retornar el arreglo de chazas
    return chazas;
  },
  create: async function (chaza: ChazaCreateI, image: string): Promise<ChazaI> {
    const chazaExist = await this.getByName(chaza.name);
    if (chazaExist) throw new Error("Chaza already exist");
    //Crear una nueva chaza que va a ser guardado en la base de datos
    let newChaza = new Chaza({
      owner: chaza.owner,
      name: chaza.name,
      description: chaza.description,
      type: chaza.type,
      address: chaza.address,
      phone: chaza.phone,
      products: chaza.products,
      score: chaza.score,
      image: image,
      payment_method: chaza.payment_method,
      qr: "",
    });
    if (!newChaza) throw new Error("Error creating chaza");
    //Guardar la chaza en la base de datos
    let result = await newChaza.save();
    if (!result) throw new Error("Error saving chaza");
    //Convertir el resultado a un objeto de tipo ChazaI
    let data: ChazaI = {
      _id: result._id,
      owner: result.owner,
      name: result.name,
      description: result.description,
      type: result.type,
      address: result.address,
      phone: result.phone,
      products: result.products,
      score: result.score,
      image: result.image,
      payment_method: result.payment_method,
      qr: result.qr,
    };
    //Retornar la chaza creada
    return data;
  },
  update: async function (newChaza: ChazaUpdateI): Promise<void> {
    //Actualizar la chaza en la base de datos no retorna nada pues
    //findOneAndUpdate no retorna el objeto actualizado sino el objeto antes de actualizar
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: newChaza.owner },
      newChaza
    ).exec();
    if (!chazaDB) throw new Error("Error updating chaza");
  },
  uploadQR: async function (newChaza: ChazaQRI, image: string): Promise<void> {
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: newChaza._id },
      { qr: image }
    ).exec();
    if (!chazaDB) throw new Error("Error uploading QR");
  },
  addComment: async function (
    owner: String,
    newComment: comment
  ): Promise<void> {
    //Agregar el comentario a la chaza
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: owner },
      { $push: { comments: newComment } }
    ).exec();
    if (!chazaDB) throw new Error("Error adding comment to chaza");

    let score = Number(newComment.calification) ?? 0;

    chazaDB.comments.forEach((comment) => {
      score += comment.calification;
    });
    chazaDB.score = Math.floor(score / chazaDB.comments.length);
    chazaDB.save();
  },
  delete: async function (_id: String): Promise<ChazaI> {
    //Eliminar la chaza de la base de datos
    const chazaDB = await Chaza.findOneAndDelete({ owner: _id }).exec();
    if (!chazaDB) throw new Error("Error deleting chaza");
    //Convertir el resultado a un objeto de tipo ChazaI
    let deleteChaza: ChazaI = {
      _id: chazaDB._id,
      owner: chazaDB.owner,
      name: chazaDB.name,
      description: chazaDB.description,
      type: chazaDB.type,
      address: chazaDB.address,
      phone: chazaDB.phone,
      products: chazaDB.products,
      score: chazaDB.score,
      image: chazaDB.image,
      payment_method: chazaDB.payment_method,
      qr: chazaDB.qr,
    };
    //Retornar el objeto eliminado
    return deleteChaza;
  },
  addProduct: async function (
    chaza_id: String | undefined,
    product_id: String
  ) {
    //Agregar el producto a la chaza
    const chazaDB = await Chaza.findOneAndUpdate(
      { owner: chaza_id },
      { $push: { products: product_id } }
    ).exec();
    if (!chazaDB) throw new Error("Error adding product to chaza");
  },
  deleteProduct: async function (chaza_id: String, product_id: String) {
    //Eliminar el producto de la chaza
    const chazaDB = await Chaza.findOneAndUpdate(
      { _id: chaza_id },
      { $pull: { products: product_id } }
    ).exec();
    if (!chazaDB) throw new Error("Error deleting product from chaza");
  },
  uploadImage: multer({
    storage: multerS3({
      s3: s3Config,
      bucket: "unfood",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, Date.now().toString());
      },
    }),
  }),
  getNumbers: async function (): Promise<chazaNumbers> {
    const chazaNumber = await Chaza.count().exec();
    const productNumber = await productService.getNumbers();
    return { chazas: chazaNumber, products: productNumber };
  },

  getStats : async function (_id :string) : Promise<Stats>{
    const chaza = await this.get(_id);
    if (!chaza) throw new Error("Chaza No  exist");
    const products = chaza?.products ;
    const orders = await orderService.getByChaza(_id);

    return {products : products,orders : orders};
  }
};

export default chazaService;
