import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";
import Noty from "noty";

class AuthorTable extends Component {
    state = {
        tableHeader: [
            {id: 0, label: '#'},
            {id: 1, label: 'Name'},
            {id: 2, label: 'Sex'},
            {id: 3, label: 'DOB'},
            {id: 4, label: ''},
            {id: 5, label: ''},
        ],
        tableBody: [
            {id: 0, type: 'data', data: 'name'},
            {id: 1, type: 'data', data: 'sex'},
            {id: 2, type: 'data', data: 'dob'},
            {id: 3, type: 'button',
                content: author => <button
                    className="btn btn-warning"
                    onClick={()=>this.updateAuthor(author)}>
                    Edit
                </button>
            },
            {id: 4, type: 'button',
                content: author => <button
                    className="btn btn-danger"
                    onClick={()=>this.deleteAuthor(author)}
                >
                    Delete
                </button>
            }
        ],
        authors: []
    };

    async getAuthors () {
        const api_end = "http://localhost:4044/api/author";
        try {
            const {data} = await axios.get(api_end);
            const authors = data.map(author=>{
                const temp = {...author};
                const tempDate= new Date(temp.dob);
                let month = tempDate.getMonth().toString().length < 2 ? '0'+tempDate.getMonth() : tempDate.getMonth();
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
        this.getAuthors();
    }

    updateAuthor = (author) => {
        console.log('author updated');
        this.props.history.push('/authors/edit/'+author._id);

    }

    deleteAuthor = async(author) => {
        console.log('author deleted');
    }

    render() {
        const {tableHeader, tableBody, authors} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <p></p>
                        <Link to="/authors/new" className="btn btn-primary" style={{marginTop: 2, marginBottom: 3}}>Create New</Link>
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
