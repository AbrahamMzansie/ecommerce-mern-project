import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Spinner } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetUsersQuery,  
  useDeleteUserMutation,
} from "../../slices/userSlice";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const {
    data: userList,
    isLoading: userListLoading,
    error,
    refetch,
  } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDeleteUser }] =
    useDeleteUserMutation();

  const deleteUserHandler = async (userId) => {
    try {
      await deleteUser(userId).unwrap();
      toast.success("user deleted Successfully");
      refetch();
    } catch (error) {
      toast.error(error?.data.message || error.error);
    }
  };

  if (userListLoading) {
    return <Loader />;
  }
  if (error) {
    return (
      <Message variant="danger">
        {error.message || error.error || error.data.message}
      </Message>
    );
  }

//   if (loadingDeleteUser) {
//     return <Loader />;
//   }

  return (
    <>
      <h1>User List</h1>
      {loadingDeleteUser && <Loader/>}
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Form.Check
                  disabled
                  checked={user.isAdmin}
                  type="checkbox"
                  id="isAdmin"
                />
              </td>
              <td>
                <LinkContainer to={`/admin/user/${user._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteUserHandler(user._id)}
                >
                  <FaTrash style={{ color: "white" }} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListScreen;
