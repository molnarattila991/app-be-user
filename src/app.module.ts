import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ServicesModule,
    MongooseModule.forRoot(process.env["NEST_MONGODB_CONNECTION_STRING"],
      <MongooseModuleOptions>{
        useNewUrlParser: true, useUnifiedTopology: true, serverApi: "1",
        dbName: process.env["NEST_MONGODB_DB_NAME"]
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
