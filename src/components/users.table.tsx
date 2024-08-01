import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUsers } from "../redux/user/user.slide";

const UsersTable = () => {
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
          <button className="btn btn-success">Add new a user</button>
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
                  <button className="btn btn-warning mx-3">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default UsersTable;
