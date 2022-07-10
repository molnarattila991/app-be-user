import { Injectable } from '@nestjs/common';
import { SubscribeService } from 'moat-lib-be-pubsub/pub-sub';
import { Observable, ReplaySubject } from 'rxjs';
import { IUserConsumer } from 'src/application/consumers/user-consumer.interface';
import { CHANNELS } from 'src/constants/message-channels';
import { CreateUserDto } from 'src/models/message/create-user.interface';

@Injectable()
export class UserConsumerService implements IUserConsumer {
    private user: ReplaySubject<CreateUserDto> = new ReplaySubject(1);
    public user$: Observable<CreateUserDto>;

    public constructor(private bus: SubscribeService) {
        this.user$ = this.user.asObservable();
    }

    public async createUser() {
        //TODO unsubscribe
        this.bus.getChannel<CreateUserDto>(CHANNELS.user.event.v1_0_0.create).subscribe(item=>{
            this.user.next(item);
        });
    }
}
