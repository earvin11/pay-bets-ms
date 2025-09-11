export interface ChooseWinnersData {
  round: any; //RoundEntity;
  result: number;
  doubleZero: boolean;
  roulette: any; //RouletteEntity;
}

export interface PayBetData extends ChooseWinnersData {
  bet: BetAggregate;
}

export interface BetAggregate {
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
  currency: string;
  bet: Bet;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  currencies: Currency[];
  operator: Operator[];
  client: Client[];
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

export interface Client {
  _id: string;
  status: boolean;
  available: boolean;
  useLogo: boolean;
  urlGames: string;
  name: string;
  endpointAuth: string;
  endpointRollback: string;
  endpointBet: string;
  endpointWin: string;
  logo: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  uuid: string;
}

export interface Currency {
  _id: string;
  short: string;
  symbol: string;
  usdExchange: number;
  exchangeApi: boolean;
  status: boolean;
  __v: number;
  exchangeApiURL: null;
  uuid: string;
}

export interface Operator {
  _id: string;
  status: boolean;
  available: boolean;
  buttonLobby: boolean;
  buttonSupport: boolean;
  background: string;
  logo: string;
  cruppierLogo: string;
  primaryColor: string;
  secondaryColor: string;
  useLogo: boolean;
  loaderLogo: string;
  name: string;
  client: string;
  endpointAuth: string;
  endpointBet: string;
  endpointWin: string;
  endpointRollback: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  urlGames: string;
  uuid: string;
}

export interface Player {
  _id: string;
  isAdmin: boolean;
  isPhysic: boolean;
  board: boolean;
  userId: string;
  username: string;
  lastBalance: number;
  operator: string;
  tokenWallet: string;
  currency: string;
  operatorUuid: string;
  WL: string;
  __v: number;
}

export interface CubreBet {
  _id: string;
  type: string;
  amount: number;
}
