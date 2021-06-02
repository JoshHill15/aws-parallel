import React from "react"

function MyAccount() {

    return (
        <form>
            <label>
                My Account Information:
            </label><br />
            <lable for="fname">First Name:</lable><br />
            <input type="text" id="fname" name="fname" /><br /><br />
            <lable for="fname">Last Name:</lable><br />
            <input type="text" id="lname" name="lname" /><br /><br />
            <lable for="fname">Email:</lable><br />
            <input type="email" id="email" name="email" />
            <input type="submit" value="Submit"></input>
        </form>
    )
}

export default MyAccount