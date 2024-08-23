
export interface IUsers {
  id?: number;
  name?: string;
  email?: string;
}

export interface IInitStateUser {
  data: IUsers[];
  errors: [];
  isPending: boolean;
  isError: boolean;
  isCreating: boolean;
  isCreateSuccess: boolean;
  isUpdating: boolean;
  isUpdateSuccess: boolean;
  isDeleting: boolean;
  isDeleteSuccess: boolean;
}


