import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spinner } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from "../../slices/userSlice";
import Message from "../../components/Message";
import Loader from "../../components/Loader";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);
  
  const [updateUser, { isLoading: isLoadingUpdateUser }] =
    useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      }).unwrap();
      refetch();
      toast.success("user updated Successfull");
      navigate("/admin/user-list");
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Message variant="danger">{error.data.message || error.error}</Message>;
  }
  return (
    <>
      <Link className="btn btn-light my-3" to="/admin/user-list">
        GO Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="description"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="admin" className="my-3">
            <Form.Label>Admin</Form.Label>
            <Form.Check checked={user.isAdmin} type="checkbox" id="isAdmin" />
          </Form.Group>

          <Button
            disabled={isLoadingUpdateUser}
            type="submit"
            variant="primary"
            className="mt-2 px-4"
          >
            {isLoadingUpdateUser ? (
              <>
                <Spinner animation="border" size="sm" />
                {"processing"}
              </>
            ) : (
              "Edit User"
            )}
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
