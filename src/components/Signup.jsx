import { useState } from "react"; // to add some custom validation

export default function Signup() {
  const [passwordsNotEqual, setPasswordsNotEqual] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    // For easier managing of all different data via different inputs and checkmarks:
    // we can create new object FormData, based on a special constructor function, which is built into browser:
    const fd = new FormData(event.target);
    // fd = form data object
    // in order for that to work, all input/select/check fields must have 'name' attribute
    // event.target of the submit-event is the form, so we are passing the form as argument to this object
    // if we have names for each input, then we can call built in methods on fd-object

    // const enteredEmail = fd.get('email');
    // we can get value of the inout field named "email"
    // const enteredPassword = fd.get('password');

    // but to not get too many variables for all input fields, better to group all entered values into an object:

    // we can see all data in console.log - but the field with name 'aquisition' is a multi value field,
    // and we got only the last selected value, but not all (some browsers don't show any value here),
    // so to fix that, we make sure that we get an array of all selected values for the acquisition-checkbox:
    const acquisitionChannel = fd.getAll("acquisition");

    const data = Object.fromEntries(fd.entries());
    // calling the fromEntries- static method, and pass fd-object to it -> result: array of all input names & values

    data.acquisition = acquisitionChannel;

    if (data.password !== data["confirm-password"]) {
      setPasswordsNotEqual(true);
      return;
    }
    // accessing the input by it's property (name='confirm-password')

    console.log(data);

    // event.target.reset();
    // resets the whole form, although it's imperative changing the DOM, but at least quicker
    // to write, than reset each single value like in refs (Login.jsx)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required minLength={6} />
        {/* even easier validation: 'required'-prop -> then the input values are validated by the browser, 
        the field cannot be empty when form is submitted, and if for/htmlFor="email", it will check if it has @ sign */}
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
          <div className="control-error">{passwordsNotEqual && <p>Passwords must match.</p>}</div>
          {/* this conditional error-message shows up when user tries to submit form, if passwords don't match. */}
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" required />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" required />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input
            type="checkbox"
            id="terms-and-conditions"
            name="terms"
            required
          />
          I agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        {/* reset button has type="reset", and therefore really resets all input-values (empties all fields) */}
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
