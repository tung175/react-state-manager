import { Button, Form, Modal } from "react-bootstrap";
import { IProps } from "../../types/users";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { createNewUser, resetCreate } from "../../redux/user/user.slide";

const UserCreateModal = (props: IProps) => {
  const { show, handleClose, setShow } = props;

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const isCreateSuccess = useAppSelector((state) => state.user.isCreateSuccess);

  const handleSubmit = () => {
    if (!email) {
      toast.error("Email not empty");
      return;
    }

    if (!name) {
      toast.error("Name not empty");
      return;
    }

    dispatch(createNewUser({ email, name }));
  };

  useEffect(() => {
    if (isCreateSuccess === true) {
      setShow(false);
      setEmail("");
      setName("");
      toast.success("Create complete");

      dispatch(resetCreate());
    }
  }, [isCreateSuccess]);
  
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyen Van A"
                value={name}
                onChange={(event) => setName(event.target.value)}
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

export default UserCreateModal;
