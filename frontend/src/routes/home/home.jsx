import Box from "../../components/fee-box/box";
import React from "react";
import NotificationTableHome from "../../components/notification/notification";
import { useAuth } from "../../context/authContext";
import FeePieChart from "../../components/pie-chart/pie-chart";
import StudentList from "../../components/student-table/student-table";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const Home = () => {
  const { currentUser, userRole } = useAuth() ?? {};
  const navigate = useNavigate();
  console.log(currentUser)

 
  return (
    <>
      {currentUser ? (
        <div>
          {userRole === "admin" ? (
            <>
              <Container fluid>
                <Row>
                  <Col md="8">
                    <NotificationTableHome />
                  </Col>
                  <Col md="4" style={{ paddingTop: "30px" }}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h4">Fee Statistics</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <FeePieChart />
                      </Card.Body>
                    </Card>
                  </Col>
                  <StudentList limitNum={2} isViewAll={false} />
                </Row>
              </Container>
            </>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Box
                  value={currentUser && currentUser.feePaid}
                  title={"Fee paid"}
                />
                <Box
                  value={currentUser && currentUser.feeDue}
                  title={"Fee due"}
                />
                <Box
                  value={currentUser && currentUser.departmentFee}
                  title={"Total fee"}
                />
              </div>

             

              <NotificationTableHome />
            </div>
          )}
          <Button variant="primary"
                style={{ margin: "20px", float: "right", }}
                size="lg"
                onClick={() => navigate("/payments")}

              >
                Pay Fee
              </Button>
        </div>
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Box
              value={currentUser && currentUser.feePaid}
              title={"Fee paid"}
            />
            <Box value={currentUser && currentUser.feeDue} title={"Fee due"} />
            <Box
              value={currentUser && currentUser.departmentFee}
              title={"Total fee"}
            />
          </div>
          <NotificationTableHome />
        </div>
      )}
      {/* <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Box value={currentUser && currentUser.feePaid} title={"Fee paid"} />
        <Box value={currentUser && currentUser.feeLeft} title={"Fee due"} />
        <Box
          value={currentUser && currentUser.departmentFee}
          title={"Total fee"}
        />
      </div>
      <NotificationTableHome />
   
    </div> */}
    </>
  );
};

export default Home;
