import { Injectable } from '@nestjs/common';
import {
  BetWithPlayerData,
  ChooseWinnersData,
} from 'src/shared/interfaces/pay-bets.interfaces';
import { BetAmountWinnerUseCases } from './bet-amount-winner.use-cases';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { BetEntity } from 'src/shared/interfaces/utils.interfaces';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { QueuesPort } from 'src/redis/domain/queues.port';
import { QueueName } from 'src/shared/enums/queue-names.enum';

@Injectable()
export class ChooseWinnersUseCase {
  constructor(
    private readonly betAmountWinnerUseCases: BetAmountWinnerUseCases,
    private readonly loggerPort: LoggerPort,
    private readonly queuesPort: QueuesPort,
    private readonly redisRpcPort: RedisRpcPort,
  ) {}
  async run(data: ChooseWinnersData[]) {
    for (const choseData of data) {
      const winnerFilters = choseData.roulette.doubleZero
        ? this.betAmountWinnerUseCases.winnersFilterRouletteAmerican(
            choseData.round.result,
          )
        : this.betAmountWinnerUseCases.winnersFilter(choseData.round.result);

      const betsWinner: BetEntity[] = await this.redisRpcPort.send(
        RpcChannels.GET_BETS_BY_AGGREGATE,
        {
          isPaid: false,
          openPay: false,
          round: choseData.round._id,
          $or: winnerFilters,
        },
      );

      for (const bet of betsWinner) {
        const betWithEarnings = choseData.roulette.doubleZero
          ? this.betAmountWinnerUseCases.betAmountWinnerRouletteAmericanV2(
              winnerFilters,
              choseData.round.result,
              bet,
              choseData.roulette,
              choseData.round.jackpot_values
                ? choseData.round.jackpot_values
                : [],
            )
          : this.betAmountWinnerUseCases.betAmountWinnerV2(
              winnerFilters,
              choseData.round.result,
              bet,
              choseData.roulette,
              choseData.round.jackpot_values
                ? choseData.round.jackpot_values
                : [],
            );
        let totalEarnings = 0;
        betWithEarnings.earnings?.forEach((e) => (totalEarnings += e.earning));

        try {
          await this.redisRpcPort.send(RpcChannels.UPDATE_BET_WINNER, {
            isWinner: true,
            totalAmountPayoff: totalEarnings,
          });
        } catch (error) {
          this.loggerPort.error(
            `[ERROR] in: ${RpcChannels.UPDATE_BET_WINNER}`,
            error,
          );
          continue;
        }
      }
    }
  }
  private async sendBetsToQueue(data: ChooseWinnersData[]) {
    for (const chooseData of data) {
      const { round } = chooseData;

      const winnerBets: BetWithPlayerData[] = await this.redisRpcPort.send(
        RpcChannels.GET_WINNER_BETS,
        {
          round: round._id,
          isWinner: true,
          isPaid: false,
        },
      );

      for (const bet of winnerBets) {
        // await this.payBet({ ...chooseData, bet });
        this.queuesPort.addJob(QueueName.PAY_BET, { ...chooseData, bet });
      }

      // const bankData = {
      //   ...chooseData,
      //   winnerBets,
      // };

      // await calculateBankQueue.add(QueueName.CALCULATE_BANK, bankData);
    }
  }
}
