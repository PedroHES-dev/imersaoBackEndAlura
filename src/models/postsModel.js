import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados usando a string de conexão do ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getAllPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const collection = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return collection.find().toArray();
}

export async function createPost(newPost) {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Seleciona a coleção "posts"
    const collection = db.collection("posts");
    // Busca todos os documentos da coleção e retorna como um array
    return collection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
    const db = conexao.db("imersao-instabytes");
    const collection = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return collection.updateOne({ _id: new ObjectId(objID) }, { $set: newPost });
}