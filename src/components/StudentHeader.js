import React from "react"
import "../styles/StudentHeader.css"
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from "react-router-dom";

function StudentHeader({ email }) {

    return (
        <div className="main-div">
            <Link className="links" to="/home">Home</Link>
            <Link className="links" to="/studentProblems">Problems</Link>
            <AmplifySignOut />
            <p className="user-email">Welcome, {email}</p>
        </div>
    )
}

export default StudentHeader