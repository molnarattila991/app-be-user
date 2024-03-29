import { Module } from '@nestjs/common';
import { UserConsumerService } from './user-consumer/user-consumer.service';
import { BusModule } from "moat-lib-be-pubsub/pub-sub"
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/schemas/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [
        BusModule.initConsumer(process.env["NEST_APP_NAME"], process.env["NEST_MQ_CONNECTION_STRING"]),
        UserConsumerService,
    ],
    exports: [
        UserConsumerService
    ]
})
export class ServicesModule {
    public constructor(private readonly user: UserConsumerService) {
        this.user.createUser();
    }
}
