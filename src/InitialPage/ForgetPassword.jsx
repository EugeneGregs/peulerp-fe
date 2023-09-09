import React, { useState } from 'react'
import { LoginImage, Logo, MailIcon, } from '../EntryFile/imagePath'
import { Helmet } from 'react-helmet'
import usePrivateAxios from '../hooks/usePrivateAxios';
import { notify} from '../common/ToastComponent';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../service/api";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const submitEmail = () => {
        API.post("/users/forgot-password", { email: email })
            .then((res) => {
                console.log(res);
                notify("success", "Success! Check new password sent to your email", toast);
                navigate("/signIn");  
            })
            .catch((err) => {
                console.log(err);
                notify("error", err.response.data.message, toast);
        })
    }

    return (
        <>
            <div className="main-wrapper">
                <Helmet>
                    <title>Forgot Password - Dream POS</title>
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
                                    <h4>
                                        Don’t warry! it happens. Please enter the address <br />
                                        associated with your account.
                                    </h4>
                                </div>
                                <div className="form-login">
                                    <label>Email</label>
                                    <div className="form-addons">
                                        <input
                                            type="text"
                                            placeholder="Enter your email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <img src={MailIcon} alt="img" />
                                    </div>
                                </div>
                                <div className="form-login">
                                    <button type='submit' className="btn btn-login" onClick={submitEmail}>
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
    )
}

export default ForgotPassword;