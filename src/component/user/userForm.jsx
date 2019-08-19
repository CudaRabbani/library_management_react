import React, {Component} from 'react';
import TextInput from "../common/form/textInput";
import {Link} from "react-router-dom";
import SubmitButton from "../common/form/submitButton";
import Noty from "noty";
import axios from 'axios';
import _ from 'lodash';
import CustomSelect from "../common/form/customSelect";
import http from '../../util/httpService';

const api_endpoint = "http://localhost:4044/api/userinfo";

class UserForm extends Component {


    state={
        action: [],
        usersex: [],
        userinfo: { fname: '', lname: '', phone:'', email: '', sex:'', dob:'',
            address:'', city: '',postalCode:'', province: '', country: ''
        }
    };
    sex=[
        {_id: 0, name: 'Male'},
        {_id: 1, name: 'Female'}
    ];


    async getUserInfo (id) {
        http.setToken();
        const userInfo_endpoint = api_endpoint+'/'+id;
        try {
            const {data} = await axios.get(userInfo_endpoint);
            const users = _.pick(data, ['fname', 'lname', 'phone', 'email', 'sex', 'isActive',
                            'address', 'city', 'postalCode', 'province', 'country', 'dob']);
            const userinfo = {...users};
            let tempDOB = new Date(userinfo.dob);
            userinfo['dob'] = tempDOB.getFullYear()+"/"+(tempDOB.getMonth()+1)+"/"+tempDOB.getDate();
            this.setState({userinfo})
            const usersex=this.sex.filter (s=> s.name===this.state.userinfo.sex);
            this.setState({usersex: usersex[0]});
        }
        catch (ex) {
            const msg = ex.response ? ex.response.status +': '+ex.response.data : ex.message;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
            this.props.history.push('/users');
        }
    }

    handleTextInputChange = (e) => {
        const userinfo = {...this.state.userinfo};
        userinfo[e.currentTarget.name] = e.currentTarget.value;
        this.setState({userinfo});
    };

    handleSelect = (e) => {
        const userinfo = {...this.state.userinfo};
        userinfo[e.target.name] = e.target.value;
        this.setState({userinfo});
    };

    handleCheckbox = (e) => {
        const userinfo={...this.state.userinfo};
        userinfo[e.target.name]=e.target.checked;
        this.setState({userinfo})

    };

    async updateUserInfo () {
        const {userinfo} = this.state;
        try {
            const put_url = api_endpoint+'/'+this.props.match.params.id;
            const {data} = await axios.put(put_url, userinfo);
            new Noty ({
                theme: 'mint',
                text: 'Data Update Successful',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/users');
        }
        catch (ex) {
            const msg = `${ex.response.data}`;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    };

    async createUserInfo() {
        try {
            const {data} = await axios.post(api_endpoint, this.state.userinfo);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/users/password');
        }
        catch (ex) {
            const msg = `${ex.response.data}`;
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
        if (this.state.action === 'create') {
            console.log('new User created');
            this.createUserInfo();
        }
        else {
            console.log('user updated');
            this.updateUserInfo();
        }
        console.log(this.state.userinfo);
    }

    componentDidMount() {
        const user_id = this.props.match.params.id;
        const usersex = this.sex;
        this.setState({usersex});
        if (!user_id) {
            this.setState({action:'create'});
            return;
        }

        this.getUserInfo(user_id);
    }


    render() {
        const {fname, lname, email, phone, sex, dob, isActive, address, city, postalCode,
            province, country} = this.state.userinfo;
        const {action, usersex} = this.state;
        let buttonClass, buttonLabel;
        if (action === 'create') {
            buttonClass = "btn btn-primary";
            buttonLabel="Save"
        }
        else {
            buttonClass = "btn btn-warning";
            buttonLabel="Update"
        }
        return (
            <div>
                <h3>User Form</h3>
                <form>
{/*                    <div className="row">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6"></div>
                    </div>*/}
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="First Name"
                                       placeHolder="First Name"
                                       fieldValue={fname}
                                       fieldId="fname"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Last Name"
                                       placeHolder="Last Name"
                                       fieldValue={lname}
                                       fieldId="lname"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                    </div>
                    <TextInput fieldLabel="Email"
                               placeHolder="Email Address"
                               fieldValue={email}
                               fieldId="email"
                               onInputChange={this.handleTextInputChange}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <CustomSelect fieldLabel='Sex'
                                          fieldId='sex'
                                          options={this.sex}
                                          fieldValue={this.state.usersex}
                                          onChange={this.handleSelect}
                                          sendBack='name'
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Phone no"
                                       placeHolder="Phone no"
                                       fieldValue={phone}
                                       fieldId="phone"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Date of Birth"
                                       placeHolder="Date of Birth"
                                       fieldValue={dob}
                                       fieldId="dob"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                    </div>
                    <TextInput fieldLabel="Address"
                               placeHolder="Address"
                               fieldValue={address}
                               fieldId="address"
                               onInputChange={this.handleTextInputChange}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="City"
                                       placeHolder="City"
                                       fieldValue={city}
                                       fieldId="city"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Postal Code"
                                       placeHolder="Potal Code"
                                       fieldValue={postalCode}
                                       fieldId="postalCode"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Province"
                                       placeHolder="Province"
                                       fieldValue={province}
                                       fieldId="province"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Country"
                                       placeHolder="Country"
                                       fieldValue={country}
                                       fieldId="country"
                                       onInputChange={this.handleTextInputChange}
                            />
                        </div>
                    </div>
                    <SubmitButton buttonClass={buttonClass}
                                  buttonLabel={buttonLabel}
                                  onSubmit={this.handleSubmit}
                    />
                    <Link
                        to='/users'
                        className="btn btn-secondary"
                        style={{margin: 20}}
                    >Cancel </Link>
                </form>

            </div>
        );
    }
}


export default UserForm;
