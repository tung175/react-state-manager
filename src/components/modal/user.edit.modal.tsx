import { Button, Form, Modal } from "react-bootstrap";
import { IProps } from "../../types/users";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resetUpdate, updateNewUser } from "../../redux/user/user.slide";
import { toast } from "react-toastify";

const UserEditModal = (props: IProps) => {
  const { show, handleClose, dataUser, setShow } = props;

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user.isUpdateSuccess);
  const id = dataUser.id;

  useEffect(() => {
    if (show) {
      setName(dataUser.name);
      setEmail(dataUser.email);
    }
  }, [dataUser]);

  useEffect(() => {
    if (isOpen === true) {
      setShow(false);
      setEmail("");
      setName("");
      toast.success("Update email success");
      dispatch(resetUpdate());
    }
  }, [isOpen]);

  const handleSubmit = () => {
    dispatch(updateNewUser({ id, name, email }));
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
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserEditModal;
