import { fastify } from "fastify";
import { DatabaseMemory } from "./database-memory.js";

const server = fastify();

const database = new DatabaseMemory();


server.get("/", async (request, response) => {
    return "Hello World";
});

server.post("/videos", async (request, response) => {
    const { title, description, duration } = request.body;

    database.create({
        title,
        description,
        duration
    });

    return response.status(201).send();
});

server.get("/videos", async (request) => {
    const search = request.query.search;

    const videos = database.list(search);

    return videos;
});

// Route Parameter :id
server.put("/videos/:id", async (request, reply) => {
    const videosId = request.params.id;
    const { title, description, duration } = request.body;

    database.update(videosId, {
        title,
        description,
        duration
    })

    return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;

    database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: 3333
});