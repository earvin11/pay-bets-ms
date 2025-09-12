import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import {
  BetWithPlayerData,
  ChooseWinnersData,
  PayBetData,
} from 'src/shared/interfaces/pay-bets.interfaces';
import { WalletCreditPort } from '../domain/wallet-credit.port';
import { QueueService } from 'src/redis/infraestructure/implementations/queue.service';
import { QueueName } from 'src/shared/enums/queue-names.enum';
import { QueuesPort } from 'src/redis/domain/queues.port';

@Injectable()
export class PayBetsUseCase {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly queuesPort: QueuesPort,
    private readonly redisRpcPort: RedisRpcPort,
    private readonly walletCreditPort: WalletCreditPort,
  ) {}

  async run(data: ChooseWinnersData[]) {
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
        await this.payBet({ ...chooseData, bet });
      }

      // const bankData = {
      //   ...chooseData,
      //   winnerBets,
      // };

      // await calculateBankQueue.add(QueueName.CALCULATE_BANK, bankData);
    }
  }

  private async payBet(dataWorker: PayBetData) {
    const { bet, round, roulette } = dataWorker;
    const amount = bet.totalAmountPayoff;

    const objectWalletWin = {
      amount,
      bet_code: bet.transactionId,
      bet_date: String(bet.createdAt),
      bet_id: bet._id,
      currency: bet.currency.short,
      game_id: bet.roulette,
      platform: '',
      round_id: String(round.identifierNumber),
      transactionType: 'credit' as const,
      user_id: bet.player.userId,
    };

    const startTime = Date.now();
    try {
      const data = await this.walletCreditPort.credit(
        bet.operator.endpointWin,
        objectWalletWin,
      );

      const endTime = Date.now();
      const duration = endTime - startTime;
      this.loggerPort.log('Wallet credit success', {
        ...objectWalletWin,
        walletResponse: data,
        duration,
      });
      if (!data.ok) {
        const log = {
          type: 'error',
          response: {
            ok: false,
            wallet: data.msg ?? data.mensaje ?? 'error in wallet',
            msg: `${data.msg}`,
          },
          request: {
            ...objectWalletWin,
            url: bet.operator.endpointWin,
          },
        };
        this.loggerPort.log('Error send credit wallet', JSON.stringify(log));
        return;
      }

      const transactionData /*TransactionEntity*/ = {
        bet,
        round,
        game: roulette,
        player: {
          _id: bet.player._id,
          userId: bet.player.userId,
          username: bet.player.username,
          WL: bet.player.WL,
          lastBalance: bet.player.lastBalance,
          currency: bet.currency._id,
        },
        playerIp: 'none',
        userAgent: 'none',
        playerCountry: 'VEN',
        platform: 'desktop',
        usersOnline: 0,
        userBalance: Number(bet.player.lastBalance) + amount,
        walletRequest: objectWalletWin,
        walletResponse: data,
        type: 'credit',
        amount,
        currencyExchangeDollar: bet.currency.usdExchange,
        amountExchangeDollar: amount * bet.currency.usdExchange,
      };

      await this.queuesPort.addJob(
        QueueName.CREATE_CREDIT_TRANSACTION,
        transactionData,
      );
    } catch (err) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.loggerPort.log('Wallet credit error', {
        request: {
          ...objectWalletWin,
          url: bet.operator.endpointWin,
        },
        duration,
        err,
      });
      return;
    }

    // try {
    //   //   await this.betUseCases.update(bet._id!, {
    //   //     isPaid: true,
    //   //   });
    //   //   const transaction =
    //   //     await this.transactionUseCases.create(transactionData);
    //   //   await this.profitUseCases.create(transaction);
    // } catch (err) {
    //   this.loggerPort.error(
    //     'Error pay bet -> ',
    //     JSON.stringify({
    //       type: 'error',
    //       response: {
    //         ok: false,
    //         msg: `${err.message}`,
    //       },
    //       request: {
    //         ...objectWalletWin,
    //         url: bet.operator.endpointWin,
    //         // transactionData,
    //       },
    //     }),
    //   );
    //   throw err;
    // }
  }
}
