import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addDepartment, fetchDepartments } from "../../utils/firebase/firebase";

const defaultFormFields = {
  departmentName: "",
  fee: "",
};

const DepartmentForm = ({ setDepartments }) => {
  const [formData, setFormData] = useState(defaultFormFields);
  const { departmentName, fee } = formData;

  const handleInputChange = (event) => {
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
    await addDepartment(formData.departmentName, formData.fee);
    const updatedDepartments = await fetchDepartments();
    setDepartments(updatedDepartments);

    resetFormFields();
  };

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "10px" }}>
      <Form.Group controlId="departmentName">
        <Form.Label>Department Name</Form.Label>
        <Form.Control
          type="text"
          name="departmentName"
          value={formData.departmentName}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="fee">
        <Form.Label>Fee</Form.Label>
        <Form.Control
          type="number"
          name="fee"
          value={formData.fee}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button style={{ marginTop: "10px" }} variant="primary" type="submit">
        Add Department
      </Button>
    </Form>
  );
};

export default DepartmentForm;
