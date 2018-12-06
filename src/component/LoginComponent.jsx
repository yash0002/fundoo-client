/**
 * @description Login Component
 * @author Yash
 * @since 26/11/2018
 * @version 1.1
 * @module component
 */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, IconButton, InputAdornment, Button, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { loginService } from '../service/UserService';
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
// import App from '../App.js';
// const snackBarTheme = createMuiTheme(snackBar);

// function Display(props) {
//     return <h2>Hello {props.name} </h2>
// }

/**
 * @description LoginComponent class component for login
 */
class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            showpassword: false,
            redirectToReferrer: false,
            responseGot: false,
            snackOpen: false,
            snackMessage: ""
        }
        this.setValue = this.setValue.bind(this);
        this.handleShowPassword = this.handleShowPassword.bind(this);
        this.handleSnackClose = this.handleSnackClose.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    /**
     * @description method to set value of state variables
     */
    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /**
     * @description method to set value of password to display or not
     */
    handleShowPassword() {
        this.setState({
            showpassword: !this.state.showpassword
        })
    }

    handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ snackOpen: false });
    };

    loginUser() {

        if (this.state.email !== "") {
            if (this.state.password !== "") {

                let request = {
                    thread: "/login",
                    data: {
                        email: this.state.email,
                        password: this.state.password
                    }
                }

                loginService(request)
                    .then(res => {
                        if (res) {
                            console.log('res on login component',res);
                            
                            localStorage.setItem("userLogToken", res.token);
                            localStorage.setItem('userLogName', res.message.name);
                            localStorage.setItem("userLogged", res.message.email_id);
                            this.setState({
                                responseGot: true
                            });
                        }
                        else {
                            this.setState({
                                snackOpen: true,
                                snackMessage: "Error Occured, Try Later!"
                            })
                        }
                    })
            }
            else {
                this.setState({
                    snackOpen: true,
                    snackMessage: "Password Empty"
                });
            }
        }
        else {
            this.setState({
                snackOpen: true,
                snackMessage: "Email Empty"
            });
        }
    }

    render() {
        if (this.state.responseGot) return (<Redirect to="/dashboard" />)

        return (
            // <MuiThemeProvider theme={nTheme} >
            <div className="Form">
                <div className="formHeader">
                    Log in<span className="beforeDashboardTitle" >Fundoo Notes</span>
                </div>
                <div className="inputTextBoxes">
                    <TextField className="textFields" label={this.props.name} name="email" onChange={this.setValue} required></TextField>
                </div>
                <div>
                    <TextField className="textFields" label="Password" type={this.state.showpassword ? 'text' : 'password'} required
                        value={this.state.password} onChange={this.setValue} name="password"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="Toggle Password Visibility" onClick={this.handleShowPassword} >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                <div>
                    <a className="forgotPasswordLinkLoginPage" href="/forgotpassword">Forgot <b>Password</b></a>
                </div>

                <div>
                    <Button id="loginButton" onClick={this.loginUser} variant='extendedFab' color="primary" >Login</Button></div>
                <div>
                    <span className="textStyle" >Don't have account? </span>
                    <a className="registerLinkLoginPage" href="/register"> <b>Register</b> </a>
                </div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this.handleSnackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    color="primary "
                    message={<span id="message-id">{this.state.snackMessage}</span>}
                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleSnackClose} >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                {/* child component displaying entered value */}
                {/* <Display name = {this.state.password} /> */}
            </div>
            // </MuiThemeProvider>
        )
    }
}

/**
 * @exports LoginComponent component so as screens can import it
 */
export default LoginComponent;