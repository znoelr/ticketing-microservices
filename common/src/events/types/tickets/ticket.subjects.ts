export const TicketSubjects = ({
  Created: 'ticket:created',
  Updated: 'ticket:updated',
}) as const;

export type TicketSubjectKey = keyof typeof TicketSubjects;
export type TicketSubjectValue = typeof TicketSubjects[TicketSubjectKey];
