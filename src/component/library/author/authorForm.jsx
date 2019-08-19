import React, {Component} from 'react';
import http from "../../../util/httpService";
import axios from 'axios';
import Noty from "noty";
import {Link} from 'react-router-dom';
import TextInput from "../../common/form/textInput";
import SubmitButton from "../../common/form/submitButton";
import {getUser, getToken} from "../../../util/getUser";

const author_api = "http://localhost:4044/api/author";
class AuthorForm extends Component {
    state={
        author:{name: '', sex: '', dob: '', country:'', language:''},
        action:[],
        user: {}
    };

    async getAuthor(id) {
        try {
            const api = author_api+'/'+id;
            const {data} = await http.get(api);
            const temp = {...data};
            const tempDate= new Date(temp.dob);
            let month = tempDate.getMonth().toString().length < 2 ? '0'+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
            let date = tempDate.getDate().toString().length < 2 ? '0'+tempDate.getDate() : tempDate.getDate();
            temp['dob'] = tempDate.getFullYear()+"/"+month+"/"+date;
            this.setState({author: temp});
        }
        catch(ex) {
            new Noty ({
                theme: 'mint',
                text: ex.response,
                type: "error",
                timeout: 4000
            }).show();
        }
    }

    async postAuthor () {
        //axios.defaults.headers.common['x-auth-token'] = getToken();
        http.setToken();
        let api_endpoint = author_api;
        if (this.state.action === 'update') {
            api_endpoint += "/"+this.state.author._id;
        }
        try {
            const {data} = await http.post(api_endpoint, this.state.author);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/authors');
        }
        catch(ex) {
            const msg = ex.response ? ex.response.status +': '+ex.response.data : ex.message;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    }

    componentDidMount() {
        document.title="Author Form";
        const user = getUser();
        this.setState({user});
        const authorId = this.props.match.params.id;
        if(!authorId) {
            this.setState({action: 'create'});
            return;
        }

        this.getAuthor(authorId);
    }

    handleTextInput = (e) => {
        const author = {...this.state.author};
        author[e.currentTarget.name] = e.currentTarget.value;
        this.setState({author});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.postAuthor();
    }

    render() {
        const {name, sex, dob, language, country} = this.state.author;
        const {action} = this.state;
        const buttonClass = action === 'create' ? "btn btn-primary" : "btn btn-warning";
        const buttonLabel = action === 'create' ? "Save New" : "Update";
        return (
            <div>
                <h1> Author Form </h1>
                <form>
                    <TextInput fieldLabel="Full Name"
                               fieldId="name"
                               placeHolder={name}
                               fieldValue={name}
                               onInputChange={this.handleTextInput}
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Sex"
                                       fieldId="sex"
                                       placeHolder={sex}
                                       fieldValue={sex}
                                       onInputChange={this.handleTextInput}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Date of Birth"
                                       fieldId="dob"
                                       placeHolder={dob}
                                       fieldValue={dob}
                                       onInputChange={this.handleTextInput}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Language"
                                       fieldId="language"
                                       placeHolder={language}
                                       fieldValue={language}
                                       onInputChange={this.handleTextInput}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Country"
                                       fieldId="country"
                                       placeHolder={country}
                                       fieldValue={country}
                                       onInputChange={this.handleTextInput}
                            />
                        </div>
                    </div>
                   <SubmitButton buttonClass={buttonClass} buttonLabel={buttonLabel} onSubmit={this.handleSubmit}/>
                    <Link to="/authors" className="btn btn-secondary" style={{marginLeft: 30}}>Cancel</Link>
                </form>
            </div>
        );
    }
}


export default AuthorForm;
