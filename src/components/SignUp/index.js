import React, { Component } from "react";
import "./styles.scss";

import { auth, handleUserProfile } from "../../firebase/utils";

import FormInput from "../Forms/FormInput";
import Button from "../Forms/Buttons";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: [],
};

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log("coming from signup", e.target.name);

    this.setState(() => ({
      [name]: value,
    }));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    if (password !== confirmPassword) {
      const error = ["Password does not match"];

      this.setState(() => ({
        errors: error,
      }));
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      this.setState(() => ({
        ...initialState,
      }));
    } catch (error) {
      console.log("form registration", error);
    }
  };

  render() {
    const {
      displayName,
      email,
      password,
      confirmPassword,
      errors,
    } = this.state;

    const configAuthWrapper = {
      headline: "Registration",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          )}

          <form onSubmit={this.handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full Name"
              onChange={this.handleChange}
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Your Password"
              onChange={this.handleChange}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password "
              onChange={this.handleChange}
            />

            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    );
  }
}

// into Registation page
export default SignUp;
