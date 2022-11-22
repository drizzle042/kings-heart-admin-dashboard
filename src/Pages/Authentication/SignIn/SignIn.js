import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import {Link} from "react-router-dom"
import kingsHeartLogo from "../../../Lib/assets/king_s_heart_crown.png";
import Feedback from "../../../Lib/Feedback/Feedback";
import { InputField } from "../Components/Input";
import styles from "./styles/styles.module.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../../Lib/Validations/authentication";
import usePost from "../../../Lib/Hooks/Requests/usePost";
import { Authentication } from "../../../Lib/Endpoints/Endpoints";


const SignIn = () => {
  
  localStorage.clear();
  
  const { 
    postFunc, 
    message, 
    messageSeverity,
  } = usePost(Authentication.generateAuthTokens);

  // Controls the snack bar for user feedback 
  const [feedBackMessage, setFeedBackMessage] = useState("")
  const [openSnackBar, setOpenSnackBar] = useState(false)
  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (message?.authToken){
      setOpenSnackBar(false);
      localStorage.setItem("user-tokens", String(message?.authToken))
      navigate("/scoresheets")
    } else if (message?.message) {
        setOpenSnackBar(true);
        setFeedBackMessage(message?.message)
    }
  // eslint-disable-next-line
  }, [message])

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(signInSchema),
    mode: "all",
  });

  const submitForm = (formData) => {
    postFunc("POST", "application/json", JSON.stringify(formData))
  };

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={kingsHeartLogo} alt="Jureb" />
          </div>
          <h2>Welcome Back</h2>
          <section className={styles.contentSection}>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="Enter email address"
                  type="email"
                  label="Email Address"
                  fullWidth={true}
                  name={"email"}
                  register={register}
                  error={errors.email ? true : false}
                  helperText={errors?.email?.message}
                />
              </div>
              <div className={styles.inputWrapper}>
                <InputField
                  size="medium"
                  placeholder="************"
                  type="password"
                  label="Password"
                  fullWidth={true}
                  name={"password"}
                  register={register}
                  error={errors.password ? true : false}
                  helperText={errors?.password?.message}
                />
              </div>
              <div>
              <Link to="/request-password-reset">
                <p style={{color:"blue", textAlign: "right"}}>Forgot Password?</p>
              </Link>
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  size="medium"
                  sx={{
                    backgroundColor: "#1F53D7"
                  }}
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </section>
          <Feedback 
            severity={messageSeverity} 
            message={feedBackMessage}
            open={openSnackBar}
            handleClose={closeSnackBar} />
        </div>
      </main>
    </div>
  );
};

export default SignIn;
