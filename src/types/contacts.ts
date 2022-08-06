interface IContactName {
  title?: string;
  first: string;
  last: string;
}

interface IContactStreet {
  name: string;
}

interface IContactLocation {
  street: IContactStreet;
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
  location?: IContactLocation;
  registered?: IContactRegistered;
  phone?: string;
  picture?: IContactPicture;
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
