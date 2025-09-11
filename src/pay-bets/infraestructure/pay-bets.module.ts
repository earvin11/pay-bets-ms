import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.PAY_BETS,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 5,
      },
    }),
  ],
})
export class PayBetsModule {}
