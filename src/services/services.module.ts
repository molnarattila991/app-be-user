import { Module } from '@nestjs/common';
import { BusConsumerService } from './bus-consumer/bus-consumer.service';
import { UserConsumerService } from './user-consumer/user-consumer.service';

@Module({
    providers: [
        BusConsumerService,
        UserConsumerService
    ],
    exports: [
        UserConsumerService
    ]
})
export class ServicesModule {
}
