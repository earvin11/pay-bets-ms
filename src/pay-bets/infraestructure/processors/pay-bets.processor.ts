import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Processor(QueueName.PAY_BETS)
export class PayBetsProcessor extends WorkerHost {
  constructor(private readonly loggerPort: LoggerPort) {
    super();
  }

  process(job: Job, token?: string): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
