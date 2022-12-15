import { useState, useEffect, useRef } from "react";
import Layout from "../Layout/Layout";
import styles from "./styles/styles.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Misc, Scoresheet, Admin } from "../../Lib/Endpoints/Endpoints";
import useFetch from "../../Lib/Hooks/Requests/useFetch";
import useFetchNoEffect from "../../Lib/Hooks/Requests/useFetchNoEffect";
import Loader from "../../Lib/Loader/Loader";
import Feedback from "../../Lib/Feedback/Feedback";
import { createDB, populateDBCollection, updateDBCollection, useDB } from "../../Lib/utils/OfflineDB";


const Scoresheets = () => {

    const Fragments = () => {
            
        const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
            [`& .${gridClasses.row}.even`]: {
                backgroundColor: "var(--gray)",
            },
            [`& .${gridClasses.row}.odd`]: {
                backgroundColor: "var(--white)",
            }
        }));

        function CustomToolbar() {
            return (
                <GridToolbarContainer 
                sx={{
                    justifyContent: "flex-end"
                }}>
                    <GridToolbarExport 
                    csvOptions={{disableToolbarButton: true}}
                    printOptions={{
                        fileName: "JSS 1 Scoresheets",
                        hideFooter: true,
                        hideToolbar: true
                    }} />
                </GridToolbarContainer>
            );
        }
            
        const [pageSize, setPageSize] = useState(10)

        function setCellClassName(params){
            if (params.value < params.colDef.maxValue / 2) {
                return "score-failed";
            }
        }
        
        function forceLimit(params){
            if (params.value > params.colDef.maxValue) {
                return params.colDef.maxValue;
            } else {
                return params.value
            }
        }

        function nullFormatter(params){
            if (params.value === null){
                return "-"
            }
        }

        const dataIsEditable = true
        const column = [
            { 
                field: 'student', 
                headerName: 'Name', 
                description: "Student's Name",
                editable: false,
                width: 200,
                valueGetter: (params) => {
                    return `${params.row.student.last_name} ${params.row.student.first_name}`
                }
            },
            { 
                field: 'ats1', 
                headerName: 'ats I (10pts)', 
                description: "First assessment score",
                type: 'number', 
                editable: dataIsEditable,
                flex: 1, 
                maxValue: 10,
                valueGetter: forceLimit,
                valueFormatter: nullFormatter,
                cellClassName: setCellClassName
            },
            { 
                field: 'ats2', 
                headerName: 'ats II (10pts)', 
                description: "Second assessment score",
                type: 'number', 
                editable: dataIsEditable,
                flex: 1, 
                maxValue: 10,
                valueGetter: forceLimit,
                valueFormatter: nullFormatter,
                cellClassName: setCellClassName
            },
            { 
                field: 'mid_terms', 
                headerName: 'mid terms (20pts)', 
                description: "Mid term test score",
                type: 'number', 
                editable: dataIsEditable,
                flex: 1, 
                maxValue: 20,
                valueGetter: forceLimit,
                valueFormatter: nullFormatter,
                cellClassName: setCellClassName
            },
            { 
                field: 'exams', 
                headerName: 'exams (60pts)', 
                description: "Exam score",
                type: 'number', 
                editable: dataIsEditable,
                flex: 1, 
                maxValue: 60,
                valueGetter: forceLimit,
                valueFormatter: nullFormatter,
                cellClassName: setCellClassName
            }
        ]

        function handleRowEditError(error){
            console.log("error during update: ", error)
        }

        const [DBParams, setDBParams] = useState({})

        const {data: DBData, fetchOfflineData} = useDB(DBParams?.database, 1, DBParams?.database)

        function handleRowEditCommit(newRow, oldRow){
            updateDBCollection(DBParams?.database, 1, DBParams?.database, newRow, newRow.id)
            fetchOfflineData()
        }

        const synchronizerIsMounted = useRef(false);
        useEffect(() => {
            if (synchronizerIsMounted.current === true){
                const worker = new Worker(new URL("./Synchronizer", import.meta.url))
                worker.postMessage({
                    url: Scoresheet.updateScoresheet,
                    method: "PUT",
                    contentType: "application/json",
                    data: DBData,
                    requestToken: window.localStorage.getItem("user-tokens") || "none"
                })
                worker.onmessage = (e) => {
                    if (e.data?.message === "Success"){
                        worker.terminate()
                    }
                }
            }
            synchronizerIsMounted.current = true
        // eslint-disable-next-line
        }, [DBData])

        // ######################################################
        // Client side database management for offline scoresheet 
    
        const { data: classes, isLoading: FetchClassesLoading, error: errorOnFetchClasses } = useFetch(`${Admin.getExistingClasses}?className=ALL`)
        
        const { data: subjects, isLoading: FetchSubjectsLoading, error: errorOnFetchSubjects } = useFetch(`${Admin.getExistingSubjects}?subjectName=ALL`)
        
        const { data: term, isLoading: FetchTermLoading, error: errorOnFetchTerm } = useFetch(Misc.getCurrentTerm)

        const possibleTerms = {
            "1": "First",
            "2": "Second",
            "3": "Third"
        }
    
        const {
            data: scoresheets, 
            isLoading: scoresheetIsLoading, 
            error: errorOnFetchScoresheets,
            handleSearchInput: handleSearchScoresheets
        } = useFetchNoEffect(`${Scoresheet.getScoresheet}?`)
        
        // Controls the snack bar for user feedback 
        const [feedBackMessage, setFeedBackMessage] = useState("")
        const [messageSeverity, setMessageSeverity] = useState("")
        const [openSnackBar, setOpenSnackBar] = useState(false)
        function closeSnackBar(){
            setOpenSnackBar(false)
        }

        useEffect(() => {
            if(scoresheets){
                setOpenSnackBar(true);
                setFeedBackMessage(scoresheets?.status)
                setMessageSeverity("success")
            } else if(errorOnFetchScoresheets){
                setOpenSnackBar(true);
                setFeedBackMessage(errorOnFetchScoresheets?.message)
                setMessageSeverity("error")
            }
        // eslint-disable-next-line
        }, [scoresheets, errorOnFetchScoresheets])
    
        const createDBIsMounted = useRef(false);
        useEffect(() => {
            if (createDBIsMounted.current === true){
                createDB(DBParams?.database, 1, DBParams?.database)
                fetchOfflineData()
            }
            createDBIsMounted.current = true
        // eslint-disable-next-line
        }, [DBParams])

        const populateDBCollectionIsMounted = useRef(false);
        useEffect(() => {
            if (populateDBCollectionIsMounted.current === true){
                populateDBCollection(DBParams?.database, 1, DBParams?.database, scoresheets?.data)
                fetchOfflineData()
            }
            populateDBCollectionIsMounted.current = true;
        // eslint-disable-next-line
        }, [scoresheets])
    
        const [searchData, setSearchData] = useState({});

        return (
            <>
                {(FetchClassesLoading || FetchSubjectsLoading || FetchTermLoading || scoresheetIsLoading) && <Loader />}
                <Card
                className={styles.searchCard}
                elevation={4}>
                    <div 
                    className={styles.searchBar}>
                        <TextField 
                        select
                        size="small"
                        className={styles.searchBarSelect}
                        sx={{
                            margin: { xs: "5px"}
                        }}
                        onChange={(e) => {
                            setSearchData({
                                ...searchData,
                                class: e.target.value
                            })
                        }}
                        label="Class">
                            <MenuItem disabled>Class(es)</MenuItem>
                            {
                                (classes &&
                                classes?.data?.map((singleClass) => (
                                    <MenuItem key={singleClass.id} value={singleClass.class_name}>{singleClass.class_name}</MenuItem>
                                ))) ||
                                <p className={styles.errorText}>{errorOnFetchClasses?.message}</p>
                            }
                        </TextField>
                        <TextField 
                        select
                        size="small"
                        className={styles.searchBarSelect}
                        sx={{
                            margin: { xs: "5px"}
                        }}
                        onChange={(e) => {
                            setSearchData({
                                ...searchData,
                                subject: e.target.value
                            })
                        }}
                        label="Subject">
                            <MenuItem disabled>Subject(s)</MenuItem>
                            {
                                (subjects &&
                                subjects?.data?.map((singleSubject) => (
                                    <MenuItem key={singleSubject?.id} value={singleSubject?.subject_name}>{singleSubject?.subject_name}</MenuItem>
                                ))) ||
                                <p className={styles.errorText}>{errorOnFetchSubjects?.message}</p>
                            }
                        </TextField>
                        <TextField 
                        select
                        size="small"
                        className={styles.searchBarSelect}
                        sx={{
                            margin: { xs: "5px"}
                        }}
                        onChange={(e) => {
                            setSearchData({
                                ...searchData,
                                termID: e.target.value
                            })
                        }}
                        label="Term">
                            <MenuItem disabled>Term</MenuItem>
                            {
                                (term &&
                                <MenuItem selected value={term?.data?.id}>{possibleTerms[term?.data?.term]} term</MenuItem>
                                ) || 
                                <p className={styles.errorText}>{errorOnFetchTerm?.message}</p>
                            }
                        </TextField>
                    </div>
                    <div className={styles.searchBar}>
                        <TextField 
                        size="small"
                        className={styles.searchBarTextField}
                        sx={{
                            margin: { xs: "5px"}
                        }}
                        onChange={(e) => {
                            setSearchData({
                                ...searchData,
                                teacher: e.target.value
                            })
                        }}
                        label="Email of employee" />
                        <Button
                        variant="contained"
                        size="large"
                        sx={{
                            borderRadius: "10px",
                            margin: { xs: "5px"}
                        }}
                        onClick={(e) => {
                            handleSearchScoresheets(searchData)
                            setDBParams({
                                database: `${searchData?.termID}term ${searchData?.subject} ${searchData?.class}`,
                            })
                        }}
                        className={styles.searchBarSelect}>
                            Search
                        </Button>
                    </div>
                    <Feedback 
                        severity={messageSeverity} 
                        message={feedBackMessage}
                        open={openSnackBar}
                        handleClose={closeSnackBar} />
                </Card>
                {
                    DBData &&
                    <Box 
                    sx={{ 
                        height: 500,
                        marginTop: "1rem"
                    }}>
                        <StripedDataGrid
                            columns={column}
                            rows={DBData}
                            experimentalFeatures={{ newEditingApi: true }}
                            editMode="row"
                            processRowUpdate={handleRowEditCommit}
                            onProcessRowUpdateError={handleRowEditError}
                            rowsPerPageOptions={[10, 15, 20, 50, 100]}
                            pageSize={pageSize}
                            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                            sx={{
                                maxWidth: "1000px",
                                minWidth: "500px",
                                margin: "auto",
                                "& .score-failed": {
                                    color: "var(--red)"
                                }
                            }}
                            components={{Toolbar: CustomToolbar}}
                            localeText={{
                                toolbarExport: "Download Scoresheet"
                            }}
                            getRowClassName={(params) =>  
                                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
                            }
                        />
                    </Box>
                }
            </>
        )
    }

    return ( 
        <Layout>
            <Fragments /> 
        </Layout>   
    );
}
 
export default Scoresheets;