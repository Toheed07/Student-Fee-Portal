import React, { useState, useEffect } from "react";

import { fetchNotifications } from "../../utils/firebase/firebase";

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  ViewAllButton,
} from "./all-notification.styles";

const AllNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications(10)
      .then((data) => {
        setNotifications(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
    </>
  );
};

export default AllNotification;
