import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { WalletCredit } from './implementations/wallet-credit.implementation';
import { PayBetsUseCase } from '../application/pay-bets.use-case';
import { PayBetsProcessor } from './processors/pay-bets.processor';
import { WalletCreditPort } from '../domain/wallet-credit.port';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QueueName.PAY_BETS,
      defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: 5,
      },
    }),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    PayBetsProcessor,
    PayBetsUseCase,
    WalletCredit,
    {
      provide: WalletCreditPort,
      useExisting: WalletCredit,
    },
  ],
})
export class PayBetsModule {}
