// Importa o framework Express para criar aplicações web
import express from "express";

// Importa o middleware Multer para lidar com uploads de arquivos
import multer from "multer";

import cors from "cors";

// Importa as funções controladoras para gerenciar posts (provavelmente de um arquivo postsController.js)
import { listPosts, postNewPost, uploadImage, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

// Configura o armazenamento em disco para arquivos enviados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define a pasta de destino para os uploads: 'uploads/'
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Mantém o nome original do arquivo enviado
        cb(null, file.originalname);
    }
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
    // Habilita o parseamento de corpos de requisições no formato JSON
    app.use(express.json());

    app.use(cors(corsOptions));

    // Rota GET para listar todos os posts (acessa a função listPosts)
    app.get("/posts", listPosts);

    // Rota POST para criar um novo post (acessa a função postNewPost)
    app.post("/posts", postNewPost);

    // Rota POST para upload de imagem (usa middleware upload.single para um único arquivo 'image' e então chama a função uploadImage)
    app.post("/upload", upload.single("image"), uploadImage);


    app.put("/upload/:id", updateNewPost)
};

// Exporta a função routes para uso em outras partes da aplicação
export default routes;