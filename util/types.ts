export type User = {
  id: number;
  passwordHash: string;
  username: string;
  avatar: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};