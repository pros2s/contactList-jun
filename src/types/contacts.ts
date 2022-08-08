interface IContactName {
  title?: string;
  first: string;
  last: string;
}

export interface IContactPicture {
  large?: string;
  medium?: string;
  thumbnail?: string;
}

export interface IContact {
  id: string;
  name: IContactName;
  email: string;
  location?: string | undefined;
  phone?: string;
  picture?: IContactPicture;
  age?: number;
}

export interface NewData {
  firstName: string;
  lastName: string;
  email: string;
  age: number | undefined;
  phone: string | undefined;
  location: string | undefined;
}
