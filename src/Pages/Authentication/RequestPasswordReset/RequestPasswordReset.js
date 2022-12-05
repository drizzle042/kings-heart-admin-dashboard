import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/styles.module.css";
import KingsHeartLogo from "../../../Lib/assets/king_s_heart_crown.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import usePost from "../../../Lib/Hooks/Requests/usePost";
import { Authentication } from "../../../Lib/Endpoints/Endpoints";
import Feedback from "../../../Lib/Feedback/Feedback";


function RequestPasswordReset() {

  const [email, setEmail] = useState({});

  const {postFunc, message, messageSeverity} = usePost(Authentication.requestPasswordReset);

  // Controls the snack bar for user feedback 
  const [feedBackMessage, setFeedBackMessage] = useState("")
  const [openSnackBar, setOpenSnackBar] = useState(false)
  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (message?.status === "Success"){
      setOpenSnackBar(true);
      setFeedBackMessage(message?.message)
      window.setTimeout(() => {
        navigate("/reset-password-success")
      }, 3000)
    }
  // eslint-disable-next-line
  }, [message])

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={KingsHeartLogo} alt="King's Heart" />
          </div>
          <h2>Forgot Password?</h2>
          <div className={styles.resettext}>
            <p style={{
              width: "80%",
              textAlign: "center",
              margin: "auto"
            }}>
              Send us the email address you used to register with King's Heart
              and we'll send you instructions on how to reset your password
            </p>
            <br />
            <br />
          </div>
          <section className={styles.contentSection}>
            <div className={styles.inputWrapper}>
              <TextField
                size="medium"
                placeholder="Enter email address"
                type="email"
                onInput={(e) => {
                  setEmail({
                    ...email,
                    email: e.target.value
                  })
                }}
                label="Email Address"
                fullWidth
                name={"email"} />
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
              onClick={() => {
                postFunc("POST", "application/json", JSON.stringify(email))
              }}>
                Send
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
}

export default RequestPasswordReset

