import { Test, TestingModule } from '@nestjs/testing';
import { BusConsumerService } from './bus-consumer.service';

describe('BusConsumerService', () => {
  let service: BusConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusConsumerService],
    }).compile();

    service = module.get<BusConsumerService>(BusConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
