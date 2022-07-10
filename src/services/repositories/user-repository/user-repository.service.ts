import { Injectable } from '@nestjs/common';
import { Collection, MongoClient, ServerApiVersion } from "mongodb";
import { CreateUserDto } from 'src/models/message/create-user.interface';

@Injectable()
export class UserRepositoryService {
    private uri: string;
    private client: MongoClient;

    public constructor() {
        this.uri = "mongodb+srv://attila:<passeord>@cluster0.ml4i0.mongodb.net/?retryWrites=true&w=majority";
        this.client = new MongoClient(this.uri, <any>{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    }

    public async insert(user: CreateUserDto) {
        const c = await this.client.connect();
        const collection = c.db("sample_mflix").collection("movies");
        await collection.insertOne(user);
    }
}
