import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { IBlogs } from "../../types/blogs";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { fetchBlogs } from "../../redux/blogs/blogs.slide";
import BlogCreateModal from "./modal/blog.create.modal";
import BlogEditModal from "./modal/blog.edit.modal";
import BlogDeleteModal from "./modal/blog.delete.modal";

const BlogsTable = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [dataBlog, setDataBlog] = useState({});

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (blog: IBlogs) => {
    setShowEdit(true);
    setDataBlog(blog);
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (blog: IBlogs) => {
    setShowDelete(true);
    setDataBlog(blog);
  };

  const blogs = useAppSelector((state) => state.blog.listBlog);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  console.log(blogs);

  return (
    <>
      <div className="header-table d-flex justify-content-between align-items-center">
        <div className="title h3">Table Blogs</div>
        <div className="btn-add-new">
          <button
            className="btn btn-success"
            onClick={() => handleShowCreate()}
          >
            Add new a blog
          </button>
        </div>
      </div>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Content</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => {
            return (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.content}</td>
                <td>{blog.author}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleShowEdit(blog)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDelete(blog)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <BlogCreateModal
        show={showCreate}
        handleClose={handleCloseCreate}
        setShow={setShowCreate}
      />

      <BlogEditModal
        show={showEdit}
        handleClose={handleCloseEdit}
        dataBlog={dataBlog}
        setShow={setShowEdit}
      />
      <BlogDeleteModal
        handleClose={handleCloseDelete}
        show={showDelete}
        dataBlog={dataBlog}
        setShow={setShowDelete}
      />
    </>
  );
};

export default BlogsTable;
