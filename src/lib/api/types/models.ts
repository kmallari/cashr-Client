export interface IUser {
  id: string;
  timeJoined: number;
  email: string;
  thirdParty: {
    id: string;
    userId: string;
  };
}
