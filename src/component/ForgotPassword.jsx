/**
 * @description Login Component
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 */
import React from 'react';
import {TextField, Button} from '@material-ui/core';
import userService from '../service/UserService';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
            email : ''
        }
        this.setValue = this.setValue.bind(this);
    }

    setValue = (event) => {
        this.setState ({
            email : event.target.value
        })
    }

    handleclick() {
        if(this.state.email !== "")
        {
            let request = {
                thread : "/forgotpassword",
                data : {email : this.state.email}
            }
            userService.forgotService(request);
        }
        else
        {
            console.log('error');            
        }
    }

    render() {

        return (
            <div className = "Form" >
                <div className = "formHeader">
                    Forgot Password
                </div>
                
                <div className = "inputTextBoxes">
                </div>
                <div>
                    <TextField className = "textFields" label = "Email" name = "email" onChange = {this.setValue} value = {this.state.stateVariable} > </TextField>
                </div>
                
                <div>
                    <a  className="registerLinkLoginPage" href= "/"> Login </a>
                </div>
                <div>
                    <Button onClick = {this.handleclick.bind(this)} >Submit</Button>
                </div>
            </div>
        )
    }
}

/**
 * @exports Textfield component to get textfield for normal input as to increase reusability
 */
export default ForgotPassword;