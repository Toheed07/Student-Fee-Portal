import React, { useState, useEffect } from "react";

import { fetchNotifications } from "../../utils/firebase/firebase";

import { Card, Table, Container, Row, Col, Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

const NotificationTableHome = () => {
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications(5)
      .then((data) => {
        setNotifications(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleViewAllClick = () => {
    navigate("/notifications");
  };

  return (
    <>
      <Container fluid style={{ paddingTop: "30px" }}>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Notifications</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">Date</th>
                      <th className="border-0">Notification</th>
                      <th className="border-0">Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.map((notification) => (
                      <tr key={notification.notificationNumber}>
                        <td>
                          {" "}
                          {new Date(
                            notification.date.seconds * 1000
                          ).toLocaleDateString()}
                        </td>
                        <td>{notification.notificationNumber}</td>
                        <td>{notification.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleViewAllClick} style={{ margin: "10px" }}>
                  View All
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* <Table>
        <thead>
          <tr>
            <TableHead>Date</TableHead>
            <TableHead>Notification</TableHead>
            <TableHead>Message</TableHead>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notification) => (
            <TableRow key={notification.notificationNumber}>
              <TableCell>
                {new Date(
                  notification.date.seconds * 1000
                ).toLocaleDateString()}
              </TableCell>
              <TableCell>{notification.notificationNumber}</TableCell>
              <TableCell>{notification.message}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table> */}
      {/* <ViewAllButton onClick={handleViewAllClick}>View All</ViewAllButton> */}
    </>
  );
};

export default NotificationTableHome;
