// This file contains all the endpoints used in this app to which requests were made
// This is documented in the same exact way it is on the postman docs.
// Due to this, repetitions were made...

// For a full list of all endpoints, 
// visit https://www.postman.com/restless-water-478798/workspace/jureb-api

// Note: every endpoint which is used to implement a filter must be called in 
// a query ready manner 
// eg; "/api/v1/admin/cp/organizations/?" for the organizations endpoint which 
// implements a search bar and select bars. This is to enable the filter handler
// use the endpoint provided because it is expected to be in a query ready manner.
// Do not use "/api/v1/admin/cp/organizations?" leaving out the trailing slash as 
// this has been found to be problematic in IOS 15 and lower versions where the 
// operating system drops the auth header provided if a trailing slash is ommitted.

const baseUrl = process.env.REACT_APP_BACKEND_API_URL

const Authentication = {
    generateAuthTokens: `${baseUrl}/admin/api/v0/administrators/signin/`
}

const Admin = {
    createStudent: `${baseUrl}/admin/api/v0/administrators/create-student/`,
    createEmployee: `${baseUrl}/admin/api/v0/administrators/create-employee/`,
    getExistingClasses: `${baseUrl}/admin/api/v0/administrators/existing-classes/`,
    getExistingSubjects: `${baseUrl}/admin/api/v0/administrators/existing-subjects/`
}

export { 
    Authentication,
    Admin
}