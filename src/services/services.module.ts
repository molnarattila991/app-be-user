import { Module } from '@nestjs/common';
import { UserConsumerService } from './user-consumer/user-consumer.service';
import { BusModule } from "moat-lib-be-pubsub/pub-sub"
@Module({
    providers: [
        // BusConsumerService,
        BusModule.initConsumer("userGroup", "localhost:50000"),
        UserConsumerService
    ],
    exports: [
        UserConsumerService
    ]
})
export class ServicesModule {
}
