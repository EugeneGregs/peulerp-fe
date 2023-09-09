import React, { useState } from "react";
import { LoginImage, Logo, MailIcon } from "../EntryFile/imagePath";
import { Helmet } from "react-helmet";
import usePrivateAxios from "../hooks/usePrivateAxios";
import { notify } from "../common/ToastComponent";
import { ToastContainer, toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ResetPassword = () => {
  const API = usePrivateAxios();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || null;
  const { setAuth } = useAuth();

  const submitPassword = () => {
    if (validatePassword()) {
      API.post("/users/update-password", { email: user.email, password: password })
        .then((res) => {
          console.log(res);
          notify(
            "success",
            "Password changed successfully. Redirecting to sign in page...",
            toast
          );
          setAuth(null);
          setTimeout(() => {
            navigate("/signIn", { replace: true });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          notify("error", err.response.data.message, toast);
        });
    }
  };

  const validatePassword = () => {
    console.log(password, confirmPassword);
    if (password !== confirmPassword) {
      notify("error", "Value in both fields must match", toast);
      return false;
    }

    if (password.length < 6) {
      notify("error", "Password must be at least 6 characters", toast);
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="main-wrapper">
        <Helmet>
          <title>Change Password</title>
          <meta name="description" content="ForgetPassword page" />
        </Helmet>
        <div className="account-content">
          <div className="login-wrapper">
            <div className="login-content">
              <div className="login-userset ">
                <div className="login-logo">
                  <img src={Logo} alt="img" />
                </div>
                <div className="login-userheading">
                  <h3>Forgot password?</h3>
                  <h4>Reset Password</h4>
                </div>
                <div className="form-login">
                  <label>New Password</label>
                  <div className="form-addons">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <label>Confirm Password</label>
                  <div className="form-addons">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-login">
                  <button
                    type="submit"
                    className="btn btn-login"
                    onClick={submitPassword}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="login-img">
              <img src={LoginImage} alt="img" />
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
