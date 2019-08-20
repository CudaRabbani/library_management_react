import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";
import Noty from "noty";
import http from '../../../util/httpService';
import {CurrentUser, getRole} from "../../../util/currentUser";

const author_api = "http://localhost:4044/api/author";

class AuthorTable extends Component {
    state = {
        authors: []
    };

    tableHeader= [
        {id: 0, label: '#'},
        {id: 1, label: 'Name'},
        {id: 2, label: 'Sex'},
        {id: 3, label: 'DOB'},
        {id: 4, label: ''},

    ];
    tableBody= [
        {id: 0, type: 'data', data: 'name'},
        {id: 1, type: 'data', data: 'sex'},
        {id: 2, type: 'data', data: 'dob'},
        {id: 3, type: 'button',
            content: author => <button
            className="btn btn-warning"
            onClick={()=>this.updateAuthor(author)}>
            Show
            </button>
        },

     ];

    constructor () {
        super();
        const user = CurrentUser();
        if (user && user.role === "admin") {
            this.tableHeader.push(
                {id: 5, label: ''},
                );
            this.tableBody.push({id: 4, type: 'button',
                content: author => <button
                    className="btn btn-danger"
                    onClick={()=>this.deleteAuthor(author)}
                >
                    Delete
                </button>
            });
        }
    }

    async getAuthors () {
        const api_end = "http://localhost:4044/api/author";
        try {
            const {data} = await axios.get(api_end);
            const authors = data.map(author=>{
                const temp = {...author};
                const tempDate= new Date(temp.dob);
                let month = tempDate.getMonth().toString().length < 2 ? '0'+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
                let date = tempDate.getDate().toString().length < 2 ? '0'+tempDate.getDate() : tempDate.getDate();
                temp['dob'] = tempDate.getFullYear()+"/"+month+"/"+date;
                return temp;
            });
            this.setState({authors});
        }
        catch(ex) {
            new Noty ({
                theme: 'mint',
                text: ex.message || ex.response,
                type: "error",
                timeout: 4000
            }).show();

        }
    }

    componentDidMount() {
        document.title="Author List";
        const {user} = this.props;
        this.getAuthors();
    }

    updateAuthor = (author) => {
        this.props.history.push('/authors/edit/'+author._id);
    }

    deleteAuthor = async(author) => {
        console.log('author deleted');
        const beforeDelete = this.state.authors;
        const afterDelete = beforeDelete.filter(a=> a._id !== author._id);
        this.setState({authors: afterDelete});
        try {
            http.setToken();
            const {data} = await axios.delete(author_api+'/'+author._id);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/authors');
        }
        catch (ex) {
            new Noty ({
                theme: 'mint',
                text: ex.response || ex.request || ex.message,
                type: "error",
                timeout: 4000
            }).show();
        }
    }

    render() {
        const {authors} = this.state;
        const tableHeader=this.tableHeader;
        const tableBody=this.tableBody;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <p></p>
                        {getRole() === 'admin' && (
                            <Link to="/authors/new"
                                  className="btn btn-primary"
                                  style={{marginTop: 2, marginBottom: 3}}
                            >Create New</Link>
                        )}
                        <table className="table m-1">
                            <TableHeader headerText={tableHeader}/>
                            <TableBody tableData={authors} tableDataExtractor={tableBody}/>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default AuthorTable;
