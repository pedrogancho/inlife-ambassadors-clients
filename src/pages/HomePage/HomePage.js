
import axios from "axios";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import "./HomePage.scss";
import logo from "../../assets/images/logo.svg"

function HomePage() {
  return (
    <div className="d-flex align-items-stretch auth auth-img-bg h-100">
      <div className="row flex-grow">
        <div className="col-lg-6 d-flex align-items-center justify-content-center">
          <div className="auth-form-transparent text-left p-3">
            <div className="brand-logo">
              <img src={logo} alt="logo" />
            <div>
            <h2>Associates</h2>
    <h5>The perfect student job.
    <p> Make a side income and develop new skills while studying.</p> </h5>

    <p></p>
    <p></p>
    <p></p>

    <h5>The perfect student job.</h5>
    <p></p>
    <p></p>
    <p></p>
    
    </div>
              </div>
          </div>
        </div>
        <div className="col-lg-6 login-half-bg d-flex flex-row"></div>
      </div>
    </div>
  );
  }
 

export default HomePage;