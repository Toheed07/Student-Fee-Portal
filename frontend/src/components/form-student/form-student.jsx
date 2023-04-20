/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {
  addStudent,
  fetchDepartments,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

const defaultFormFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  rollNumber: "",
  departmentName: "",
  feePaid: 0,
};

const StudentForm = () => {
  const [formData, setFormData] = useState(defaultFormFields);
  const [departments, setDepartments] = useState([]);

  const {
    firstName,
    lastName,
    email,
    rollNumber,
    departmentName,
    feePaid,
    password,
    confirmPassword,
  } = formData;

  useEffect(() => {
    fetchDepartments()
      .then((data) => {
        setDepartments(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleInputChange =  (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetFormFields = () => {
    setFormData(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
  
    await addStudent(formData);
    console.log(formData);
    resetFormFields();
    alert("Student Added");
  };
  

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="passowrd"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="passowrd"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="rollNumber">
        <Form.Label>Roll Number</Form.Label>
        <Form.Control
          type="text"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="departmentName">
        <Form.Label>Department</Form.Label>
        <Form.Control
          as="select"
          name="departmentName"
          value={formData.departmentName}
          onChange={handleInputChange}
          required
        >
          <option value="">Select a department...</option>
          {departments &&
            departments.map((department) => (
              <option
                key={department.departmentName}
                value={department.departmentName}
              >
                {department.departmentName}
              </option>
            ))}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="feePaid">
        <Form.Label>Fee Paid</Form.Label>
        <Form.Control
          type="number"
          name="feePaid"
          value={formData.feePaid}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button style={{ marginTop: "10px" }} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default StudentForm;
