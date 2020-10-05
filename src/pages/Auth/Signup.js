import React, { Component } from "react";

import Input from "../../components/Form/Input/Input";
import Button from "../../components/Button/Button";
import { required, length, email } from "../../util/validators";
import Auth from "./Auth";

class Signup extends Component {
  state = {
    signupForm: {
      email: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, email],
      },
      password: {
        value: "",
        valid: false,
        touched: false,
        validators: [required, length({ min: 5 })],
      },
      name: {
        value: "",
        valid: false,
        touched: false,
        validators: [required],
      },
      formIsValid: false,
    },
  };

  inputChangeHandler = (input, value) => {
    this.setState((prevState) => {
      let isValid = true;
      for (const validator of prevState.signupForm[input].validators) {
        isValid = isValid && validator(value);
      }
      const updatedForm = {
        ...prevState.signupForm,
        [input]: {
          ...prevState.signupForm[input],
          valid: isValid,
          value: value,
        },
      };
      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }
      return {
        signupForm: updatedForm,
        formIsValid: formIsValid,
      };
    });
  };

  inputBlurHandler = (input) => {
    this.setState((prevState) => {
      return {
        signupForm: {
          ...prevState.signupForm,
          [input]: {
            ...prevState.signupForm[input],
            touched: true,
          },
        },
      };
    });
  };

  render() {
    return (
      <Auth>
        <div className="shadow-xl p-8">
        <form
          className="w-full max-w-sm"
          onSubmit={(e) => this.props.onSignup(e, this.state)}
        >
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-2/3">
              <Input
                id="email"
                type="email"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, "email")}
                value={this.state.signupForm["email"].value}
                valid={this.state.signupForm["email"].valid}
                touched={this.state.signupForm["email"].touched}
              />
            </div>
          </div>

          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <Input
                id="name"
                type="text"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, "name")}
                value={this.state.signupForm["name"].value}
                valid={this.state.signupForm["name"].valid}
                touched={this.state.signupForm["name"].touched}
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Password
              </label>
            </div>
            <div className="md:w-2/3">
              <Input
                id="password"
                type="password"
                control="input"
                onChange={this.inputChangeHandler}
                onBlur={this.inputBlurHandler.bind(this, "password")}
                value={this.state.signupForm["password"].value}
                valid={this.state.signupForm["password"].valid}
                touched={this.state.signupForm["password"].touched}
              />
            </div>
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <Button
                design="raised"
                type="submit"
                loading={this.props.loading}
              >
                Signup
              </Button>
            </div>
          </div>
        </form>
        </div>
      </Auth>
    );
  }
}

export default Signup;
