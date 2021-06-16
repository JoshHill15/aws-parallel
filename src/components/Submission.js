import React, { useEffect, useState } from "react"
import { API } from "aws-amplify"
import { useLocation } from "react-router-dom"

function Submission({ email }){
    const { state } = useLocation()
    const [submission, setSubmission] = useState({})



    useEffect(() => {
        async function getInstructorProblem() {
            const myInit = {
                queryStringParameters: {
                    email,
                    problem_id: state.problem_id
                }
            }
            try {
                const result = await API.get("studentSubmissionAPI", "/studentSubmission/object/:email/:problem_id", myInit)
                setSubmission(result)
            }
            catch (err) {
                console.error("err: ", err)
            }
        }

        if (email !== "") getInstructorProblem()
    },[email, state.problem_id])

    return (
        <div>
            {submission.problemName}
            {submission.problem_id}
        </div>
    )
}

export default Submission