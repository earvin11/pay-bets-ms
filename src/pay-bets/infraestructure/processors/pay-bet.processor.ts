import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { PayBetUseCase } from 'src/pay-bets/application/pay-bet.use-case';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Processor(QueueName.PAY_BET)
export class PayBetProcessor extends WorkerHost {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly payBetUseCase: PayBetUseCase,
  ) {
    super();
  }

  async process(job: Job, token?: string): Promise<any> {
    try {
      return await this.payBetUseCase.run(job.data);
    } catch (error) {
      this.loggerPort.error(`[ERROR] process: ${QueueName.PAY_BET}`, error);
      throw error;
    }
  }
}
