export interface UserDetail {
  userName: string;
  firstName: string;
  lastName: string;
  addresses: Address[];
}

export interface Address {
  street: string;
  city: string;
  province: string;
  zipCode: string;
}
