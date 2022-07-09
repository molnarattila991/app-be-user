import { Injectable } from '@nestjs/common';
import { Observable, ReplaySubject } from 'rxjs';
import { CHANNELS } from 'src/constants/message-channels';
import { CreateUserDto } from 'src/models/message/create-user.interface';
import { BusConsumerService } from '../bus-consumer/bus-consumer.service';

@Injectable()
export class UserConsumerService {
    private user: ReplaySubject<CreateUserDto> = new ReplaySubject(1);
    public user$: Observable<CreateUserDto>;

    public constructor(private bus: BusConsumerService) {
        this.user$ = this.user.asObservable();
    }

    public createUser() {
        this.bus.subscribe<CreateUserDto>(CHANNELS.user.event.v1_0_0.create, (item) => {
            this.user.next(item);
        });
    }
}
