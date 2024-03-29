export const ExpirationSubjects = ({
  Complete: 'expiration:complete',
}) as const;

export type ExpirationSubjectKey = keyof typeof ExpirationSubjects;
export type ExpirationSubjectValue = typeof ExpirationSubjects[ExpirationSubjectKey];
