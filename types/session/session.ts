export interface SessionEntity {
  sessionId: string;
  userId: string;
  createdAt: Date;
}

export interface NewSessionEntity extends Omit<SessionEntity, 'sessionId' | 'createdAt'> {
  sessionId?: string;
  createdAt?: Date;
}
