// custom reusable input-component

export default function Input({ label, id, error, ...props }) {
  // accepting and destructuring props: - type, name will be added with the remaining ...props (spread operator)
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{label}</label>
      {/* htmlFor="" - React eqivalent (originally: for=""), like className instead of class */}
      <input
        id={id}
        // type="email"
        // name="email"
        {...props}

        // onBlur={() => handleInputBlur("email")} // passing the identifier (= email) to this function
        // onChange={(event) => handleInputChange("email", event.target.value)}
        // value={enteredValues.email} - values will be fetched via ...props
      />
      <div className="control-error">
        {/* {emailIsInvalid && <p>Please enter a valid email address</p>} */}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}
