import React, { Component } from "react";
import "./styles.scss";

import { withRouter } from "react-router-dom";

import { auth } from "../../firebase/utils";

import AuthWrapper from "../AuthWrapper";
import FormInput from "../Forms/FormInput";
import Button from "../Forms/Buttons";

const initialState = {
  email: "",
  errors: [],
};

class EmailPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState(() => ({
      [name]: value,
    }));
  };

  handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email } = this.state;

      const config = {
        url: "http://localhost:3000/login",
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          this.props.history.push("/login");
        })
        .catch(() => {
          const err = ["Email not found, Pls try again"];

          this.setState(() => ({
            errors: err,
          }));
        });
    } catch (err) {
      //   console.log("from EmailPassword", err);
    }
  };

  render() {
    const { email, errors } = this.state;

    const configAuthWrapper = {
      headline: "Email Password",
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
              type="email"
              name="email"
              value={email}
              placeholder="Your Email"
              onChange={this.handleChange}
            />
          </form>

          <Button type="submit">Email Password</Button>
        </div>
      </AuthWrapper>
    );
  }
}

// into Recovery
export default withRouter(EmailPassword);
