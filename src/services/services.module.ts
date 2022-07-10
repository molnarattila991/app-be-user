import { Module } from '@nestjs/common';
import { UserConsumerService } from './user-consumer/user-consumer.service';
import { BusModule } from "moat-lib-be-pubsub/pub-sub"
import { UserRepositoryService } from './repositories/user-repository/user-repository.service';
@Module({
    providers: [
        // BusConsumerService,
        BusModule.initConsumer("userGroup", "localhost:50000"),
        UserConsumerService,
        UserRepositoryService
    ],
    exports: [
        UserConsumerService, UserRepositoryService
    ]
})
export class ServicesModule {
}
