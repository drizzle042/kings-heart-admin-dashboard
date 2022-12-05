import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import Layout from "../Layout/Layout";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import usePost from "../../Lib/Hooks/Requests/usePost";
import useFetch from "../../Lib/Hooks/Requests/useFetch";
import { Admin } from "../../Lib/Endpoints/Endpoints";
import Feedback from "../../Lib/Feedback/Feedback";
import Loader from "../../Lib/Loader/Loader";

const Students = () => {

    const {data: classes, isLoading: loadingClasses, error} = useFetch(`${Admin.getExistingClasses}?className=ALL`)

    const {postFunc, postForm, isLoading: posting, message, messageSeverity} = usePost(Admin.createStudent)
    

    const [feedBackMessage, setFeedBackMessage] = useState("")
    const [openSnackBar, setOpenSnackBar] = useState(false)
    function closeSnackBar(){
        setOpenSnackBar(false)
    }
    useEffect(() => {
      if (message?.message){
        setOpenSnackBar(true);
        setFeedBackMessage(message?.message)
      }
    // eslint-disable-next-line
    }, [message])


    const SingleForm = () => {

        let maxDOB = new Date() - 157680000000;
        const [formData, setFormData] = useState({
            dateOfBirth: new Date(maxDOB).toISOString()
        })
        return (
            <FormControl fullWidth>
                <form>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="First Name"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                firstName: e.target.value
                            })
                        }} 
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="Last Name" 
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                lastName: e.target.value
                            })
                        }} 
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="Contact Email" 
                        type="email"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }} 
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <PhoneInput
                        country="ng"
                        onlyCountries={["ng"]}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                phone: e
                            })
                        }}/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Date of birth"
                                required
                                value={formData.dateOfBirth}
                                onChange={(e) => {
                                    console.log(e)
                                    setFormData({
                                        ...formData,
                                        dateOfBirth: new Date(e).toISOString()
                                    })
                                }}
                                maxDate={maxDOB}
                                format="DD-MM-YYYY"
                                renderInput={(params) => <TextField fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField
                        select
                        label="Gender"
                        fullWidth
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                gender: e.target.value
                            })
                        }}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        select
                        label="School" 
                        fullWidth 
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                school: e.target.value
                            })
                        }}>
                            <MenuItem value="JS">Junior Secondary</MenuItem>
                            <MenuItem value="SS">Senior Secondary</MenuItem>
                        </TextField>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        select
                        label="Level" 
                        fullWidth 
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                level: e.target.value
                            })
                        }}>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                        </TextField>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField
                        select
                        label="Class"
                        fullWidth
                        variant="outlined"
                        required
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                currentClass: e.target.value
                            })
                        }}>
                            {
                                classes ? 
                                classes.data.map((i) => (
                                    <MenuItem key={i.class_name} value={i.class_name}>{i.class_name}</MenuItem>
                                    )) : 
                                <MenuItem>{error?.message}</MenuItem>
                            }
                        </TextField>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <Button
                        size="medium"
                        sx={{
                            width: "100px",
                            backgroundColor: "#1F53D7"
                        }}
                        variant="contained"
                        fullWidth
                        type="submit"
                        onClick={() => {
                            postFunc("POST", "application/json", JSON.stringify(formData))
                        }}
                        endIcon={<SaveIcon />}>
                            Save
                        </Button>
                    </div>
                </form>
            </FormControl>
        )
    }

    const MultipleForm = () => {
        const [csvFile, setCsvFile] = useState(null);

        const FileContainer = ({fileName}) => {
            return (
                <Stack direction="row">
                    <AttachFileIcon />
                    <Chip 
                    label={fileName} 
                    color="warning"
                    variant="filled" />
                </Stack>
            )
        }
        return (
            <>
                <Typography
                paragraph>Upload a comma separated file (csv) to add multiple students</Typography>
                <Stack direction="row" spacing={1}>
                    <Button
                    variant="contained"
                    component="label"
                    endIcon={csvFile ? <FileContainer fileName={csvFile?.name} /> : ""}>
                        Upload Class List
                        <input
                        type="file"
                        accept=".csv"
                        onChange={(e) => {
                            setCsvFile(e.target.files[0])
                        }}
                        hidden />
                    </Button>
                    {
                        csvFile ? 
                        <Tooltip title="Click to upload">
                            <IconButton
                            onClick={() => {
                                let Form = new FormData()
                                Form.append("classList", csvFile)
                                postForm("POST", Form)
                            }}>
                                <DoneOutlineIcon color="primary"/>
                            </IconButton>
                        </Tooltip> : 
                        ""
                    }
                </Stack>
                <br />
                <br />
                <br />
                <Typography
                paragraph>Note: Your csv file must be in the following format</Typography>
                <a 
                href="https://docs.google.com/spreadsheets/d/1tAqc19Lm-UJ647L1FHcfqahHuCBCp--3IIR0YpTjLl0/edit?usp=sharing" 
                target="_blank"
                rel="noreferrer"
                style={{
                    display: "block",
                    margin: "0px",
                    padding: "0px",
                    textDecoration: "underline",
                    color: "var(--blue)"
                }}>
                    You can use the google sheet available here
                </a>
                <Typography
                paragraph>If you are using the google sheet provided above, remember to download as csv.</Typography>
            </>
        )
    }

    const [addViaFile, setAddViaFile] = useState(false)

    return ( 
        <Layout>
            { (posting || loadingClasses) && <Loader />}
            <Typography 
            align="center" 
            variant="h3" 
            gutterBottom={false}
            style={{marginTop: "30px"}}>
                Register Students
            </Typography>
            <Stack 
            direction="row"
            sx={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px"
            }}>
                <Switch
                checked={addViaFile}
                onChange={() => setAddViaFile(!addViaFile)} />
                <span>Multiple Students</span>
            </Stack>
            <div className={styles.main}>
                <div className={styles.inputContainer}>
                    {
                        addViaFile ? 
                        <MultipleForm /> :
                        <SingleForm />
                    }
                    <Feedback 
                    severity={messageSeverity} 
                    message={feedBackMessage}
                    open={openSnackBar}
                    handleClose={closeSnackBar} />
                </div>
            </div>
        </Layout>
     );
}
 
export default Students;