import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
const [selectedForm, setSelectedForm] = useState("login")
console.log("SELECTED FROM: ", selectedForm)

const handleSelectForm = (evt) =>{
  evt.preventDefault();
  setSelectedForm(evt.target.value)
}

  const handleSubmit = (evt) => {
    evt.preventDefault();


    const formName = selectedForm;
    console.log("FORM NAME:: ", formName)
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    // dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div style={{  overflow: "visible", height: "100vh"}}>
      <form onSubmit={handleSubmit} name={name}>
      <select value={selectedForm} onChange={handleSelectForm}>
          <option  value={"login"} >Log In</option>
          <option  value={"signup"}>Sign Up</option>
          </select>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        
        <div>
        
          <button type="submit">{selectedForm === "login" ? "Log In" : "Sign Up"}</button>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
