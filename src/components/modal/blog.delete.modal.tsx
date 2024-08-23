import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IPropsDeleteBlog } from "../../types/props";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteUsersPending } from "../../redux/user/user.slide";
import { Spinner } from "react-bootstrap";
import { deleteBlogsPending } from "../../redux/blog/blog.slide";

const BlogDeleteModal = (props: IPropsDeleteBlog) => {
  const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const { isDeleting, isDeleteSuccess } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsOpenDeleteModal(false);
      toast.success("Delete success");
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    console.log({ id: dataBlog?.id });
    dispatch(deleteBlogsPending({ id: dataBlog?.id }));
  };

  return (
    <Modal
      show={isOpenDeleteModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop={false}
      onHide={() => setIsOpenDeleteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete A Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the blog: {dataBlog?.title ?? ""}</Modal.Body>
      <Modal.Footer>
        {isDeleting === false ? (
          <>
            <Button
              variant="warning"
              onClick={() => setIsOpenDeleteModal(false)}
              className="mr-2"
            >
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()}>Confirm</Button>
          </>
        ) : (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            &nbsp; Loading...
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default BlogDeleteModal;
