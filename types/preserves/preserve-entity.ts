import {TypeOfPreserve} from "./type-of-preserve";

export interface PreserveEntity {
  id: string;
  name: string;
  description: string;
  typeName: TypeOfPreserve;
  userId: string;
}

export interface NewPreserveEntity extends Omit<PreserveEntity, 'id'> {
  id?: string;
}
