import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import kingsHeartLogo from "../../Lib/assets/king_s_heart_crown.png";
import styles from "./styles/styles.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Feedback from "../../Lib/Feedback/Feedback";
import usePost from "../../Lib/Hooks/Requests/usePost";
import { Authentication } from "../../Lib/Endpoints/Endpoints";


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
      navigate("/employees")
    } else if (message?.message) {
        setOpenSnackBar(true);
        setFeedBackMessage(message?.message)
    }
  // eslint-disable-next-line
  }, [message])

  const [formdata, setFormdata] = useState({})

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={kingsHeartLogo} alt="Jureb" />
          </div>
          <h2>Welcome Back</h2>
          <section className={styles.contentSection}>
            <div className={styles.inputWrapper}>
              <TextField
                size="medium"
                placeholder="Enter email address"
                type="email"
                label="Email Address"
                fullWidth={true}
                name={"email"}
                onChange={(e) => {
                  setFormdata({
                  ...formdata,
                  email: e.target.value
                })}}/>
            </div>
            <div className={styles.inputWrapper}>
              <TextField
                size="medium"
                placeholder="************"
                type="password"
                label="Password"
                fullWidth={true}
                name={"password"}
                onChange={(e) => {
                  setFormdata({
                  ...formdata,
                  password: e.target.value
                })}}/>
            </div>
            <div>
            {/* <Link to="/request-password-reset" style={{display: "block"}}>
              <p style={{color: "blue", textAlign: "right"}}>Forgot Password?</p>
            </Link> */}
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
              onClick={()=> {
                postFunc("POST", "application/json", JSON.stringify(formdata))
              }}>
                Login
              </Button>
            </div>
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
