import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { WalletCredit } from './implementations/wallet-credit.implementation';
import { PayBetUseCase } from '../application/pay-bet.use-case';
import { PayBetProcessor } from './processors/pay-bet.processor';
import { WalletCreditPort } from '../domain/wallet-credit.port';
import { LoggerModule } from 'src/logging/infraestructure/logger.module';
import { RedisModule } from 'src/redis/infraestructure/redis.module';
import { ChooseWinnersUseCase } from '../application/choose-winners.use-case';
import { ChooseWinnerProcesor } from './processors/choose-winners.processor';
import { BetAmountWinnerUseCases } from '../application/bet-amount-winner.use-cases';

@Module({
  imports: [
    BullModule.registerQueue(
      {
        name: QueueName.PAY_BET,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
      {
        name: QueueName.CHOOSE_WINNERS,
        defaultJobOptions: {
          removeOnComplete: true,
          removeOnFail: 5,
        },
      },
    ),
    LoggerModule,
    RedisModule,
  ],
  providers: [
    BetAmountWinnerUseCases,
    ChooseWinnersUseCase,
    ChooseWinnerProcesor,
    PayBetProcessor,
    PayBetUseCase,
    WalletCredit,
    {
      provide: WalletCreditPort,
      useExisting: WalletCredit,
    },
  ],
})
export class PayBetsModule {}
