import React, { useRef, useState } from "react"
import { Form } from 'react-bootstrap';
<<<<<<< HEAD
import { API } from "aws-amplify"
import "../styles/createProblem.css"
=======
import { API } from "aws-amplify";
import { Storage } from 'aws-amplify'

>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
function CreateProblem(){
    
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const [problemName, setProblemName] = useState("")


    // Information needed to write to S3/DynamoDB
    
    const diagramName = diagram.name;
    var text;
    var reader = new FileReader();
    var email;
    var diagramURL = "https://aws-parallel-diagrams141253-dev.s3.amazonaws.com/public/" + diagramName;

    //For loop to grab key with USER EMAIL value and assigns it to "var email" (from local storage)
    for (var key in localStorage){
        if (key.match(/AuthUser$/g)) {
            email = localStorage.getItem(key)
        }
    }

    const handleSubmit = e => {
        //submit fields to lambda function
        e.preventDefault()
<<<<<<< HEAD
=======
        
        // LOAD CFFILE TO fileContent
        reader.readAsText(CFFile);
        
        reader.onload = async (e) => {
            text = (e.target.result)            
            console.log(text)
        }
        
        alert(text);
        

>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
        const instructorSubmission = {
            problemName,
            diagramName,
            //fileContent,
            diagramURL,
            textBoxData: textBoxData.current.value,
            email,
        }
<<<<<<< HEAD
        console.log(instructorSubmission)

=======
        
       // console.log(instructorSubmission)
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913


        // console.log(instructorSubmission)

        // USING STORAGE TO STORE IMAGE
        // const result = Storage.put(diagramName, diagram)
        //     .then(res => {
        //         console.log(res, "SUCCESS")
        //     }).catch(e => console.log(e))
        
        //     console.log("result: ", result)



        // api call
        const apiName = "createProblem"
        const path = "/createProblem"
        const myInit = {
            body: instructorSubmission
        }
        API.post(apiName, path, myInit)
            .then(response => {
                console.log({response})
            })
            .catch(error => {
                console.log(error.response)
            })
        textBoxData.current.value = ""
        setProblemName("")
    };
    return (
        <div className="container">
            <Form >
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Problem Name</Form.Label>
                    <Form.Control size='lg' value={problemName} onChange={e => setProblemName(e.target.value)} placeholder="Enter problem name" />
                </Form.Group>
<<<<<<< HEAD
                <Form.Group className="upload-fields">
=======
                <Form.Group>
>>>>>>> ac9ad56685deea00dea024d9de8c74a2e5917913
                    <Form.File id="exampleFormControlFile1" label="Upload CloudFormation Template" onChange={e => setCFFile(e.target.files[0])}/>
                    <Form.File id="exampleFormControlFile1" label="Upload Architecture Diagram" onChange = {e => setDiagram(e.target.files[0])}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input Problem Scenario</Form.Label>
                    <Form.Control ref={textBoxData} as="textarea" rows={6} />
                </Form.Group>
                <Form.Group>
                    <button className="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default CreateProblem