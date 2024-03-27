export const OrderSubjects = ({
  Created: 'order:created',
  Cancelled: 'order:cancelled',
}) as const;

export type OrderSubjectKey = keyof typeof OrderSubjects;
export type OrderSubjectValue = typeof OrderSubjects[OrderSubjectKey];
