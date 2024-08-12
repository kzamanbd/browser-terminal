import { Test, TestingModule } from '@nestjs/testing';
import { SshGateway } from './ssh.gateway';

describe('SshGateway', () => {
    let gateway: SshGateway;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [SshGateway]
        }).compile();

        gateway = module.get<SshGateway>(SshGateway);
    });

    it('should be defined', () => {
        expect(gateway).toBeDefined();
    });
});
