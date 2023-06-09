export interface UserEntity {
  id: string;
  login: string;
  pwd: string;
  email: string;
  name: string;
  surname: string;
}

export interface NewUserEntity extends Omit<UserEntity, 'id'> {
  id?: string;
}
