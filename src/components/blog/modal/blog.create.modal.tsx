import { Button, Form, Modal } from "react-bootstrap";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { IPropsBlog } from "../../../types/blogs";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { createNewBlog, resetCreate } from "../../../redux/blogs/blogs.slide";

const BlogCreateModal = (props: IPropsBlog) => {
  const { show, handleClose, setShow } = props;

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.blog.isCreateSuccess);

  const handleSubmit = () => {
    if (!title) {
      toast.error("Title not empty");
      return;
    }

    if (!author) {
      toast.error("Author not empty");
      return;
    }

    if (!content) {
      toast.error("Content not empty");
      return;
    }

    dispatch(createNewBlog({ title, author, content }));
  };

  useEffect(() => {
    if (isCreateSuccess === true) {
      setShow(false);
      setTitle("");
      setAuthor("");
      setContent("");
      toast.success("Create complete");

      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal add new blog</Modal.Title>
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
          <Button variant="warning" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BlogCreateModal;
