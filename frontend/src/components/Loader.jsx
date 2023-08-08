import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loader = () => {
  return (
    <Spinner
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "200px",
        height: "200px",
      }}
      animation="grow"
    />
  );
};

export default Loader;
