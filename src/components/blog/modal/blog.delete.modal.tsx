import { Button, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { IPropsBlog } from "../../../types/blogs";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { deleteBlog, resetDelete } from "../../../redux/blogs/blogs.slide";

const BlogDeleteModal = (props: IPropsBlog) => {
  const { show, handleClose, dataBlog, setShow } = props;

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.blog.isDeleteSuccess);
  const id = dataBlog.id;

  useEffect(() => {
    if (isOpen === true) {
      setShow(false);
      toast.success("Delete success");
      dispatch(resetDelete());
    }
  }, [isOpen]);

  const handleSubmit = () => {
    dispatch(deleteBlog({ id }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want delete Blog: {dataBlog.email} with author {dataBlog.author}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogDeleteModal;
