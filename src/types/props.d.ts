import { IBlogs } from "./blogs";
import { IUsers } from "./users";

export interface IPropsCreateUser {
  isOpenCreateModal?: boolean;
  setIsOpenCreateModal: (value: boolean) => void ;
}

export interface IPropsUpdateUser {
  isOpenUpdateModal?: boolean;
  setIsOpenUpdateModal: (value: boolean) => void;
  dataUser: IUsers
}

export interface IPropsDeleteUser {
  isOpenDeleteModal?: boolean;
  setIsOpenDeleteModal: (value: boolean) => void;
  dataUser: IUsers
}

export interface IPropsCreateBlog {
  isOpenCreateModal?: boolean;
  setIsOpenCreateModal: (value: boolean) => void ;
}

export interface IPropsUpdateBlog {
  isOpenUpdateModal?: boolean;
  setIsOpenUpdateModal: (value: boolean) => void;
  dataBlog: IBlogs
}

export interface IPropsDeleteBlog {
  isOpenDeleteModal?: boolean;
  setIsOpenDeleteModal: (value: boolean) => void;
  dataBlog: IBlogs
}