import { Injectable } from '@nestjs/common';
import { Config, EventsClient, Utils } from 'kubemq-js';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class BusConsumerService {

    private eventsClient: EventsClient;
    private group: string;
    private clientId: string;

    public constructor() {
        const opts: Config = {
            address: 'localhost:50000',
            clientId: Utils.uuid(),
        };
        this.eventsClient = new EventsClient(opts);
        this.clientId = "user-api";
        this.group = "user-api";
    }

    public async subscribe<T>(channel: string, callBack: (msg: any) => void) {
        const config = {
            channel: channel,
            group: this.group,
            clientId: this.clientId,
        };

        await this.eventsClient
            .subscribe(config,
                (err, msg) => {
                    if (err) {
                        console.error(this.clientId, err);
                        return;
                    }
                    if (msg) {
                        callBack(<T>JSON.parse(Utils.bytesToString(msg.body)));
                    }
                },
            )
            .catch((reason) => {
                console.log(reason);
            });
    }
}
