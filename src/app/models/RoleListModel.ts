import { RoleModel } from "./RoleModel";
export class RoleListModel {
  RoleModels: RoleModel[];
  IsRoleDefault: boolean;
  UserRoleId: number;

  constructor(
    RoleModels?: RoleModel[],
    IsRoleDefault?: boolean,
    UserRoleId?: number
  ) {
    this.RoleModels = [];
    this.IsRoleDefault = IsRoleDefault;
    this.UserRoleId = UserRoleId;
  }
}
