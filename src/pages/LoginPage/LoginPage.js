// src/pages/LoginPage.js

import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./Styles.scss";
import logo from "../../assets/images/logo.svg"
import authService from "../../services/auth.service";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  // Get the function for saving and verifying the token
  const { logInUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = async (e) => {
    setLoggingIn(true);
    try {
      e.preventDefault();
      const requestBody = { email, password };

      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:5005/auth/login",
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // or with a service
      // const response = await authService.login(requestBody);

      // Save the token and set the user as logged in ...
      const token = response.data.authToken;
      logInUser(token);

      navigate("/");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="d-flex align-items-stretch auth auth-img-bg h-100">
      <div className="row flex-grow">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="auth-form-transparent text-left p-3">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            </div>
            <h4>Ambassadors Inlife</h4>
            <form className="pt-3">
              <div className="form-group">
                <label>Email</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text border-right-0">
                      <i className="mdi mdi-account-outline text-primary" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-left-0"
                    id="email"
                    placeholder="Your Email"
                    name="email"
                    value={email}
                    onChange={handleEmail}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Password</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text border-right-0">
                      <i className="mdi mdi-lock-outline text-primary" />
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control form-control-lg border-left-0"
                    id="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handlePassword}
                  />
                </div>
              </div>
              <div className="my-3">
                <div
                  className={
                    "btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" +
                    (loggingIn ? " disabled" : "")
                  }
                  onClick={handleLoginSubmit}
                >
                  LOGIN
                  {loggingIn && <i className="mdi mdi-loading mdi-spin" />}
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
      </div>
    </div>
  );
  // return (
  //   <div className="LoginPage">
  //     <h1>Login</h1>

  //     <form onSubmit={handleLoginSubmit}>
  //       <label>Email:</label>
  //       <input type="text" name="email" value={email} onChange={handleEmail} />

  //       <label>Password:</label>
  //       <input type="password" name="password" value={password} onChange={handlePassword} />

  //       <button type="submit">Login</button>
  //     </form>
  //     {errorMessage && <p className="error-message">{errorMessage}</p>}

  //     <p>Don't have an account yet?</p>
  //     <Link to={"/signup"}> Sign Up</Link>
  //   </div>
  // );
}

export default LoginPage;
