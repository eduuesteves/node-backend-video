import { fastify } from "fastify";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostgres();


server.get("/", async (request, response) => {
    return "Hello World";
});

server.post("/videos", async (request, response) => {
    const { title, description, duration } = request.body;

    await database.create({
        title,
        description,
        duration
    });

    return response.status(201).send();
});

server.get("/videos", async (request) => {
    const search = request.query.search;

    const videos = await database.list(search);

    return videos;
});

// Route Parameter :id
server.put("/videos/:id", async (request, reply) => {
    const videosId = request.params.id;
    const { title, description, duration } = request.body;

    await database.update(videosId, {
        title,
        description,
        duration
    })

    return reply.status(204).send();
});

server.delete("/videos/:id", async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333
});