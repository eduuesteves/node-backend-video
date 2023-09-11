import { randomUUID } from "node:crypto";

export class DatabaseMemory {
    // # para indicar que é uma chave privada
    #videos = new Map();

    // Estrutura de dados: {}, [], Set (não aceita valores duplicados), Map (como se fosse um objeto, mas tem uma API melhor)

    // Métodos
    list(search) {
        // Values eturna o video sem a chave(id)
        // return Array.from(this.#videos.values());
        // Array.from converte em array algo que não é array

        // Para não retornar um array [[id], [value]], mas sim dentro de um [{id, value}]
        return Array.from(this.#videos.entries())
        .map((videoArray) => {
            const id = videoArray[0];
            const data = videoArray[1];

            return {
                id, ...data
            }
        })
        .filter(video => {
            if(search) {
                return video.title.includes(search)
            }

            return true;
        })
    }

    create(video) {
        const videosId = randomUUID();
        // set adiciona informação no map
        this.#videos.set(videosId, video);
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id);
    }
}