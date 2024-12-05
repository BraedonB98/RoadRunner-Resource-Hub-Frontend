import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import TermsOfServiceModal from "../components/TermsOfServiceModal";

import "./styling/AuthPage.css";

import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

const AuthPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [termsOfService, setTermsOfService] = useState(false);
  const [displayTermsOfService, setDisplayTermsOfService] = useState(false);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = (event) => {
    if (!isLogin) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData({
        ...formState.inputs,
        firstName: {
          value: "",
          isValid: false,
        },
        middleName: {
          value: "",
          isValid: false,
        },
        lastName: {
          value: "",
          isValid: false,
        },
        phoneNumber: {
          value: "",
          isValid: false,
        },
        schoolStudentID: {
          value: "",
          isValid: false,
        },
        birthday: {
          value: "",
          isValid: true,
        },
        gender: {
          value: "Prefer Not To Say",
          isValid: true,
        },
        pronouns: {
          value: "Prefer Not To Say",
          isValid: true,
        },
      });
    }
    setIsLogin((prevMode) => !prevMode);
  };
  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLogin) {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/user/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData._id, responseData.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const email = formState.inputs.email.value;
        console.log(email);
        const userName = email.split("@")[0];
        const birthday = new Date(formState.inputs.birthday.value);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_API_URL}/user/student/createstudent`,
          "POST",
          JSON.stringify({
            firstName: formState.inputs.firstName.value,
            middleName: formState.inputs.middleName.value,
            lastName: formState.inputs.lastName.value,
            phoneNumber: formState.inputs.phoneNumber.value,
            userName: userName,
            schoolStudentID: formState.inputs.schoolStudentID.value,
            birthdate: birthday,
            preferredName: formState.inputs.firstName.value,
            gender: formState.inputs.gender.value || "Male",
            pronouns: formState.inputs.pronouns.value || "He/Him/His",
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData._id, responseData.token);
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {displayTermsOfService && (
        <TermsOfServiceModal
          onClear={() => {
            setDisplayTermsOfService(false);
          }}
        />
      )}
      <br />
      <Card className="auth-page-card">
        {isLoading && <LoadingSpinner asOverlay />}
        {isLogin && <h2>Login Required</h2>}
        {!isLogin && <h2>Create Student Account</h2>}
        <hr />
        <form onSubmit={authSubmitHandler} className="auth-page-form">
          {!isLogin && (
            <div className="auth-page-multiquestion-line">
              <Input
                className="auth-page-short-input"
                element="input"
                id="firstName"
                type="text"
                label="First Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                className="auth-page-short-input"
                element="input"
                id="middleName"
                type="text"
                label="Middle Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />
              <Input
                className="auth-page-short-input"
                element="input"
                id="lastName"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />

              <Input
                className="auth-page-short-input"
                element="input"
                id="phoneNumber"
                type="text"
                label="Phone Number"
                validators={[VALIDATOR_MINLENGTH(10), VALIDATOR_MAXLENGTH(10)]} // Corrected this line
                errorText="Please enter a phone number."
                onInput={inputHandler}
              />
              <Input
                className="auth-page-short-input"
                element="input"
                id="schoolStudentID"
                type="text"
                label="Student ID"
                validators={[VALIDATOR_MINLENGTH(9), VALIDATOR_MAXLENGTH(9)]} // Corrected this line
                errorText="Please enter your S900 Number."
                onInput={inputHandler}
              />
              <Input
                className="auth-page-input"
                element="date"
                id="birthday"
                type="date"
                label="Birthday"
                validators={[]}
                initialValid={true}
                initialValue="2000-01-01"
                placeholder="MM/DD/YYYY"
                errorText="Please enter your birthday."
                onInput={inputHandler}
              />
              <Input
                classname="auth-page-input"
                element="select"
                id="gender"
                initialState="male"
                label="Gender"
                validators={[]}
                initialValid={true}
                errorText="Please select a gender."
                onInput={inputHandler}
                options={[
                  { value: "Male", displayValue: "Male" },

                  { value: "Female", displayValue: "Female" },
                  { value: "Other", displayValue: "Other" },
                  {
                    value: "Prefer Not To Say",
                    displayValue: "Prefer Not To Say",
                  },
                ]}
              />
              <Input
                classname="auth-page-input"
                element="select"
                id="pronouns"
                label="Pronouns"
                validators={[]}
                initialValid={true}
                errorText="Please select pronouns."
                onInput={inputHandler}
                options={[
                  { value: "He/Him/His", displayValue: "He/Him/His" },
                  { value: "She/Her/Hers", displayValue: "She/Her/Hers" },
                  {
                    value: "They/Them/Theirs",
                    displayValue: "They/Them/Theirs",
                  },
                  { value: "Other", displayValue: "Other" },
                  {
                    value: "Prefer Not To Say",
                    displayValue: "Prefer Not To Say",
                  },
                ]}
              />
            </div>
          )}

          <Input
            className="auth-page-input"
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            className="auth-page-input"
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid password."
            onInput={inputHandler}
          />
          {!isLogin && (
            <div>
              <div
                onClick={() => {
                  setDisplayTermsOfService(true);
                }}
              >
                <p>View Terms Of Service</p>
              </div>
              <input
                type="checkbox"
                id="termsOfService"
                name="termsOfService"
                value="Agree"
                onClick={(event) => {
                  termsOfService
                    ? setTermsOfService(false)
                    : setTermsOfService(true);
                }}
              />
              <label for="termsOfService">
                {" "}
                I Agree &nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <br />
              <br />
            </div>
          )}
          <Button
            type="submit"
            disabled={
              !formState.isValid || (!isLogin ? !termsOfService : false)
            }
          >
            {" "}
            {isLogin ? "LOGIN" : "SIGNUP"}{" "}
          </Button>
        </form>
        <br />
        <Button size="small" onClick={switchModeHandler}>
          {isLogin
            ? "New To Road Runner Resource Hub? Create an Account"
            : "Already Have an Account? Log in"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default AuthPage;
