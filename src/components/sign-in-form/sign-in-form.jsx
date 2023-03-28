import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";

import { FormWrapper, Form, Label, Input, Button } from "./sign-in-form.styles";

const SignUpForm = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const resetFormFields = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      alert("logged in");
      console.log("login complete");
      resetFormFields();
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
      <h2>Sign In</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Email</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">Sign In</Button>
      </Form>
    </FormWrapper>
  );
};

export default SignUpForm;
