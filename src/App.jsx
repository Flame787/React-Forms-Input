import Header from "./components/Header.jsx";
import StateLogin from "./components/StateLogin.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
// Signup = more complex form (not just email & password & buttons, but also Confirm password, first/last name inputs,
// dropdown - role, checkbox - how did you find us, checkmark - i agree to terms...)

function App() {
  return (
    <>
      <Header />
      <main>
        <StateLogin />
        {/* <Login /> */}
        {/* <Signup /> */}
        {/* replaced Login with Signup, for testing different approaches */}
      </main>
    </>
  );
}

export default App;


// using 3rd party form libraries:
// f.e. React Hook Form, Formik... (different html layouts - read documentation)