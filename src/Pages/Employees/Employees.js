import { useState, useEffect } from "react";
import styles from "./styles/styles.module.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from '@mui/icons-material/Save';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Layout from "../Layout/Layout";
import usePost from "../../Lib/Hooks/Requests/usePost";
import useFetch from "../../Lib/Hooks/Requests/useFetch";
import { Admin } from "../../Lib/Endpoints/Endpoints";
import Feedback from "../../Lib/Feedback/Feedback";
import Loader from "../../Lib/Loader/Loader";

const Employees = () => {

    const {data: classes, isLoading: loadingClasses, error: FetchClassListError} = useFetch(`${Admin.getExistingClasses}?className=ALL`)
    
    const {data: subjects, isLoading: loadingSubjects, error: FetchSubjectListError} = useFetch(`${Admin.getExistingSubjects}?subjectName=ALL`)

    const {postFunc, isLoading: posting, message, messageSeverity} = usePost(Admin.createEmployee)
    

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

        let maxDOB = new Date() - 567648000000;
        const [formData, setFormData] = useState({
            dateOfBirth: new Date(maxDOB).toISOString(),
            subjects: [],
            teachingClass: []
        })
        
        function renderMultipleSelectValue(selected){
            return (
                <Stack direction="row" spacing={1}>
                    {selected.map((i) => (
                        <Chip key={i} label={i} />
                    ))}
                </Stack>
            )
        }
        return (
            <FormControl fullWidth>
                <form>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="First Name"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                firstName: e.target.value
                            })
                        }} 
                        required
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="Last Name" 
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                lastName: e.target.value
                            })
                        }} 
                        required
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        fullWidth 
                        label="Contact Email" 
                        type="email"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }} 
                        required
                        variant="outlined"/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <PhoneInput
                        country="ng"
                        onlyCountries={["ng"]}
                        // value={formData.phone}
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
                                renderInput={(params) => <TextField required fullWidth {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField
                        select
                        label="Gender"
                        fullWidth
                        variant="outlined"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                gender: e.target.value
                            })
                        }}
                        required>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female" selected>Female</MenuItem>
                        </TextField>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <TextField 
                        label="Role" 
                        fullWidth 
                        variant="outlined"
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                role: e.target.value
                            })
                        }} 
                        required/>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <Select
                        multiple
                        label={"Subject(s)"}
                        fullWidth
                        value={formData.subjects}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                subjects: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                            })
            
                        }}
                        required
                        renderValue={renderMultipleSelectValue}>
                            {
                                subjects ? 
                                subjects.data.map((i) => (
                                    <MenuItem key={i.subject_name} value={i.subject_name}>
                                        <Checkbox checked={formData.subjects.indexOf(i.subject_name) > -1} />
                                        <ListItemText primary={i.subject_name} />
                                    </MenuItem>
                                    )) : 
                                <MenuItem>{FetchSubjectListError?.message}</MenuItem>
                            }
                        </Select>
                    </div>
                    <div className={styles.textFieldContainer}>
                        <Select
                        multiple
                        label={"Class(es)"}
                        fullWidth
                        value={formData.teachingClass}
                        onChange={(e) => {
                            setFormData({
                                ...formData,
                                teachingClass: typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                            })
            
                        }}
                        required
                        renderValue={renderMultipleSelectValue}>
                            {
                                classes ? 
                                classes.data.map((i) => (
                                    <MenuItem key={i.class_name} value={i.class_name}>
                                        <Checkbox checked={formData.teachingClass.indexOf(i.class_name) > -1} />
                                        <ListItemText primary={i.class_name} />
                                    </MenuItem>
                                    )) : 
                                <MenuItem>{FetchClassListError?.message}</MenuItem>
                            }
                        </Select>
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
                            console.log(formData)
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

    return ( 
        <Layout>
            { (posting || loadingClasses || loadingSubjects) && <Loader />}
            <Typography 
            align="center" 
            variant="h3" 
            gutterBottom={false}
            style={{marginTop: "30px"}}>
                Add Employees
            </Typography>
            <div className={styles.main}>
                <div className={styles.inputContainer}>
                    <SingleForm />
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

export default Employees;