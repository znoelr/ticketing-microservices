export const Subject  = ({
  TicketCreated: 'ticket:created',
  TicketUpdated: 'ticket:updated',
  OrderCreated: 'order:created',
}) as const;

export type SubjectKey = keyof typeof Subject;
export type SubjectValue = typeof Subject[SubjectKey];
