import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';

import TextInput from "../common/form/textInput";
import SubmitButton from "../common/form/submitButton";
import Noty from "noty";
import {Link} from "react-router-dom";

const userinfo_api = "http://localhost:4044/api/userinfo";

class UserPassword extends Component {

    state = {
        user: {email:''},
        userFound: false,
        userPass:[],
        confirmPass:[]
    };

    handleChange = (e) => {
        const user = {...this.state.user};
        user[e.currentTarget.name] = e.currentTarget.value;
        this.setState({user});
    }

    handlePassword = (e) => {
        const user = {...this.state.user};
        user[e.currentTarget.name] = e.currentTarget.value;
        this.setState({user});
    }

    async savePassword () {
        const data = _.pick(this.state.user, ['email', 'password']);
        const userinfo_id = this.state.user._id;
        const finaldata = {...data};
        finaldata['userinfo'] = userinfo_id;
        const user_api = "http://localhost:4044/api/user";
        try {
            const {data} = await axios.post(user_api,finaldata);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/users');
        }
        catch (ex) {
            const msg = `${ex.response}`;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    }


    checkPassword = (e) =>{
        e.preventDefault();
        const {password, con_pass} = this.state.user;
        if (password === con_pass) {
            this.savePassword();
        }
        else {
            new Noty ({
                theme: 'mint',
                text: "Password doesn't match",
                type: "error",
                timeout: 4000
            }).show();
        }
    }

    async getUserInfo () {
        const {email} = this.state.user;
        try {
            const {data} = await axios.get(userinfo_api+'/email/'+email);

            if (data.length == 0) {
                throw new Error('Invalid Email Address');
            }
            this.setState({user: data});
            console.log(this.state.user);
            this.setState({userFound: true});
        }
        catch(ex) {
            const msg = ex.response || ex.message;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }

    }

    findUserInfo = (e) => {
        e.preventDefault();
        this.getUserInfo()
    }
    render() {
        return (
            <div>
                <h3>User Password Form</h3>
                {!this.state.userFound ?
                    <form>
                        <TextInput fieldLabel='Email Address'
                                   fieldId='email'
                                   fieldValue={this.state.user.email}
                                   onInputChange={this.handleChange}
                        />
                        <SubmitButton
                            buttonClass="btn btn-primary btn-lg"
                            buttonLabel="Find User"
                            onSubmit={this.findUserInfo}/>
                    </form>
                :
                    <form>
                        <p>User form {this.state.user._id}</p>
                        <TextInput fieldLabel='Email Address'
                                   fieldId='email'
                                   fieldValue={this.state.user.email}
                                   onInputChange={this.handleChange}
                        />
                        <TextInput fieldLabel='Password'
                                   fieldId='password'
                                   fieldValue={this.state.user.password}
                                   onPasswordChange={this.handlePassword}
                                   password='true'
                        />
                        <TextInput fieldLabel='Confirm Password'
                                   fieldId='con_pass'
                                   fieldValue={this.state.user.con_pass}
                                   onPasswordChange={this.handlePassword}
                                   password='true'
                        />
                        <SubmitButton
                            buttonClass="btn btn-primary"
                            buttonLabel="Initiate Password"
                            onSubmit={this.checkPassword}
                        />
                        <Link
                            to='/users'
                            className="btn btn-secondary"
                            style={{margin: 20}}
                        >Cancel </Link>
                    </form>
                }
            </div>
        );
    }
}


export default UserPassword;
