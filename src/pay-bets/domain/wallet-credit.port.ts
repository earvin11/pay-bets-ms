export abstract class WalletCreditPort {
  abstract credit(url: string, data: CreditWalletRequest): Promise<any>;
}

export interface CreditWalletRequest {
  user_id: string;
  amount: number;
  round_id: string;
  bet_id: string;
  game_id: string;
  bet_code: string;
  bet_date: string;
  platform: string;
  currency: string;
  transactionType: 'credit';
}
