import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserConsumerService } from './services/user-consumer/user-consumer.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly user: UserConsumerService) {
    this.user.createUser();

    this.user.user$.subscribe(v=>{
      console.log("----------------------");
      console.log(v);
      console.log("----------------------");
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
