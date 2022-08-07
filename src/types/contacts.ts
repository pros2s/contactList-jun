interface IContactName {
  title?: string;
  first: string;
  last: string;
}

interface IContactRegistered {
  age: number;
  date: string;
}

interface IContactPicture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface IContact {
  id: string;
  name: IContactName;
  email: string;
  location?: string;
  registered?: IContactRegistered;
  phone?: string;
  picture?: IContactPicture;
  age?: number;
}

interface NewContactName {
  first: string,
  last: string
}

export interface NewContactValues {
  email: string;
  id: string;
  name: NewContactName
}
