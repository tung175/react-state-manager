export interface IBlogs {
  author?: string;
  content?: string;
  id?: number;
  title?: string;
}

export interface IPropsBlog {
  show?: boolean;
  handleClose?: () => void;
  dataBlog?: IBlogs[];
  setShow: (value: boolean) => void;
}

export interface IPlayLoadBlog {
  author?: string;
  content?: string;
  id?: number;
  title?: string;
}

export interface IInitStateBlog {
  data: IBlogs[];
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
