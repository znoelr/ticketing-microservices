export const PaymentSubjects = ({
  Created: 'payment:created',
}) as const;

export type PaymentSubjectKey = keyof typeof PaymentSubjects;
export type PaymentSubjectValue = typeof PaymentSubjects[PaymentSubjectKey];
