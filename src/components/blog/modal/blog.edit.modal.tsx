import { Button, Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IPropsBlog } from "../../../types/blogs";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { resetUpdate, updateNewBlog } from "../../../redux/blogs/blogs.slide";

const BlogEditModal = (props: IPropsBlog) => {
  const { show, handleClose, dataBlog, setShow } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.blog.isUpdateSuccess);
  const id = dataBlog.id;

  useEffect(() => {
    if (show) {
      setTitle(dataBlog?.title);
      setAuthor(dataBlog?.author);
      setContent(dataBlog?.content);
    }
  }, [dataBlog]);

  useEffect(() => {
    if (isOpen === true) {
      setShow(false);
      setTitle("");
      setAuthor("");
      setContent("");
      toast.success("Update blog success");
      dispatch(resetUpdate());
    }
  }, [isOpen]);

  const handleSubmit = () => {
    dispatch(updateNewBlog({ id, title, author, content }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title blog</Form.Label>
              <Form.Control
                type="ABC"
                placeholder="Title"
                autoFocus
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyen Van A"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Lorem"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
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

export default BlogEditModal;
