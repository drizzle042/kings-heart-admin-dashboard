import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import kingsHeartLogo from "../../Lib/assets/king_s_heart_crown.png";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./styles/styles.module.css";
import { Authentication } from "../../Lib/Endpoints/Endpoints";
import Feedback from "../../Lib/Feedback/Feedback";


const ResetPasswordpage = () => {

  const [password, setPassword] = useState({});
  const [error, setError] = useState(null);
  const [severity, setSeverity] = useState(null)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const navigate = useNavigate();

  function closeSnackBar(){
    setOpenSnackBar(false)
  }

  const [queryParams, ] = useSearchParams()

  function changePassword(passwordProvided){
    if (queryParams.has("token")){
      const token = queryParams.get("token")
      console.log(token)
      let payload = {
        password: passwordProvided
      }
      fetch(Authentication.resetPassword, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.ok){
            let promise = response.json()
            promise
                .then((resObj) => {
                  setSeverity("success")
                  setError(resObj?.message);
                  setOpenSnackBar(true)
                  window.setTimeout(() => {
                    navigate("/signin")
                  }, 3000)
                })
        } else {
            let promise = response.json()
            promise
                .then((resObj) => {
                  setSeverity("error")
                  setError(resObj?.message);
                  setOpenSnackBar(true)
                })
        }
      })
    }
  }

  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={kingsHeartLogo} alt="King's Heart" />
          </div>
          <h2>Reset Password</h2> <br></br>
          <section className={styles.contentSection}>
              <div className={styles.inputWrapper}>
                <TextField
                  size="medium"
                  placeholder="************"
                  type="password"
                  label="Password"
                  fullWidth={true}
                  name={"password"}
                  onInput = {(e) => {
                    setPassword({
                      ...password,
                      passwordOne: e.target.value
                    })
                  }}
                />
              </div>
              <div className={styles.inputWrapper}>
                <TextField
                  size="medium"
                  placeholder="************"
                  type="password"
                  label="Confirm Password"
                  fullWidth={true}
                  name={"confirmPassword"}
                  onInput = {(e) => {
                    setPassword({
                      ...password,
                      passwordTwo: e.target.value
                    })
                  }}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button
                  size="medium"
                  variant="contained"
                  fullWidth
                  type="submit"
                  onClick = {() => {
                    if (password.passwordOne === password.passwordTwo){
                      changePassword(password.passwordTwo)
                    } else {
                        setError({
                          message: "Your passwords do not match"
                        })
                        setSeverity("error")
                        setOpenSnackBar(true)
                    }
                  }}
                >
                Send
                </Button>
              </div>
              <Feedback 
              severity={severity} 
              message={error}
              open={openSnackBar}
              handleClose={closeSnackBar} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default ResetPasswordpage;

