import { Controller } from "@nestjs/common";
import { GrpcMethod } from "@nestjs/microservices";

interface HeroById {
    id: number;
}

interface Hero {
    id: number;
    name: string;
}

@Controller()
export class HeroController {
    @GrpcMethod("HeroService", "FindOne")
    findOne(data: HeroById): Hero {
        const heroes = [
           { id: 1, name: 'Superman' },
           { id: 2, name: 'Batman' },
        ]

        return heroes.find(h => h.id === data.id) || { id: 0, name: 'Not Found' };
    }
}