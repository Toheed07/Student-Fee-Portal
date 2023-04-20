import React, { useState, useEffect } from "react";

import { fetchNotifications } from "../../utils/firebase/firebase";
import  FormNotification  from "../form-notification/form-notification.jsx"
import { Card, Table, Container, Row, Col } from "react-bootstrap";


import { useAuth } from "../../context/authContext";
import { checkUserRole,getCurrentUserUid } from "../../utils/firebase/firebase";


const AllNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useAuth() ?? {};
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const uid = getCurrentUserUid();
    checkUserRole(uid).then((role) => {
      setUserRole(role);
    });
    // console.log("notification");

    fetchNotifications(10)
      .then((data) => {
        setNotifications(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [currentUser]);

  const updateTable = async () => {
    const notificationsData = await fetchNotifications(10);
    setNotifications(notificationsData);
  };


  return (
    <>
     {currentUser ? (
      <div>
      {userRole === 'admin' ? <>
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
            </Card>
          </Col>
        </Row>
      </Container>
      <FormNotification onUpdateTable={updateTable}  />
    </> : <>
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>}
      </div>
    ) : (
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
            </Card>
          </Col>
        </Row>
      </Container>
    )}
    </>
  );
};

export default AllNotification;
