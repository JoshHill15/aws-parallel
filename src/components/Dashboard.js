import React, { useEffect } from "react"
import { Auth } from "aws-amplify"
import { AmplifySignOut } from '@aws-amplify/ui-react'
import decode from "jwt-decode"


function Dashboard(){
    function getUserGroup() {
        Auth.currentSession().then(res => {
            const JWT = res.getAccessToken().getJwtToken()
            // console.log(JWT)
            const decodedToken = decode(JWT)
            // console.log(decodedToken)
            const userGroup = decodedToken["cognito:groups"][0]
            console.log("user",userGroup)
            localStorage.setItem("userGroup", userGroup)
    
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserGroup()
    },[])
 
    return (
        <div>
            This is the dashboard
            <AmplifySignOut />
        </div>
    )
}

export default Dashboard