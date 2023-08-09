import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState(
    shippingAddress?.address ? shippingAddress?.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress?.city ? shippingAddress.city : ""
  );
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress?.country ? shippingAddress?.country : ""
  );
  const [paymentMethod, setPaymentMethod] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate("/payment-method");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" className="my-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city" className="my-3">
          <Form.Label>City address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="postalCode" className="my-3">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="country" className="my-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button         
          type="submit"
          variant="primary"
          className="mt-2 px-4"
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};
export default ShippingScreen;
