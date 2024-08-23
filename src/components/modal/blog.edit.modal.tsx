import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { IPropsUpdateBlog } from "../../types/props";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { updateBlogsPending } from "../../redux/blog/blog.slide";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

const BlogEditModal = (props: IPropsUpdateBlog) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataBlog } = props;

  const dispatch = useAppDispatch();
  const { isUpdating, isUpdateSuccess } = useAppSelector((state) => state.blog);

  const [id, setId] = useState<number | undefined>();
  const [title, setTitle] = useState<string | undefined>("");
  const [author, setAuthor] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");

  useEffect(() => {
    if (dataBlog?.id) {
      setId(dataBlog?.id);
      setTitle(dataBlog?.title);
      setAuthor(dataBlog?.author);
      setContent(dataBlog?.content);
    }
  }, [dataBlog]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsOpenUpdateModal(false);
      setTitle("");
      setAuthor("");
      setContent("");
      toast.success("Update success");
    }
  }, [isUpdateSuccess]);

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
    console.log({ title, author, content, id });

    dispatch(updateBlogsPending({ title, author, content, id }));
  };

  return (
    <>
      <Modal
        show={isOpenUpdateModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop={false}
        onHide={() => setIsOpenUpdateModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update A Blog</Modal.Title>
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
          {isUpdating === false ? (
            <>
              <Button
                variant="warning"
                onClick={() => setIsOpenUpdateModal(false)}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button onClick={() => handleSubmit()}>Update</Button>
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

export default BlogEditModal;
