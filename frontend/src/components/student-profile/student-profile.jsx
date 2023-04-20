import { useParams } from "react-router-dom";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { getStudentByEmail } from "../../utils/firebase/firebase";

const StudentProfile = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    console.log(id);
    getStudentByEmail(id)
      .then((studentData) => {
        if (studentData === null) {
          console.log("No matching documents.");
        } else {
          console.log(studentData);
          setStudentData(studentData);
        }
      })
      .catch((error) => {
        console.error("Error retrieving student data:", error);
      });
  }, []);

  return (
    <section style={{ backgroundColor: "#f9f9f9" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.firstName} {studentData.lastName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Roll Number</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.rollNumber}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Department</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.departmentName}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Fee Paid</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.feePaid}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />{" "}
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Fee Due</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {studentData.feeDue}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};

export default StudentProfile;
