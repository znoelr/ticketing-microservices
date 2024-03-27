export const OrderStatus = ({
  Created: 'created',
  Cancelled: 'cancelled',
  AwaitingPayment: 'awaiting:payment',
  Complete: 'complete',
}) as const;

export type OrderStatusKey = keyof typeof OrderStatus;
export type OrderStatusValue = typeof OrderStatus[OrderStatusKey];
