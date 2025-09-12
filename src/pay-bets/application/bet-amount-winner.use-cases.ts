import { Injectable } from '@nestjs/common';
import {
  BLACK_NUMBERS,
  CHANCE_SIMPLE_FIRST_NUMBERS,
  CHANCE_SIMPLE_SECOND_NUMBERS,
  CUBRE_FIRST_NUMBERS,
  CUBRE_SECOND_NUMBERS,
  CUBRE_THIRD_NUMBERS,
  EVEN_NUMBERS,
  FIRST_COLUMN_NUMBERS,
  FIRST_DOZEN_NUMBERS,
  ODD_NUMBERS,
  RED_NUMBERS,
  SECOND_COLUMN_NUMBERS,
  SECOND_DOZEN_NUMBERS,
  SPECIAL_CALLE_NUMBERS,
  THIRD_COLUMN_NUMBERS,
  THIRD_DOZEN_NUMBERS,
} from 'src/shared/constants/constants-utils';
import {
  Bets,
  BetsAmerican,
  Filters,
  FiltersAmerican,
} from 'src/shared/enums/filter-bets.enum';
import {
  BetEntity,
  Earning,
  JackpotType,
  RouletteEntity,
} from 'src/shared/interfaces/utils.interfaces';

@Injectable()
export class BetAmountWinnerUseCases {
  winnersFilter = (result: number): any[] => {
    const winnerFilter: any = [];

    // apuestas a plenos
    winnerFilter.push({
      'bet.plenoNumbers.number': result,
    });
    // apuestas a semiplenos
    winnerFilter.push({
      'bet.semiPlenoNumbers.number': result,
    });
    // apuestas a calle
    winnerFilter.push({
      'bet.calleNumbers.number': result,
    });

    // apuestas a cuadro
    winnerFilter.push({
      'bet.cuadroNumbers.number': result,
    });

    // apuestas a linea
    winnerFilter.push({
      'bet.lineaNumbers.number': result,
    });

    // apuesta a par
    if (EVEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.even_odd.type': 'EVEN',
      });
    }
    // apuesta a impar
    if (ODD_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.even_odd.type': 'ODD',
      });
    }
    // apuesta a columna 1
    if (FIRST_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'FIRST',
      });
    }
    // apuesta a columna 2
    if (SECOND_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'SECOND',
      });
    }
    // apuesta a columna 3
    if (THIRD_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'THIRD',
      });
    }

    // apuesta a docena 1
    if (FIRST_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'FIRST',
      });
    }
    // apuesta a docena 2
    if (SECOND_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'SECOND',
      });
    }
    // apuesta a docena 3
    if (THIRD_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'THIRD',
      });
    }

    // apuesta a chance simple (1-18)
    if (CHANCE_SIMPLE_FIRST_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.chanceSimple.type': '1-18',
      });
    }

    // apuesta a chance simple (19-36)
    if (CHANCE_SIMPLE_SECOND_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.chanceSimple.type': '19-36',
      });
    }
    // apuesta a cubre (0-1-2)
    if (CUBRE_FIRST_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.cubre.type': '0-1-2',
      });
    }
    // apuesta a cubre (0-2-3)
    if (CUBRE_SECOND_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.cubre.type': '0-2-3',
      });
    }

    // apuesta a rojos
    if (RED_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.color.type': 'RED',
      });
    }

    // apuesta a negros
    if (BLACK_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.color.type': 'BLACK',
      });
    }

    return winnerFilter;
  };

  winnersFilterRouletteAmerican = (result: number) => {
    const winnerFilter: any = [];

    // apuestas a plenos
    winnerFilter.push({
      'bet.plenoNumbers.number': result,
    });
    // apuestas a semiplenos
    winnerFilter.push({
      'bet.semiPlenoNumbers.number': result,
    });
    // apuestas a calle
    winnerFilter.push({
      'bet.calleNumbers.number': result,
    });

    // apuestas a cuadro
    winnerFilter.push({
      'bet.cuadroNumbers.number': result,
    });

    // apuestas a linea
    winnerFilter.push({
      'bet.lineaNumbers.number': result,
    });

    // apuesta a par
    if (EVEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.even_odd.type': 'EVEN',
      });
    }
    // apuesta a impar
    if (ODD_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.even_odd.type': 'ODD',
      });
    }
    // apuesta a columna 1
    if (FIRST_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'FIRST',
      });
    }
    // apuesta a columna 2
    if (SECOND_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'SECOND',
      });
    }
    // apuesta a columna 3
    if (THIRD_COLUMN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.columns.type': 'THIRD',
      });
    }

    // apuesta a docena 1
    if (FIRST_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'FIRST',
      });
    }
    // apuesta a docena 2
    if (SECOND_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'SECOND',
      });
    }
    // apuesta a docena 3
    if (THIRD_DOZEN_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.dozens.type': 'THIRD',
      });
    }

    // apuesta a chance simple (1-18)
    if (CHANCE_SIMPLE_FIRST_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.chanceSimple.type': '1-18',
      });
    }

    // apuesta a chance simple (19-36)
    if (CHANCE_SIMPLE_SECOND_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.chanceSimple.type': '19-36',
      });
    }
    // apuesta a cubre (0-1-2)
    if (CUBRE_FIRST_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.cubre.type': '0-1-2',
      });
    }
    // apuesta a cubre (0-00-2)
    if (CUBRE_SECOND_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.cubre.type': '0-37-2',
      });
    }
    // apuesta a cubre (00-2-3)
    if (CUBRE_THIRD_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.cubre.type': '37-2-3',
      });
    }

    // apuesta a calle especial (00-0-1-2-3)
    if (SPECIAL_CALLE_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.specialCalle.type': '37-0-1-2-3',
      });
    }

    // apuesta a rojos
    if (RED_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.color.type': 'RED',
      });
    }

    // apuesta a negros
    if (BLACK_NUMBERS.includes(result)) {
      winnerFilter.push({
        'bet.color.type': 'BLACK',
      });
    }

    return winnerFilter;
  };

  public betAmountWinnerV2 = (
    winnerFilters: Object[],
    result: number,
    bet: BetEntity,
    roulette: RouletteEntity,
    jackpot_values: JackpotType[],
  ): { earnings: Earning[] } => {
    return this.betAmountWinnerBase(
      winnerFilters,
      result,
      bet,
      roulette,
      jackpot_values,
      Filters,
      Bets,
    );
  };

  public betAmountWinnerRouletteAmericanV2 = (
    winnerFilters: Object[],
    result: number,
    bet: BetEntity,
    roulette: RouletteEntity,
    jackpot_values: JackpotType[],
  ): { earnings: Earning[] } => {
    const earnings: Earning[] = [];

    // Reutilizar la lógica base de betAmountWinner
    const baseResult = this.betAmountWinnerBase(
      winnerFilters,
      result,
      bet,
      roulette,
      jackpot_values,
      FiltersAmerican,
      BetsAmerican,
    );

    // Procesar SPECIAL_CALLE (solo para ruleta americana)
    const specialCalleFilter = winnerFilters.find(
      (wf) => Object.keys(wf)[0] === FiltersAmerican.SPECIAL_CALLE,
    );

    if (specialCalleFilter && bet.bet.specialCalle?.length) {
      const betFiltered = bet.bet.specialCalle.find(
        (c) => c.type === '37-0-1-2-3',
      );
      if (betFiltered && roulette.specialCalle) {
        earnings.push({
          amountOriginal: betFiltered.amount,
          bet: `${BetsAmerican.SPECIAL_CALLE}/${betFiltered.type}`,
          earning: betFiltered.amount * roulette.specialCalle,
        });
      }
    }

    return { earnings: [...baseResult.earnings, ...earnings] };
  };

  // Función base genérica (reutilizable)
  private betAmountWinnerBase = (
    winnerFilters: Object[],
    result: number,
    bet: BetEntity,
    roulette: RouletteEntity,
    jackpot_values: JackpotType[],
    filtersSet: typeof Filters | typeof FiltersAmerican,
    betsSet: typeof Bets | typeof BetsAmerican,
  ): { earnings: Earning[] } => {
    const earnings: Earning[] = [];

    // Helper para procesar apuestas numéricas (pleno, semiPleno, calle, etc.)
    const processNumericBet = (
      betArray: any[],
      betType: string,
      multiplier: number,
      earningLabel: string,
    ) => {
      if (!betArray?.length) return;

      const betFiltered = betArray.filter((n: any) => n.number === result);
      for (const item of betFiltered) {
        let earningValue = item.amount * multiplier;

        // Aplicar jackpot solo a pleno
        if (betType === Filters.PLENO_FILTER && jackpot_values?.length) {
          const jackpot = jackpot_values.find((j) => j.number === result);
          if (jackpot) {
            earningValue = item.amount * jackpot.multiplier;
          }
        }

        earnings.push({
          amountOriginal: item.amount,
          bet: `${earningLabel}/${item.number}`,
          earning: earningValue,
        });
      }
    };

    // Helper para procesar apuestas de tipo (even/odd, color, etc.)
    const processTypeBet = (
      betArray: any[],
      types: string[],
      multiplier: number,
      earningLabel: string,
    ) => {
      if (!betArray?.length) return;

      for (const type of types) {
        const betFiltered = betArray.find((n: any) => n.type === type);
        if (betFiltered) {
          earnings.push({
            amountOriginal: betFiltered.amount,
            bet: `${earningLabel}/${betFiltered.type}`,
            earning: betFiltered.amount * multiplier,
          });
        }
      }
    };

    for (const winnerFilter of winnerFilters) {
      const filter = Object.keys(winnerFilter)[0];

      switch (filter) {
        case filtersSet.PLENO_FILTER:
          processNumericBet(
            bet.bet.plenoNumbers,
            filter,
            roulette.pleno,
            betsSet.PLENO,
          );
          break;

        case filtersSet.SEMIPLENO_FILTER:
          processNumericBet(
            bet.bet.semiPlenoNumbers,
            filter,
            roulette.semipleno,
            betsSet.SEMI_PLENO,
          );
          break;

        case filtersSet.CALLE_FILTER:
          processNumericBet(
            bet.bet.calleNumbers,
            filter,
            roulette.calle,
            betsSet.CALLE,
          );
          break;

        case filtersSet.CUADRO_FILTER:
          processNumericBet(
            bet.bet.cuadroNumbers,
            filter,
            roulette.cuadro,
            betsSet.CUADRO,
          );
          break;

        case filtersSet.LINEA_FILTER:
          processNumericBet(
            bet.bet.lineaNumbers,
            filter,
            roulette.linea,
            betsSet.LINEA,
          );
          break;

        case filtersSet.EVEN_ODD:
          if (EVEN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.even_odd,
              ['EVEN'],
              roulette.chanceSimple,
              betsSet.EVEN_ODD,
            );
          }
          if (ODD_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.even_odd,
              ['ODD'],
              roulette.chanceSimple,
              betsSet.EVEN_ODD,
            );
          }
          break;

        case filtersSet.COLOR:
          if (RED_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.color,
              ['RED'],
              roulette.chanceSimple,
              betsSet.COLOR,
            );
          }
          if (BLACK_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.color,
              ['BLACK'],
              roulette.chanceSimple,
              betsSet.COLOR,
            );
          }
          break;

        case filtersSet.COLUMNS:
          if (FIRST_COLUMN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.columns,
              ['FIRST'],
              roulette.columna,
              betsSet.COLUMN,
            );
          }
          if (SECOND_COLUMN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.columns,
              ['SECOND'],
              roulette.columna,
              betsSet.COLUMN,
            );
          }
          if (THIRD_COLUMN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.columns,
              ['THIRD'],
              roulette.columna,
              betsSet.COLUMN,
            );
          }
          break;

        case filtersSet.DOZENS:
          if (FIRST_DOZEN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.dozens,
              ['FIRST'],
              roulette.docena,
              betsSet.DOZEN,
            );
          }
          if (SECOND_DOZEN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.dozens,
              ['SECOND'],
              roulette.docena,
              betsSet.DOZEN,
            );
          }
          if (THIRD_DOZEN_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.dozens,
              ['THIRD'],
              roulette.docena,
              betsSet.DOZEN,
            );
          }
          break;

        case filtersSet.CHANCE_SIMPLE:
          if (CHANCE_SIMPLE_FIRST_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.chanceSimple,
              ['1-18'],
              roulette.chanceSimple,
              betsSet.CHANCE_SIMPLE,
            );
          }
          if (CHANCE_SIMPLE_SECOND_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.chanceSimple,
              ['19-36'],
              roulette.chanceSimple,
              betsSet.CHANCE_SIMPLE,
            );
          }
          break;

        case filtersSet.CUBRE:
          if (CUBRE_FIRST_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.cubre,
              ['0-1-2'],
              roulette.cubre,
              betsSet.CUBRE,
            );
          }
          if (CUBRE_SECOND_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.cubre,
              ['0-37-2'],
              roulette.cubre,
              betsSet.CUBRE,
            );
          }
          if (CUBRE_THIRD_NUMBERS.includes(result)) {
            processTypeBet(
              bet.bet.cubre,
              ['37-2-3'],
              roulette.cubre,
              betsSet.CUBRE,
            );
          }
          break;

        default:
          console.log(`Sorry, we are out of ${filter}.`);
          break;
      }
    }

    return { earnings };
  };
}
