import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";

import { FormWrapper, Form, Label, Input, Button } from "./sign-in-form.styles";
import { useNavigate } from "react-router-dom"

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

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
      navigate("/")
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else if (error.code === "auth/user-not-found") {
        alert("Wrong email or password");
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
          required
        />

        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit">Sign In</Button>
      </Form>
    </FormWrapper>
  );
};

export default SignInForm;
