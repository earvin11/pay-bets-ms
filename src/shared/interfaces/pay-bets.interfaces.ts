export interface ChooseWinnersData {
  round: any; //RoundEntity;
  result: number;
  doubleZero: boolean;
  roulette: any; //RouletteEntity;
}

export interface PayBetData extends ChooseWinnersData {
  bet: BetWithPlayerData;
}

export interface BetWithPlayerData {
  _id: string;
  totalAmountPayoff: number;
  isPaid: boolean;
  openPay: boolean;
  isWinner: boolean;
  transactionId: string;
  player: Player;
  roulette: string;
  round: string;
  totalAmount: number;
  currency: Currency;
  bet: Bet;
  createdAt: Date;
  updatedAt: Date;
  operator: Operator;
}

export interface Bet {
  plenoNumbers: Number[];
  semiPlenoNumbers: Number[];
  lineaNumbers: Number[];
  cuadroNumbers: Number[];
  dozens: ChanceSimple[];
  columns: ChanceSimple[];
  color: ChanceSimple[];
  even_odd: ChanceSimple[];
  chanceSimple: ChanceSimple[];
  cubre: any[];
  specialCalle: any[];
  calleNumbers: Number[];
}

export interface Number {
  _id: string;
  number: number;
  amount: number;
}

export interface ChanceSimple {
  _id: string;
  type: string;
  amount: number;
}

export interface Currency {
  _id: string;
  short: string;
  usdExchange: number;
  exchangeApiURL: null;
  uuid: string;
}

export interface Operator {
  _id: string;
  name: string;
  client: string;
  endpointWin: string;
  uuid: string;
}

export interface Player {
  _id: string;
  userId: string;
  username: string;
  lastBalance: number;
  operatorUuid: string;
  WL: string;
}
