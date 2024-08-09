import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUsers } from "../redux/user/user.slide";
import UserCreateModal from "./modal/user.create.modal";
import UserEditModal from "./modal/user.edit.modal";
import UserDeleteModal from "./modal/user.delete.modal";
import { IUsers } from "../types/users";

const UsersTable = () => {
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({});

  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  const handleCloseEdit = () => setShowEdit(false);

  const handleShowEdit = (user: IUsers) => {
    setShowEdit(true);
    setDataUser(user);
  };

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (user: IUsers) => {
    setShowDelete(true);
    setDataUser(user);
  };

  //   const [users, setUsers] = useState<IUsers[]>([]);
  const users = useAppSelector((state) => state.user.listUser);
  const dispatch = useAppDispatch();
  //   const fetchUsers = async () => {
  //     const res = await fetch("http://localhost:8000/users");
  //     const data = await res.json();
  //     setUsers(data);
  //   };

  //   useEffect(() => {
  //     fetchUsers()
  //   }, [])

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  console.log(users);

  return (
    <>
      <div className="header-table d-flex justify-content-between align-items-center">
        <div className="title h3">Table Users</div>
        <div className="btn-add-new">
          <button
            className="btn btn-success"
            onClick={() => handleShowCreate()}
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
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-warning mx-3"
                    onClick={() => handleShowEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleShowDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <UserCreateModal
        show={showCreate}
        handleClose={handleCloseCreate}
        setShow={setShowCreate}
      />

      <UserEditModal
        show={showEdit}
        handleClose={handleCloseEdit}
        dataUser={dataUser}
        setShow={setShowEdit}
      />
      <UserDeleteModal
        handleClose={handleCloseDelete}
        show={showDelete}
        dataUser={dataUser}
        setShow={setShowDelete}
      />
    </>
  );
};

export default UsersTable;
