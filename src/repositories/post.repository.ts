import { Post } from "../entities/post.entity";

export class PostRepository {
    
    async save(post: Post): Promise<Post> {
        return post;
    }
    
    async findById(id: number): Promise<Post> {
        return {
            id: 1,
            title: "Desenvolvimento com NodeJS",
            description: "Apis com express e typescript"
        }
    }

    async findAll(): Promise<Post[]> {
        return [
            {
                id: 1,
                title: "Desenvolvimento com NodeJS",
                description: "Apis com express e typescript"
            },
            {
                id: 2,
                title: "Tech Challenge Pós Tech FIAP",
                description: "Entrega 30 de Julho 2024"
            }
        ]
    }

    async delete(id: number) {
        return id;       
    }

    async search(keywordToSearch: string): Promise<Post[]> {
        return [
            {
                id: 1,
                title: `Desenvolvimento com NodeJS `,
                description: `Apis com ${ keywordToSearch } e typescript`
            },
            {
                id: 2,
                title: `Tech Challenge Pós Tech FIAP`,
                description: "Entrega 30 de Julho 2024"
            }
        ] 
    }

    async update(id: number): Promise<Post> {
        return {
            id: 1,
            title: "Desenvolvimento com NodeJS",
            description: "Apis com express e typescript Atualizado"
        }
    }

}