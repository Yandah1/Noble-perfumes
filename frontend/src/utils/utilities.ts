import * as crypto from 'crypto';

/**
 * Generate PayFast signature
 * @param {PaymentData} data
 * @param {string | null} passPhrase
 * @return {string}
 */

interface PaymentData {
    [key: string]: string | number;
}

export function generateSignature(data: PaymentData, passPhrase: string | null = null): string {
    // Create parameter string
    let pfOutput = '';

    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(`${key} ${data[key]}`);
            const value = data[key];

            if (typeof value === 'string' && value !== '') {
                pfOutput += `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, '+')}&`;
            } else if (typeof value === 'number') {
                pfOutput += `${key}=${value}&`;
            }
        }
    }

    // Remove last ampersand
    const getString = pfOutput.slice(0, -1);

    if (passPhrase !== null) {
        pfOutput += `passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, '+')}`;
    }

    console.log(pfOutput);

    return crypto.createHash('md5').update(pfOutput).digest('hex');
};

export function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
      throw new Error(errorMessage)
    }
  
    return v
  }