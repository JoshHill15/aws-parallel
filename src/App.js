import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Login from "./components/Login"
import { Route, useHistory } from "react-router-dom";
import InstructorProblems from './components/InstructorProblems';
import { Auth, Hub, Logger } from "aws-amplify"
import decode from "jwt-decode"
import InstructorHeader from "./components/InstructorHeader"
import StudentHeader from "./components/StudentHeader"
import CreateProblem from './components/CreateProblem';

const App = () => {
  const history = useHistory()
  const [userGroup,setUserGroup] = useState(null)

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
    },[userGroup])

    function routeToCorrectHeader() {
      if (userGroup === "Instructors") return <InstructorHeader setUserGroup={setUserGroup}/>
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

            break;
        case 'signUp':
            logger.info('user signed up');
            // getUserGroup()
            // const g = localStorage.getItem("userGroup")
            // setUserGroup(g)

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
      <Route exact={true} path="/" render={(props) => <Login {...props} setUserGroup={setUserGroup} />}/>
      <Route exact={true} path="/" render={(props) => <Dashboard {...props} setUserGroup={setUserGroup} />}/>
      <Route exact={true} path="/problems" component={InstructorProblems} />
      <Route exact={true} path="/problems/create-problem" component={CreateProblem} />
    </div>
  );
};

export default App