import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserRepositoryService } from './services/repositories/user-repository/user-repository.service';
import { UserConsumerService } from './services/user-consumer/user-consumer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly user: UserConsumerService,
    private readonly userRepository: UserRepositoryService
  ) {
    this.user.createUser();

    this.user.user$.subscribe(v => {
      console.log("----------------------");
      console.log(v);
      this.userRepository.insert(v);
      console.log("----------------------");
    });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
