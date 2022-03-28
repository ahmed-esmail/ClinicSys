import {Role} from "./role";

export class UserAuth {
  id!: number;
  firstName!: string;
  lastName!: string;
  username!: string;
  type!: Role;
  token?: string;
}
