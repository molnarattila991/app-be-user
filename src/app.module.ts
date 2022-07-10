import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forRoot('mongodb+srv://attila:Idq2fdKRxWMceDx4@cluster0.ml4i0.mongodb.net/nestjs-practise?retryWrites=true&w=majority',
      <any>{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1" })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
