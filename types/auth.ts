export enum UserType {
    Employee = 0,
    Student = 1,
    Parent = 2,
  }
  
  export enum Role {
    Student = 0,
    Professor = 1,
    Management = 2,
    Admin = 3,
  }
  
  export interface LoginRequestDto {
    username: string;
    password: string;
  }
  
  export interface RegisterRequestDto {
    username: string;
    email: string;
    password: string;
    contactNumber?: string;  
    userType: UserType;
    address?: string;     
  }
  
  export interface RegisterAdminRequestDto {
    username: string;
    email: string;
    password: string;
  }
  