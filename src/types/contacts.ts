interface IContactName {
  title: string
  first: string
  last: string
}

interface IContactStreet {
  name: string;
}

interface IContactLocation {
  location: IContactStreet
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
  name: IContactName;
  location: IContactLocation;
  email: string;
  registered: IContactRegistered;
  phone: string;
  picture: IContactPicture;
}
