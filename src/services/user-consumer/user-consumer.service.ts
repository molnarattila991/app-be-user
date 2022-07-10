import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SubscribeService } from 'moat-lib-be-pubsub/pub-sub';
import { Model } from 'mongoose';
import { Observable, ReplaySubject } from 'rxjs';
import { CHANNELS } from 'src/constants/message-channels';
import { CreateUserDto } from 'src/models/message/create-user.interface';
import { User, UserDocument } from 'src/models/schemas/user.schema';

@Injectable()
export class UserConsumerService {
    private user: ReplaySubject<CreateUserDto> = new ReplaySubject(1);
    public user$: Observable<CreateUserDto>;

    public constructor(
        private bus: SubscribeService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {
    }

    public async createUser() {
        //TODO unsubscribe
        this.bus.getChannel<CreateUserDto>(CHANNELS.user.event.v1_0_0.create).subscribe(async user => {
            //this.user.next(item);
            const created = new this.userModel(user);
            await created.save();
        });
    }
}
