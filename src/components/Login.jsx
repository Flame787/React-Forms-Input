import { useState } from "react";

import { useRef } from "react";

export default function Login() {
  const [emailIsInvalid, setEmailIsInvalid] = useState(false);

  const email = useRef();
  const password = useRef();
  // and then connect those ref-values to the input fields (element in DOM), by adding a special ref-prop

  // validation when using refs - cannot be on every keystroke - it would request different event listeners & state

  function handleSubmit(event) {
    // with <form onSubmit={handleSubmit}>, we will get an event-object, and it has a special method:
    event.preventDefault(); // method prevents default browser behaviour
    // (that the page is reloaded after button click, and to send an http request to backend (send form data))
    console.log("Submitted!");

    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;
    // getting current values via current-property of the refs' object
    console.log(enteredEmail, enteredPassword);

    // downside: reseting these values via refs is not the best practise, although it works:
    // but we should not imperatively do changes in DOM via refs:
    // email.current.value = "";
    // password.current.value = "";

    const emailIsValid = enteredEmail.includes("@");

    // checking validation on submition: good addition to the validation on keystroke.
    // after the user clicked on "Submit"-button, then he gets error message if email incorrect
    if (!emailIsValid) {
      setEmailIsInvalid(true); // state changes
      return; // no other code gets executed after that
    }

    console.log("Sending HTTP request...");
  }

  return (
    // <form>
    // adding onSubmit-prop, which will listen and execute a function, whenever the form is submitted by one of it's buttons
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={email} />
          <div className="control-error">
            {emailIsInvalid && <p>Please enter a valid email address.</p>}
          </div>
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={password} />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
