import { forwardRef, useState } from "react";
import { Button, OverlayTrigger, Popover, Table } from "react-bootstrap";
import UsersPagination from "./pagination/users.pagination";
import UserCreateModal from "./modal/user.create.modal";
import UserEditModal from "./modal/user.edit.modal";
import UserDeleteModal from "./modal/user.delete.modal";
import { IUsers } from "../types/users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const UsersTable = () => {
  const PAGE_SIZE = 2;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);

  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState({});

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const handleEditUser = (user: IUsers) => {
    setDataUser(user);
    setIsOpenUpdateModal(true);
  };

  const handleDelete = (user: IUsers) => {
    setDataUser(user);
    setIsOpenDeleteModal(true);
  };

  const PopoverComponent = forwardRef((props: any, ref: any) => {
    const { id } = props;

    const { isPending, error, data } = useQuery({
      queryKey: ["fetchUser", id],
      queryFn: (): Promise<IUsers[]> =>
        fetch(`http://localhost:8000/users/${id}`).then((res) => res.json()),
    });

    const getBody = () => {
      if (isPending) return "Loading detail...";

      if (error) return "An error has occurred: " + error.message;

      if (data) {
        return (
          <>
            <div>ID = {id}</div>
            <div>Name = {data?.name}</div>
            <div>Email = {data?.email}</div>
          </>
        );
      }
    };

    return (
      <Popover ref={ref} {...props}>
        <Popover.Header as="h3">Detail User</Popover.Header>
        <Popover.Body>{getBody()}</Popover.Body>
      </Popover>
    );
  });

  const {
    isPending,
    error,
    data: users,
  } = useQuery({
    queryKey: ["repoData", currentPage],
    queryFn: (): Promise<IUsers[]> =>
      fetch(`http://localhost:8000/users?_page=${currentPage}&_limit=${PAGE_SIZE}`).then(
        (res) => {
          const totalItems = +(res.headers?.get("X-Total-Count") ?? 0);
          const pageSize = PAGE_SIZE;
          const totalPages =
            totalItems == 0 ? 0 : (totalItems - 1) / pageSize + 1;
          setTotalPage(totalPages);
          return res.json();
        }
      ),
      placeholderData: keepPreviousData,
  });
  
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "15px 0",
        }}
      >
        <h4>Table Users</h4>
        <Button variant="primary" onClick={() => setIsOpenCreateModal(true)}>
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => {
            return (
              <tr key={user.id}>
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  rootClose
                  overlay={<PopoverComponent id={user.id} />}
                >
                  <td>
                    <a href="#">{user.id}</a>
                  </td>
                </OverlayTrigger>

                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditUser(user)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button variant="danger" onClick={() => handleDelete(user)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <UsersPagination
        totalPages={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

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
