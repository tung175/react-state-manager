import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUsersPending } from "../redux/user/user.slide";
import UserCreateModal from "./modal/user.create.modal";
import UserEditModal from "./modal/user.edit.modal";
import UserDeleteModal from "./modal/user.delete.modal";
import { IUsers } from "../types/users";

const UsersTable = () => {
  const { data, isPending, isError } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({});

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchUsersPending());
  }, []);

  const handleEditUser = (user: IUsers) => {
    setDataUser(user);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = (user: IUsers) => {
    setDataUser(user);
    setIsOpenDeleteModal(true);
  };

  return (
    <>
      <div className="header-table d-flex justify-content-between align-items-center">
        <div className="title h3">Table Users</div>
        <div className="btn-add-new">
          <button
            className="btn btn-success"
            onClick={() => setIsOpenCreateModal(true)}
          >
            Add new a user
          </button>
        </div>
      </div>
      <Table striped bordered hover className="my-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isPending === false &&
            data?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}

          {isPending === true && (
            <tr>
              <td colSpan={4}>Loading...</td>
            </tr>
          )}

          {isError === true && (
            <tr>
              <td colSpan={4}>Error try again</td>
            </tr>
          )}
        </tbody>
      </Table>

      <UserCreateModal
        isOpenCreateModal={isOpenCreateModal}
        setIsOpenCreateModal={setIsOpenCreateModal}
      />

      <UserEditModal
        isOpenUpdateModal={isOpenUpdateModal}
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        dataUser={dataUser}
      />

      <UserDeleteModal
        dataUser={dataUser}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
      />
    </>
  );
};

export default UsersTable;
