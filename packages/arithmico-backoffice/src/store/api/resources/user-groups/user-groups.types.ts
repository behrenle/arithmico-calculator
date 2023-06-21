export interface UserGroupDto {
  id: string;
  name: string;
  createdAt: string;
  readonly: boolean;
}

export interface UserGroupDtoWithDetails extends UserGroupDto {
  members: number;
}

export interface CreateUserGroupArgs {
  name: string;
}

export interface GetUserGroupByIdArgs {
  groupId: string;
}

export interface RenameUserGroupArgs {
  groupId: string;
  name: string;
}

export interface DeleteUserGroupArgs {
  groupId: string;
}