import React from "react"
import "../styles/StudentHeader.css"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from "react-router-dom";

//Created a obj to use the styles from the Material ui libary that we use for the Avatar icon.
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
}));

function StudentHeader({ email }) {
    //added variable to utilize the obj created above
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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