import { Roles } from '../enums/roles.enum';

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: Roles;
}
