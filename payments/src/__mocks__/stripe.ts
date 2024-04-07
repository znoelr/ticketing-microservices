import { randomBytes } from 'crypto';

const _chargesList: any[] = [];

export const stripe = {
  charges: {
    create: jest.fn().mockImplementation(({ currency, amount, source }) => {
      const id = randomBytes(16).toString('hex');
      const newCharge = { id, currency, amount, source };
      _chargesList.push(newCharge);
      return newCharge;
    }),
    list: jest.fn().mockResolvedValue({ data: _chargesList }),
  },
};
