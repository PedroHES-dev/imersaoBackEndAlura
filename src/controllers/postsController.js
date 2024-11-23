import {getAllPosts, createPost, updatePost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listPosts (req, res) {
    // Obtém todos os posts usando a função getAllPosts
    const posts = await getAllPosts();
    // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON
    res.status(200).json(posts);
};

export async function postNewPost (req, res) {
    // Cria um novo post usando a função getAllPosts
    const newPost = req.body;
    try {
        const postCreated = await createPost(newPost);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
};

export async function uploadImage (req, res) {
    const newPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    }; 

    try {
        const postCreated = await createPost(newPost);
        const imageUpdated = `uploads/${postCreated.insertedId}.png`;
        fs.renameSync(req.file.path, imageUpdated);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
};

export async function updateNewPost (req, res) {
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const descritpion = await gerarDescricaoComGemini(imgBuffer);

        const post = {
            imgUrl: urlImage,
            descricao: descritpion,
            alt: req.body.alt
        }

        const postCreated = await updatePost(id, post);
        res.status(200).json(postCreated);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ "Erro": "Falha na requisição" });
    }
};