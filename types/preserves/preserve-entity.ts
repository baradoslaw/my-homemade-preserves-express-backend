export interface PreserveEntity {
  id: string;
  name: string;
  description: string;
  typeName: string;
  userId: string;
}

export interface NewPreserveEntity extends Omit<PreserveEntity, 'id'> {
  id?: string;
}
