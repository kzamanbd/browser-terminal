import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SshGateway } from './ssh/ssh.gateway';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, SshGateway]
})
export class AppModule {}
