import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsStartGateway } from './ws.gateway';

@Module({
  controllers: [AppController],
  providers: [AppService, WsStartGateway],
})
export class AppModule {}
