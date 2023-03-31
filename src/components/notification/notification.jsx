import React, { useState, useEffect } from "react";

import { fetchNotifications } from "../../utils/firebase/firebase";

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  ViewAllButton,
} from "./notification.styles";
import { useNavigate } from "react-router-dom";

const NotificationTableHome = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications(3)
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
      <Table>
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
      </Table>
      <ViewAllButton onClick={handleViewAllClick}>View All</ViewAllButton>
    </>
  );
};

export default NotificationTableHome;
