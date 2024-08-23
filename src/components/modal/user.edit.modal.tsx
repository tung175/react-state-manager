import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { IPropsUpdateUser } from "../../types/props";
import { Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import { updateUsersPending } from "../../redux/user/user.slide";

const UserEditModal = (props: IPropsUpdateUser) => {
  const { isOpenUpdateModal, setIsOpenUpdateModal, dataUser } = props;
  
  const [id, setId] = useState<number | undefined>();
  const [email, setEmail] = useState<string | undefined>("");
  const [name, setName] = useState<string | undefined>("");

  const dispatch = useAppDispatch();
  const { isUpdating, isUpdateSuccess } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (dataUser?.id) {
      setId(dataUser?.id);
      setEmail(dataUser?.email);
      setName(dataUser?.name);
    }
  }, [dataUser]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsOpenUpdateModal(false);
      setEmail("");
      setName("");
      toast.success("Update success");
    }
  }, [isUpdateSuccess]);

  const handleSubmit = () => {
    if (!email) {
      alert("email empty");
      return;
    }
    if (!name) {
      alert("name empty");
      return;
    }
    console.log({ email, name, id });
    dispatch(updateUsersPending({ email, name, id }))
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
          <Modal.Title>Update A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel label="Email" className="mb-3">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
            />
          </FloatingLabel>
          <FloatingLabel label="Name">
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
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

export default UserEditModal;
