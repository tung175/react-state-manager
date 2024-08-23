import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IPropsDeleteUser } from "../../types/props";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { deleteUsersPending } from "../../redux/user/user.slide";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";

const UserDeleteModal = (props: IPropsDeleteUser) => {
  const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

  const dispatch = useAppDispatch();
  const { isDeleting, isDeleteSuccess } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isDeleteSuccess) {
      setIsOpenDeleteModal(false);
      toast.success("Delete success");
    }
  }, [isDeleteSuccess]);

  const handleSubmit = () => {
    console.log({ id: dataUser?.id });
    dispatch(deleteUsersPending({ id: dataUser?.id }));
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
        <Modal.Title>Delete A User</Modal.Title>
      </Modal.Header>
      <Modal.Body>Delete the user: {dataUser?.email ?? ""}</Modal.Body>
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

export default UserDeleteModal;
