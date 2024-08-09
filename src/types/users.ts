export interface IUsers {
  id: number;
  name: string;
  email: string;
}

export interface IInitStateUser {
  listUser: IUsers[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

export interface IProps {
  show?: boolean;
  handleClose?: () => void;
  dataUser?: any;
  setShow: (value: boolean) => void;
}

export interface IPlayLoad {
  id?: number;
  email?: string;
  name?: string;
}

export interface CounterState {
  value: number
}

export interface IMode {
  mode: string
}