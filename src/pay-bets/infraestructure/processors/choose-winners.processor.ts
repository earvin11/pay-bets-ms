import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { ChooseWinnersUseCase } from 'src/pay-bets/application/choose-winners.use-case';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Processor(QueueName.CHOOSE_WINNERS)
export class ChooseWinnerProcesor extends WorkerHost {
  constructor(
    private readonly chooseWinnersUseCase: ChooseWinnersUseCase,
    private readonly loggerPort: LoggerPort,
  ) {
    super();
  }
  async process(job: Job, token?: string): Promise<any> {
    try {
      return await this.chooseWinnersUseCase.run(job.data);
    } catch (error) {
      this.loggerPort.error(
        `[ERROR] process: ${QueueName.CHOOSE_WINNERS}`,
        error,
      );
      throw error;
    }
  }
}
