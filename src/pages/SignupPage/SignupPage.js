import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignupStyles.scss";
import logo from "../../assets/images/logo.svg";
import authService from "../../services/auth.service";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = async (e) => {
    try {
      e.preventDefault();
      // Create an object representing the request body
      const requestBody = { email, password, name };

      const authToken = localStorage.getItem("authToken");
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        requestBody,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      // or with a service
      // await authService.signup(requestBody);

      // If the request is successful navigate to login page
      navigate("/login");
    } catch (error) {
      // If the request resolves with an error, set the error message in the state
      setErrorMessage("Something went wrong");
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
            <h3>Sign Up now and become an Inlife Associate!</h3>

            <form className="pt-3">
              <div className="form-group">
                <label>Name</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text border-right-0">
                      <i className="mdi mdi-account-outline text-primary" />
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control form-control-lg border-left-0"
                    id="name"
                    placeholder="Your Name"
                    name="name"
                    value={name}
                    onChange={handleName}
                  />
                </div>
              </div>
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
                      type="email"
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
                        <i className="mdi mdi-account-outline text-primary" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control form-control-lg border-left-0"
                      id="password"
                      placeholder="Your Password"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                    />
                  </div>
                </div>

                <button type="submit">Sign Up</button>
              </form>

              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <p>Already have account?</p>
              <Link to={"/login"}> Login</Link>
            </form>
          </div>
        </div>
        <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
      </div>
    </div>
  );
}

export default SignupPage;
