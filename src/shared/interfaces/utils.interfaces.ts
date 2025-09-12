export interface JackpotType {
  number: number;
  multiplier: number;
}

export interface Earning {
  amountOriginal: number;
  bet: string;
  earning: number;
}

export interface RouletteEntity {
  type: string;
  doubleZero: boolean;
  language: string;
  status: boolean;
  lastJackpot: number;
  jackpotRounds: number;
  currenJackpotRound: number;
  jackpotWin?: any[];
  rollback: boolean;
  active: boolean;
  manualDisable: boolean;
  jackpotRandom: boolean;
  jackpotVersion: string;
  alertEmails: string[];
  maxRepeatedResults: number;
  multisAllowed: number[];
  isManualRoulette: boolean;
  numbersDistribution: string;
  bank: number;
  isShow: boolean;
  openingTime: string;
  closingTime: string;
  alwaysOpen: boolean;
  cameraVersion: string;
  initialBank: number;
  maximunBank: number;
  _id?: string;
  name: string;
  code: string;
  logo: string;
  imgBackground: string;
  color: string;
  providerId: string;
  pleno: number;
  semipleno: number;
  cuadro: number;
  calle: number;
  linea: number;
  columna: number;
  docena: number;
  chanceSimple: number;
  cubre: number;
  specialCalle: number;
  minBet: number;
  maxBet: number;
  maxBetPosition: number;
  urlTransmision: string;
  roundDuration: number;
  minutesToDisable: number;
  animals: any[];
  maxPlenosBet: number;
  numbersOfJackpot: number;
  saveRecordings: boolean;
}

export interface RoundEntity {
  _id?: string;
  code: string;
  start_date: Date;
  end_date: Date;
  end_recording_date: Date;
  jackpot_values: any[]; //JackpotValues[];
  result: number;
  providerId: string;
  roulette: string;
  open: boolean;
  number: number;
  identifierNumber: number;
  crupier: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BetEntity {
  _id?: string;
  transactionId?: string;
  player: string;
  roulette: string;
  round: string;
  type: string;
  endpointError?: boolean;
  geolocation?: string;
  totalAmount: number;
  totalAmountPayoff: number;
  currency: string;
  isPaid?: boolean;
  openPay?: boolean;
  bet: BetFieldsAmerican;
  isWinner?: boolean;
  uuid?: string;
}

export interface BetFieldsAmerican {
  plenoNumbers: NumberBet[];
  semiPlenoNumbers: NumberBet[];
  calleNumbers: NumberBet[];
  cuadroNumbers: NumberBet[];
  lineaNumbers: NumberBet[];
  even_odd: EvenOddBet[];
  color: ColorBet[];
  columns: ColumnBet[];
  dozens: DozenBet[];
  chanceSimple: ChanceSimpleBet[];
  cubre: CubreBet[];
  specialCalle: SpecialCalleBet[];
}

export interface NumberBet {
  number: number;
  amount: number;
}
interface EvenOddBet {
  type: 'EVEN' | 'ODD';
  amount: number;
}
interface ColorBet {
  type: 'RED' | 'BLACK';
  amount: number;
}

interface ColumnBet {
  type: 'FIRST' | 'SECOND' | 'THIRD';
  amount: number;
}
interface DozenBet {
  type: 'FIRST' | 'SECOND' | 'THIRD';
  amount: number;
}
interface ChanceSimpleBet {
  type: '1-18' | '19-36';
  amount: number;
}
interface CubreBet {
  type: '0-1-2' | '0-37-2' | '37-2-3';
  amount: number;
}

interface SpecialCalleBet {
  type: '37-0-1-2-3';
  amount: number;
}

export interface NumberBet {
  number: number;
  amount: number;
}

export enum BetsTypesEnum {
  PLENO = 'plenoNumbers',
  SEMI_PLENO = 'semiPlenoNumbers',
  CALLE = 'calleNumbers',
  CUADRO = 'cuadroNumbers',
  LINEA = 'lineaNumbers',
  EVEN_ODD = 'even_odd',
  COLOR = 'color',
  COLUMN = 'columns',
  DOZEN = 'dozens',
  CHANCE_SIMPLE = 'chanceSimple',
  CUBRE = 'cubre',
}
