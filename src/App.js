import React, { useState, useEffect } from 'react';
import Home from './components/Home';
import Login from "./components/Login"
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import InstructorProblems from './components/InstructorProblems';
import { Auth, Hub, Logger, API, Storage } from "aws-amplify"
import decode from "jwt-decode"
import InstructorHeader from "./components/InstructorHeader"
import StudentHeader from "./components/StudentHeader"
import CreateProblem from './components/CreateProblem';
import StudentProblems from './components/StudentProblems';
import InstructorsStudents from './components/InstructorsStudent';
import MyAccount from './components/MyAccount';
import Problem from './components/Problem';

const App = () => {
    const history = useHistory()
    const [userGroup, setUserGroup] = useState(null)
    const [problems, setProblems] = useState([])
   
    async function getProblems() {
        try {
            let res = await API.get("instructorProblems", "/instructorProblems/scan", {})
            console.log('{ res }', res)
            res = await Promise.all(res.map(async cv => {
                cv.diagram = await Storage.get(cv.diagramName)
                return cv
            }))
            setProblems(res)
        }
        catch (err) {
            console.error("err: ", err)

        }
    }

    function getUserGroup() {
        // Extract group information from JWT
        Auth.currentSession().then(res => {
            const JWT = res.getAccessToken().getJwtToken()
            const decodedToken = decode(JWT)
            const group = decodedToken["cognito:groups"][0]
            localStorage.setItem("userGroup", group)
            setUserGroup(group)
    
        })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getUserGroup()
    }, [userGroup])

    useEffect(() => {
        getProblems()
    }, [])

    function routeToCorrectHeader() {
        if (userGroup === "Instructors") return <InstructorHeader />
        if (userGroup === "Students") return <StudentHeader />
        else return null
    }
    
    const logger = new Logger('My-Logger');

    const listener = (data) => {
        switch (data.payload.event) {
            case 'signIn':
                logger.info('user signed in');
                getUserGroup()
                const group = localStorage.getItem("userGroup")
                setUserGroup(group)
                history.push("/home")


                break;
            case 'signUp':
                logger.info('user signed up');
                getUserGroup()
                const g = localStorage.getItem("userGroup")
                localStorage.setItem("total-problems", 0)
                setUserGroup(g)
                history.push("/home")

                break;
            case 'signOut':
                logger.info('user signed out');
                localStorage.removeItem("userGroup")
                setUserGroup(null)
                history.push("/")

                break;
            case 'signIn_failure':
                logger.error('user sign in failed');
                break;
            case 'tokenRefresh':
                logger.info('token refresh succeeded');
                break;
            case 'tokenRefresh_failure':
                logger.error('token refresh failed');
                break;
            case 'configured':
                logger.info('the Auth module is configured');
                break;
            default:
                logger.info("unknown call")
        }
    }

    Hub.listen('auth', listener);

    return (
        <div>
            {routeToCorrectHeader()}
            <Route exact={true} path="/" component={Login} />
            <Route exact={true} path="/home" render={(props) => <Home {...props} problems={problems} />} />
            <Route exact={true} path="/problems" component={InstructorProblems} />
            <Route exact={true} path="/problems/create-problem" component={CreateProblem} />
            <Route exact={true} path="/studentproblems" component={StudentProblems} />
            <Route exact={true} path="/students" component={InstructorsStudents} />
            <Route exact={true} path="/myaccount" component={MyAccount} />
            <Route exact={true} path="/problem" component={Problem} />
        </div>
    );
};

export default App