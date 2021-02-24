import React, { Component } from "react";
import "./styles.scss";

import Button from "../Forms/Buttons";
import { signInWithGoogle, auth } from "../../firebase/utils";

import FormInput from "../Forms/FormInput";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
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

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);

      this.setState(() => ({
        ...initialState,
      }));
    } catch (error) {
      console.log("from sign in catch", error);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="signin">
        <div className="wrap">
          <h2>Log In</h2>

          <div className="formWrap">
            <form onSubmit={this.handleSubmit}>
              <FormInput
                type="email"
                name="email"
                value={email}
                placeholder="Your Email"
                handleChange={this.handleChange}
              />

              <FormInput
                type="password"
                name="password"
                value={password}
                placeholder="Your Password"
                handleChange={this.handleChange}
              />

              <Button type="submit">Log In</Button>

              <div className="socialSignin">
                <div className="row">
                  <Button onClick={signInWithGoogle}>
                    Sign in with Google
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// into login page
export default SignIn;
