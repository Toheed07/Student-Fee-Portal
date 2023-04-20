import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { addNotification } from "../../utils/firebase/firebase";

const FormNotification = ({ onUpdateTable }) => {
  const [date, setDate] = useState("");
  const [notificationNumber, setNotificationNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    addNotification({
      date,
      notificationNumber,
      message,
    })
      .then(() => {
        console.log("Notification added to Firestore!");
        setDate("");
        setNotificationNumber("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error adding notification to Firestore: ", error);
      });
    onUpdateTable();
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "10px"}}>
      <Form.Group controlId="date">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="date"
          name="date"
          value={date}
          onChange={(event) => setDate(event.target.value.toString())}
          required
        />
      </Form.Group>
      <Form.Group controlId="notifications">
        <Form.Label>Notification</Form.Label>
        <Form.Control
          type="text"
          name="notificationNumber"
          value={notificationNumber}
          onChange={(event) => setNotificationNumber(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          type="textarea"
          name="Message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </Form.Group>

      <Button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
};

export default FormNotification;
