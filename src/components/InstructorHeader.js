import React from "react"
import "../styles/InstructorHeader.css"
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from "react-router-dom";


function InstructorHeader({ email }) {

    return (
        <div className="main-div">
            <Link className="links" to="/home">Home</Link>
            <Link className="links" to="/problems">Problems</Link>
            <Link className="links" to="/students">Students</Link>
            <AmplifySignOut />
            <p className="user-email">Welcome, {email}</p>

        </div>
    )
}

export default InstructorHeader