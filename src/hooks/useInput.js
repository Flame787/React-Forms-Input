import { useState } from "react";

// moving state from StateLogin.jsx:
export function useInput(defaultValue, validationFn) {
  // const [enteredValues, setEnteredValues] = useState({
  //     email: "",
  //     password: "",
  // });
  // -> making it more reusable:
  const [enteredValue, setEnteredValue] = useState(defaultValue);

  //   const [didEdit, setDidEdit] = useState({
  //     email: false,
  //     password: false,
  //   });
  // -> making it more reusable:
  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn(enteredValue);  
  // passing the state to the validation function, so that validation logic can be executed here

// moving functions from StateLogin.jsx and making them reusable:
  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    // error-message about missing @ dissapears when user adds focus into email-field again and continues typing:
    setDidEdit(false);
  }

  function handleInputBlur() {
    // returning a new object
    setDidEdit(true);
    // changing the state for email or password, depending on identifier
  }

  return {
    // we are returning an object with values and methods:
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
  };
}
