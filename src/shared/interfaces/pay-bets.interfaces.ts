export interface ChooseWinnersData {
  round: any; //RoundEntity;
  result: number;
  doubleZero: boolean;
  roulette: any; //RouletteEntity;
}

export interface PayBetData extends ChooseWinnersData {
  bet: any;
}

export interface BetPopulatedEntity {
    _id?: string;
    transactionId?: string;
    currency: string;
    player: any;//PlayerEntity;
    currencies: any[];//CurrencyEntity[];
    operators: any[];//OperatorEntity[];
    client: any[];//ClientEntity[];
    roulette: string;
    round: string;
    type: string;
    endpointError?: boolean;
    geolocation?: string;
    totalAmount: number;
    totalAmountPayoff: number;
    isPaid?: boolean;
    openPay?: boolean;
    bet: any;//BetFieldsAmerican;
    isWinner?: boolean;
    uuid?: string;
}
