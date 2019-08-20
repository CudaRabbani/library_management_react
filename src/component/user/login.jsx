import React, {Component} from 'react';
import axios from 'axios';

import TextInput from "../common/form/textInput";
import SubmitButton from "../common/form/submitButton";
import Noty from "noty";
//import "../../styles/login.css";

const api = "http://localhost:4044/api/login";
class Login extends Component {
    state={
        login: {}
    };

    handleTextInput = (e) => {
        const {login} = this.state;
        login[e.currentTarget.name]=e.currentTarget.value;
        this.setState({login});
    }

    doLogin = async() => {
        try {
            const {login} = this.state;
            const {data: jwt} = await axios.post(api, login);
            localStorage.setItem('token', jwt);
            new Noty ({
                theme: 'mint',
                text: "Login Successful",
                type: "success",
                timeout: 4000
            }).show();
            //this.props.history.push("/");
            window.location="/";
        }
        catch (ex) {
            const msg = ex.message || ex.request || ex.response.data;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.doLogin();
    }
    render() {
        const {email, password} = this.state.login;
        return (
            <body className="container">
            <form className="form-signin">
                <TextInput
                    fieldLabel="Email"
                    fieldId="email" placeHolder="Email Address"
                    fieldValue={email}
                    onInputChange={this.handleTextInput}
                />
                <TextInput
                    fieldLabel="Password"
                    fieldId="password" placeHolder="Password"
                    fieldValue={password}
                    onPasswordChange={this.handleTextInput}
                    password="true"
                />
                <SubmitButton
                    buttonClass="btn btn-primary"
                    buttonLabel="Login"
                    onSubmit={this.handleSubmit}
                />
            </form>
            </body>
        );
    }
}


export default Login;
