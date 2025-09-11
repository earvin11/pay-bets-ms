import { LoggerPort } from 'src/logging/domain/logger.port';
import {
  CreditWalletRequest,
  WalletCreditPort,
} from 'src/pay-bets/domain/wallet-credit.port';

export class WalletCredit implements WalletCreditPort {
  constructor(private readonly loggerPort: LoggerPort) {}
  async credit(url: string, data: CreditWalletRequest): Promise<any> {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Agrega otros headers si son necesarios
          // "Authorization": "Bearer token",
        },
        body: JSON.stringify(data),
      });

      // fetch no lanza error por códigos de estado HTTP, solo por problemas de red
      if (!response.ok && response.status >= 500) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Si esperas una respuesta JSON
      const responseData = await response.json();
      return {
        status: response.status,
        data: responseData,
        headers: response.headers,
        // Puedes agregar más propiedades para mantener compatibilidad
      };
    } catch (error) {
      this.loggerPort.error('ERROR IN CREDIT WALLET -> ', error.message);
      throw error;
    }
  }
}
