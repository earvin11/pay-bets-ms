import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { PayBetsUseCase } from 'src/pay-bets/application/pay-bets.use-case';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Processor(QueueName.PAY_BETS)
export class PayBetsProcessor extends WorkerHost {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly payBetsUseCase: PayBetsUseCase,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    try {
      return await this.payBetsUseCase.run(job.data);
    } catch (error) {
      this.loggerPort.error(`[ERROR] process: ${QueueName.PAY_BETS}`, error);
      throw error;
    }
  }
}
