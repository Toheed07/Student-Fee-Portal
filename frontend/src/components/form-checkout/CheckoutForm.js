import React, { useState } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import {
  updateStudentFeeDue,
  getCurrentUserUid,
} from "../../utils/firebase/firebase";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#4CAF50",
      color: "#212121",
      fontWeight: 500,
      fontFamily: "Montserrat, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": { color: "#BDBDBD" },
    },
    invalid: {
      iconColor: "#F44336",
      color: "#F44336",
    },
  },
};

const CheckoutForm = () => {
  const { currentUser, updateUser } = useAuth() ?? {};
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(
        CardCvcElement,
        CardExpiryElement,
        CardNumberElement
      ),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        console.log("payment:", id);
        console.log("amount:", currentUser.feeDue);
        const fee = currentUser.feeDue;
        const response = await axios.post("http://localhost:5252/payment", {
          amount: fee,
          email: currentUser.email,
          id,
        });

        if (response.data.success) {
          console.log("Successful Payment");
          setSuccess(true);
          const uid = getCurrentUserUid();
          updateStudentFeeDue(uid, fee);
          const updatedUser = {
            ...currentUser,
            feePaid: currentUser.feePaid + fee,
            feeDue: currentUser.feeDue - fee,
            isFeePaid: currentUser.feePaid >= currentUser.departmentFee,
          };
          updateUser(updatedUser);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      {!success ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div
            className="card"
            style={{
              width: "60%",
              maxWidth: "900px",
              margin: "auto",
              height: "40%",
            }}
          >
            <div className="card-body">
              <Form className="mx-auto" onSubmit={handleSubmit}>
                <p className="heading">PAYMENT DETAILS</p>
                <Form.Group
                  as={Row}
                  className="mb-0"
                  style={{ padding: "10px" }}
                >
                  <Form.Label column sm="9" className="text-warning mb-0">
                    Card Number
                  </Form.Label>
                  <Col sm="9">
                    <CardNumberElement options={CARD_OPTIONS} />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="pt-2"
                  style={{ padding: "10px" }}
                >
                  <Col sm={{ span: 4 }}>
                    <Form.Label className="text-warning mb-0">
                      Expiration
                    </Form.Label>
                    <CardExpiryElement options={CARD_OPTIONS} />
                  </Col>
                </Form.Group>
                <Form.Group
                  as={Row}
                  className="pt-2"
                  style={{ padding: "10px" }}
                >
                  <Col sm={{ span: 3 }}>
                    <Form.Label className="text-warning mb-0">Cvv</Form.Label>
                    <CardCvcElement options={CARD_OPTIONS} />
                  </Col>
                </Form.Group>

                <Col sm={{ span: 5 }} className="pt-0">
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ marginTop: "20px" }}
                  >
                    <i className="fas fa-arrow-right px-3 py-2">Pay</i>
                  </Button>
                </Col>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div className="payment-success">
          <h2>Payment successful</h2>
          <h3 className="Thank-you">Thank you for your time</h3>
          <Button onClick={() => navigate("/")}>Home</Button>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
