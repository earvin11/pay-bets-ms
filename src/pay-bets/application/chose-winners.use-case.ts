import { Injectable } from '@nestjs/common';
import { ChooseWinnersData } from 'src/shared/interfaces/pay-bets.interfaces';
import { BetAmountWinnerUseCases } from './bet-amount-winner.use-cases';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import { BetEntity } from 'src/shared/interfaces/utils.interfaces';

@Injectable()
export class ChoseWinnersUseCase {
  constructor(
    private readonly betAmountWinnerUseCases: BetAmountWinnerUseCases,
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

        // await this.betUseCases.update(bet._id!, {
        //             isWinner: true,
        //             totalAmountPayoff: totalEarnings,
        //         });
      }
    }
  }
}
