import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col, Button } from "react-bootstrap";
import { fetchDepartments, updateFee } from "../../utils/firebase/firebase";
import DepartmentForm from "../form-department/form-department";

const Departments = () => {
  const [departments, setDepartments] = useState([]);

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

  const handleUpdate = async (name) => {
    const newfee = parseInt(prompt("Enter new fee"));
    try {
      await updateFee(name, newfee);
      const updatedDepartments = await fetchDepartments();
      setDepartments(updatedDepartments);
    } catch (error) {
      console.error(`Error updating fee for department ${name}:`, error);
    }
  };

  return (
    <>
      <Container fluid style={{ paddingTop: "30px" }}>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Departments</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Name</th>
                      <th className="border-0">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {departments &&
                      departments.map((department) => (
                        <tr key={department.departmentName}>
                          <td>{department.departmentName}</td>
                          <td>{department.fee}</td>
                          <td>
                            <Button
                              onClick={() =>
                                handleUpdate(department.departmentName)
                              }
                            >
                              Update
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <DepartmentForm setDepartments={setDepartments} />
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Departments;
