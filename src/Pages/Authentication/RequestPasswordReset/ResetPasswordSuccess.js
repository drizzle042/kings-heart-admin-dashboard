import React from "react";
import styles from "../styles/styles.module.css";
import mail  from  "../../../Lib/assets/mailbox.svg";
import kingsHeartLogo from "../../../Lib/assets/king_s_heart_crown.png";

function ResetPasswordSuccess() {
  return (
    <div className={styles.wrapper}>
      <main className={styles.main}>
        <div className={styles.content}>
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={kingsHeartLogo} alt="King's Heart" />
          </div>
          <h2>Check your Mail</h2><br />         
          <section className={styles.contentSection}>           
          <div className={styles.logoWrapper}>
            <img className={styles.logo} src={mail} alt="mail" />
          </div>
          <div>
            <p style={{
              textAlign: "center",
              margin: "auto"
            }}>We have sent an email to your inbox with directions on how to reset your password.</p>
          </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default ResetPasswordSuccess;
