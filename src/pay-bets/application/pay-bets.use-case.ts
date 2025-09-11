import { Injectable } from '@nestjs/common';
import { LoggerPort } from 'src/logging/domain/logger.port';
import { RedisRpcPort } from 'src/redis/domain/redis-rpc.port';
import { RpcChannels } from 'src/shared/enums/rpc-channels.enum';
import {
  BetAggregate,
  ChooseWinnersData,
  PayBetData,
} from 'src/shared/interfaces/pay-bets.interfaces';
import { WalletCreditPort } from '../domain/wallet-credit.port';

@Injectable()
export class PayBetsUseCase {
  constructor(
    private readonly loggerPort: LoggerPort,
    private readonly redisRpcPort: RedisRpcPort,
    private readonly walletCreditPort: WalletCreditPort,
  ) {}

  async run(data: ChooseWinnersData[]) {
    for (const chooseData of data) {
      const { round, roulette } = chooseData;

      const winnerBets: BetAggregate[] = await this.redisRpcPort.send(
        RpcChannels.GET_WINNER_BETS,
        {
          round: round._id,
          isWinner: true,
        },
      );

      for (const bet of winnerBets) {
        await this.payBet({ ...chooseData, bet });
      }
      // const winnerBets =
      //     await this.betUseCases.findBetsWithPopulatedFields({
      //         round: mongoose.Types.ObjectId(round._id),
      //         isWinner: true,
      //     });
      // for (let bet of winnerBets) {
      //     // await payBetQueue.add(QueueName.PAY_BET, {
      //     //     ...chooseData,
      //     //     bet,
      //     // });
      // }

      // const bankData = {
      //     ...chooseData,
      //     roulette,
      //     round,
      //     winnerBets,
      // };

      // await calculateBankQueue.add(QueueName.CALCULATE_BANK, bankData);
    }
  }

  private async payBet(dataWorker: PayBetData) {
    const { bet, round, roulette } = dataWorker;
    const amount = bet.totalAmountPayoff;

    // const data = await this.walletPlayerUseCases.auth(
    //     bet?.operator[0].endpointAuth,
    //     bet?.player.tokenWallet
    // );

    const objectWalletWin = {
      amount,
      bet_code: bet.transactionId,
      bet_date: String(bet.createdAt),
      bet_id: bet._id,
      currency: bet.player.currency,
      game_id: bet.roulette,
      platform: '',
      round_id: String(round.identifierNumber),
      transactionType: 'credit' as const,
      user_id: bet.player.userId,
    };

    const url = bet?.operator[0].endpointWin;
    const startTime = Date.now();
    try {
      const data = await this.walletCreditPort.credit(
        bet.operator[0].endpointWin,
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
            url,
          },
        };
        this.loggerPort.log('Error send credit wallet', JSON.stringify(log));
        return;
      }
    } catch (err) {
      const endTime = Date.now();
      const duration = endTime - startTime;
      this.loggerPort.log('Wallet credit error', {
        request: {
          ...objectWalletWin,
          url,
        },
        duration,
        err,
      });
      return;
    }

    // const player: any = await this.playerUseCases.findOneBy({
    //   _id: bet.player._id,
    // });
    // const transactionData: TransactionEntity = {
    //   bet,
    //   round,
    //   game: roulette,
    //   player: player?.toJSON(),
    //   playerIp: 'none',
    //   userAgent: 'none',
    //   playerCountry: 'VEN',
    //   platform: 'desktop',
    //   usersOnline: 0,
    //   userBalance: Number(data.lastBalance) + amount,
    //   walletRequest: objectWalletWin,
    //   walletResponse,
    //   type: 'credit',
    //   amount,
    //   currencyExchangeDollar: bet.currencies[0].usdExchange,
    //   amountExchangeDollar: amount * bet.currencies[0].usdExchange,
    // };

    try {
      //   await this.betUseCases.update(bet._id!, {
      //     isPaid: true,
      //   });
      //   const transaction =
      //     await this.transactionUseCases.create(transactionData);
      //   await this.profitUseCases.create(transaction);
    } catch (err) {
      this.loggerPort.error(
        'Error pay bet -> ',
        JSON.stringify({
          type: 'error',
          response: {
            ok: false,
            msg: `${err.message}`,
          },
          request: {
            ...objectWalletWin,
            url,
            // transactionData,
          },
        }),
      );
      throw err;
    }
  }
}
