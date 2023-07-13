export interface UserDetail {
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  addresses: Address[];
}

export interface Address {
  street: string;
  city: string;
  province: string;
  zipCode: string;
  isMain: boolean;
}
