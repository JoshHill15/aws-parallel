import React, { useRef, useState, useEffect } from "react"
import { API } from "aws-amplify"
import StudentProblemPage from './StudentProblemPage';
import InstructorProblemPage from './InstructorProblemPage';
import { useLocation } from "react-router-dom";

function Problem({ userGroup, email }) {
    const [CFFile, setCFFile] = useState("")
    const [checkBoxData, setCheckBoxData] = useState(false)
    const { state } = useLocation();
    var reader = new FileReader()


    useEffect(() => {
        if(CFFile !== ""){
        reader.readAsText(CFFile);
        }
    
        reader.onload = function(e){
        setFileContent(e.target.result);
    }
    }, [CFFile]);

    const handleSubmit = e => {
        //submit fields to lambda function
        e.preventDefault()

        const submissionForInstructor = {
            submission: CFFile,
            instructor_email: state.value.instructor_email,
            grade: "N/A",
            instructorReview: checkBoxData,
            studentsName: email,
            problemName: state.value.problemName

        }

        const submissionBody = {
            body: submissionForInstructor
        }

        API.post("studentProblems", "/studentProblems", submissionBody)
            .then(response => {
            })
            .catch(error => {
                console.log(error.response)
            })




    };
    return (
        <div className="container">
            {userGroup === 'Students' ? <StudentProblemPage email={email} />: <InstructorProblemPage />}
            
        </div>
    )
}
export default Problem