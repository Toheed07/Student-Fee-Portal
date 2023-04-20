import React, { useState, useEffect } from "react";
import { Card, Table, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, Outlet } from "react-router-dom";
import { fetchStudents } from "../../utils/firebase/firebase";

const StudentList = ({ limitNum, isViewAll }) => {
  const [filterOption, setFilterOption] = useState("all");
  const [studentslist, setStudentsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents(limitNum)
      .then((data) => {
        setStudentsList(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [limitNum]);

  const filteredStudents = studentslist.filter((student) => {
    if (filterOption === "paid") {
      return student.isFeePaid === true;
    } else if (filterOption === "not-paid") {
      return student.isFeePaid === false;
    } else {
      return true;
    }
  });

  const handleFilterClick = (option) => {
    setFilterOption(option);
  };

  const handleViewAllClick = () => {
    navigate("/students-list");
  };

  const handleViewProfile = (email) => {
    navigate(`/student-profile/${email}`);
  };

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  return (
    <>
      <Container fluid style={{ paddingTop: "30px" }}>
        <Row>
          {/* <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4">Striped Table with Hover</Card.Title>
              <p className="card-category">
                Here is a subtitle for this table
              </p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0">ID</th>
                    <th className="border-0">Name</th>
                    <th className="border-0">Salary</th>
                    <th className="border-0">Country</th>
                    <th className="border-0">City</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Dakota Rice</td>
                    <td>$36,738</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>$23,789</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Sage Rodriguez</td>
                    <td>$56,142</td>
                    <td>Netherlands</td>
                    <td>Baileux</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>$38,735</td>
                    <td>Korea, South</td>
                    <td>Overland Park</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Doris Greene</td>
                    <td>$63,542</td>
                    <td>Malawi</td>
                    <td>Feldkirchen in Kärnten</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>$78,615</td>
                    <td>Chile</td>
                    <td>Gloucester</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col> */}
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title as="h4">Students List</Card.Title>
                  <div className="btn-group ml-auto">
                    <button
                      type="button"
                      className={`btn ${
                        filterOption === "all"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleFilterClick("all")}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        filterOption === "paid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleFilterClick("paid")}
                    >
                      Paid
                    </button>
                    <button
                      type="button"
                      className={`btn ${
                        filterOption === "not-paid"
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => handleFilterClick("not-paid")}
                    >
                      Not Paid
                    </button>
                  </div>
                </div>
              </Card.Header>

              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Roll Number</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Department</th>
                      <th className="border-0">Email</th>
                      <th className="border-0">Fee Paid</th>
                      <th className="border-0">Fee Due</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.rollNumber}>
                        <td>{student.rollNumber}</td>
                        <td>
                          {student.firstName} {student.lastName}
                        </td>
                        <td>{student.departmentName}</td>
                        <td>{student.email}</td>
                        <td>{student.feePaid}</td>
                        <td>{student.feeDue}</td>
                        <td>
                          <Button
                            onClick={() => handleViewProfile(student.email)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                {isViewAll === false ? (
                  <Button
                    onClick={handleViewAllClick}
                    style={{ margin: "10px" }}
                  >
                    View All
                  </Button>
                ) : (
                  <>
                    {/* <Button
                      onClick={handleAddStudent}
                      style={{ margin: "10px" }}
                    >
                      Add Student
                    </Button> */}
                  </>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Outlet />
    </>
  );
};

export default StudentList;
