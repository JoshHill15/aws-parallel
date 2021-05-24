import React, { useEffect } from "react"
import { Auth } from "aws-amplify"
import decode from "jwt-decode"
import StudentHeader from "./StudentHeader"
import InstructorHeader from "./InstructorHeader"

function Dashboard(){
    function getUserGroup() {
        // Extract group information from JWT
        Auth.currentSession().then(res => {
            const JWT = res.getAccessToken().getJwtToken()
            // console.log(JWT)
            const decodedToken = decode(JWT)
            // console.log(decodedToken)
            const userGroup = decodedToken["cognito:groups"][0]
            // console.log("user",userGroup)
            localStorage.setItem("userGroup", userGroup)
    
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserGroup()
    },[])
    
    const userGroup = localStorage.getItem("userGroup")
    
    return (
        <div>
            {userGroup === "Instructors" ? <InstructorHeader/> : <StudentHeader/>}
            This is the dashboard
        </div>
    )
}

export default Dashboard