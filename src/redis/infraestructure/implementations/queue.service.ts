import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueuesPort } from 'src/redis/domain/queues.port';
import { QueueName } from 'src/shared/enums/queue-names.enum';

export class QueueService implements QueuesPort {
  constructor(
    @InjectQueue(QueueName.CREATE_CREDIT_TRANSACTION)
    private readonly createCreditTransactionQueue: Queue,
  ) {}

  async addJob(queueName: QueueName, jobData: any): Promise<void> {
    switch (queueName) {
      case QueueName.CREATE_CREDIT_TRANSACTION:
        await this.createCreditTransactionQueue.add(
          QueueName.ROUND_SET_JACKPOT,
          jobData,
        );
        break;

      default:
        break;
    }
  }
}
