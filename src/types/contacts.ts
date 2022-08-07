interface IContactName {
  title?: string;
  first: string;
  last: string;
}

interface IContactPicture {
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
