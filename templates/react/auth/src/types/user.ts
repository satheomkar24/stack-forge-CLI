export type IUser = {
  _id: string;
  name: string;
  image?: string;
  password: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IUserPayload = {
  name: string;
  image?: string;
};
