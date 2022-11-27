import { useState } from "react";


const CustomHook = () => {

    const [firstName, setFirstName] = useState();
    const handleSelectFirstName = (e) => {
      setFirstName(e.target.value)
    }
    
    const [lastName, setLastName] = useState();
    const handleSelectLastName = (e) => {
      setLastName(e.target.value)
    }

    const [email, setEmail] = useState();
    const handleSelectEmail = (e) => {
      setEmail(e.target.value)
    }

    const [newPhoneNumber, setNewPhoneNumber] = useState();

    const [dateOfBirth, setDateOfBirth] = useState(null);

    const [gender, setGender] = useState("Female");
    const handleSelectGender = (e) => {
      setGender(e.target.value)
    }
    
    const [school, setSchool] = useState("JS");
    const handleSelectSchool = (e) => {
      setSchool(e.target.value)
    }
    
    const [classes, setClasses] = useState("class");
    const handleSelectClasses = (e) => {
      setClasses(e.target.value)
    }


    return ({
        firstName,
        setFirstName,
        handleSelectFirstName,
        lastName,
        handleSelectLastName,
        email, 
        handleSelectEmail,
        newPhoneNumber,
        setNewPhoneNumber,
        dateOfBirth,
        setDateOfBirth,
        gender,
        handleSelectGender,
        school,
        handleSelectSchool,
        classes,
        handleSelectClasses
    })
}

export default CustomHook;