import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

import { FormWrapper, Form, Label, Input, Button } from "./sign-up-form.styles";

const SignUpForm = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetFormFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setRollNumber("");
    setDepartmentName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { firstname,lastname,email,rollNumber,departmentName,password });
      resetFormFields();
      console.log("user registration complete");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  return (
    <FormWrapper>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label>Roll Number</Label>
        <Input
          type="text"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <Label>Department</Label>
        <select
          id="department"
          name="department"
          onChange={(e) => setDepartmentName(e.target.value)}
        >
          <option value=" "> </option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
        </select>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Label>Confirm Password</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit">Sign Up</Button>
      </Form>
    </FormWrapper>
  );
};

export default SignUpForm;
