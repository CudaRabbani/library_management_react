import React, {Component} from 'react';
import axios from 'axios';
import Noty from "noty";
import {Link} from 'react-router-dom';
import TextInput from "../../common/form/textInput";
import SubmitButton from "../../common/form/submitButton";

class AuthorForm extends Component {
    state={
        author:[],
        action:[]
    };

    async getAuthor(id) {
        try {
            const api = "http://localhost:4044/api/author/"+id;
            const {data} = await axios.get(api);
            const temp = {...data};
            console.log(temp);
            const tempDate= new Date(temp.dob);
            let month = tempDate.getMonth().toString().length < 2 ? '0'+tempDate.getMonth() : tempDate.getMonth();
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

    componentDidMount() {
        document.title="Author Form";
        const authorId = this.props.match.params.id;
        if(!authorId) {
            this.setState({action: 'create'});
            return;
        }

        this.getAuthor(authorId);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form submitted');
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
                    />
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Sex"
                                       fieldId="sex"
                                       placeHolder={sex}
                                       fieldValue={sex}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Date of Birth"
                                       fieldId="dob"
                                       placeHolder={dob}
                                       fieldValue={dob}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Language"
                                       fieldId="language"
                                       placeHolder={language}
                                       fieldValue={language}
                            />
                        </div>
                        <div className="col-sm-6">
                            <TextInput fieldLabel="Country"
                                       fieldId="country"
                                       placeHolder={country}
                                       fieldValue={country}
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
