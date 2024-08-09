export interface IBlogs {
  author?: string;
  content?: string;
  id?: number;
  title?: string;
}

export interface IInitStateBlog {
  listBlog: IBlogs[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
}

export interface IPropsBlog {
  show?: boolean;
  handleClose?: () => void;
  dataBlog?: any;
  setShow: (value: boolean) => void;
}

export interface IPlayLoadBlog {
  author?: string;
  content?: string;
  id?: number;
  title?: string;
}
