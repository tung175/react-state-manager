import { Button, Modal } from "react-bootstrap";
import { IProps } from "../../types/users";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteUser, resetDelete } from "../../redux/user/user.slide";
import { useEffect } from "react";
import { toast } from "react-toastify";

const UserDeleteModal = (props: IProps) => {
  const { show, handleClose, dataUser, setShow } = props;

  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.user.isDeleteSuccess);
  const id = dataUser.id;

  useEffect(() => {
    if (isOpen === true) {
      setShow(false);
      toast.success("Delete success");
      dispatch(resetDelete());
    }
  }, [isOpen]);

  const handleSubmit = () => {
    dispatch(deleteUser({ id }));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want delete email: {dataUser.email}</Modal.Body>
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

export default UserDeleteModal;
