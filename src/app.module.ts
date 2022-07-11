import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forRoot(process.env["NEST_MONGODB_CONNECTION_STRING"], <any>{ useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1" })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
