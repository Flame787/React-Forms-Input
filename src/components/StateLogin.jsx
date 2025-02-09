import { useState } from "react";

import Input from "./Input";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  // -> using some combined state instead many different states:

  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  // nested state, a possibility to add the Blur/Focus-status:

  // const [enteredValues, setEnteredValues] = useState({
  //   email: {
  //     value: "",
  //     didEdit: false
  //   },
  //   password: "",
  // });

  // or just add another peace of state: didEdit = lost Focus, after user interacted with them (edited them before)
  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // validation:
  // const emailIsInvalid = enteredValues.email !== "" && !enteredValues.email.includes("@");
  // invalid email, if user started to write something (not empty input), but it doesn't contain @ yet,
  // but error is showing too early (at the first keystroke) and dosn't work retrogradly, if user enters and later deletes @

  // validation - better version: combination of validation on every keystroke + validation on lost focus:
  const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

  const passwordIsInvalid = didEdit.password && !enteredValues.password.trim().length < 6;  
  // password shorter than 6 characters in invalid!

  function handleSubmit(event) {
    // with <form onSubmit={handleSubmit}>, we will get an event-object, and it has a special method:
    event.preventDefault(); // method prevents default browser behaviour
    // (that the page is reloaded after button click, and to send an http request to backend (send form data))

    // ...recommended to also add  validation here... (as addition to validation on keystroke + lost focus)
    
    console.log("Submitted!");
    console.log(enteredValues); // check the current state

    // setEnteredValues({
    //   email: "",
    //   password: "",
    // }); // resetting all input-values via setting the state to initial values
  }

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }
  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  // -> one generic event-handling function instead of many different ones:

  // function handleInputChange(identifier, event) {
  //   setEnteredValues((prevValues) => ({
  //     // create an object-value with: ({ })
  //     ...prevValues,
  //     [identifier]: event.target.value, // dinamically target some property in object, and set the property value
  //   }));
  // }

  // shorter: value instead of event:
  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      // create an object-value with: ({ })
      ...prevValues,
      [identifier]: value, // dinamically target some property in object, and set the property value
    }));
    // error-message about missing @ dissapears when user adds focus into email-field again and continues typing:
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    // returning a new object
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true, // changing the state for email or password, depending on identifier
      // spreading old state, so that we don't loose data on another peace of state (email / password)
    }));
  }

  return (
    // <form>
    // adding onSubmit-prop, which will listen and execute a function, whenever the form is submitted by one of it's buttons
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && "Please enter a valid email."}
        />
        {/* <div className="control no-margin">
          <label htmlFor="email">Email</label>
          {/* htmlFor="" - React eqivalent (originally: for=""), like className instead of class */}
        {/* <input
            id="email"
            type="email"
            name="email" */}
        {/* // new prop: onBlur (when input field looses the focus, and user is writing somewhere else now):
            onBlur={() => handleInputBlur("email")} // passing the identifier (= email) to this function
            // onChange={handleEmailChange}
            // onChange={(event) => handleInputChange("email", event)}  // or extract a value from event:
            onChange={(event) => handleInputChange("email", event.target.value)}
            // getting more control if we wrap it in anonymous function, so that we acctually pass anonymous function
            // as a value to the onChange-prop. And we can pass some value for identifier (property - email or password).
            // as a 2nd argument we pass the (value of the) event (- which triggered the change)
            //
            // value={enteredEmail}
            value={enteredValues.email}
            // initial state value (empty) is transferred into state,
            // but also each change that user makes in this field is reflected in the state
          /> */}
        {/* <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address</p>}
          </div> */}
        {/* </div>  */}

        {/* reusing the custom component also for password-input: */}
        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")}
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          value={enteredValues.password}
          error={passwordIsInvalid && "Please enter a valid password."}
        />

        {/* <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            onChange={(event) =>
              handleInputChange("password", event.target.value)
            }
            value={enteredValues.password}
          />
        </div> */}
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/* <button type="button" className="button" onClick={handleSubmit}>Login</button> */}
        {/* after a button inside a form is pressed, it automatically relaods the page - to prevent that:
        we can set button type to button -> that button will not submit the form (default is: type="submit") */}
        <button className="button">Login</button>
      </p>
    </form>
  );
}
