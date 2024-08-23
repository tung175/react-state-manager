import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { IPropsCreateBlog } from "../../types/props";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createBlogsPending } from "../../redux/blog/blog.slide";
import { Spinner } from "react-bootstrap";

const BlogCreateModal = (props: IPropsCreateBlog) => {
  const { isOpenCreateModal, setIsOpenCreateModal } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const { isCreating, isCreateSuccess } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (isCreateSuccess) {
      setIsOpenCreateModal(false);
      setTitle("");
      setAuthor("");
      setContent("");
      toast.success("Create success");
    }
  }, [isCreateSuccess]);

  const handleSubmit = () => {
    if (!title) {
      alert("title empty");
      return;
    }
    if (!author) {
      alert("author empty");
      return;
    }
    if (!content) {
      alert("content empty");
      return;
    }
    //call api => call redux
    console.log({ title, author, content }); //payload
    dispatch(createBlogsPending({ title, author, content }));
  };

  return (
    <>
      <Modal
        show={isOpenCreateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenCreateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add A New Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Title" className="mb-3">
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Author" className="mb-3">
            <Form.Control
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Content">
            <Form.Control
              value={content}
              onChange={(e) => setContent(e.target.value)}
              type="text"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          {isCreating === false ? (
            <>
              <Button
                variant="warning"
                onClick={() => setIsOpenCreateModal(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()}>Save</Button>
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
    </>
  );
};

export default BlogCreateModal;
