import React, {Component} from 'react';
import axios from "axios";
import Noty from 'noty';

import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";

const api_endpoint = "http://localhost:4044/api/book";


class BookTable extends Component {
    state={
        tableHeader: [
            {id: 0, label: '#'},
            {id: 1, label: 'Title'},
            {id: 2, label: 'Author'},
            {id: 3, label: 'Category'},
            {id: 4, label: ''},
            {id: 5, label: ''}
        ],
        tableDataExtractor: [
            {id: 0, type: 'data', data: 'title'},
            {id: 1, type: 'data', data: 'author.name'},
            {id: 2, type: 'data', data: 'category.name'},
            {id: 4, type: 'button',
                content: book => <button
                    className="btn btn-warning btn-md"
                    onClick={()=>this.updateBook(book)}
                >Edit</button>
            },
            {id: 5, type: 'button',
                content: book => <button
                    className="btn btn-danger btn-md"
                    onClick={()=>this.deleteBook(book)}
                >Delete</button>
            }
        ],
        books: []
    };

    updateBook = (book) => {
        console.log('Update: ', book);
        this.props.history.push('/books/edit/'+book._id);
    };

    deleteBook = async (book) => {
        const beforeDelete = this.state.books;
        const books = beforeDelete.filter (b => b !== book);
        this.setState({books});
        try {
            const {data} = await axios.delete(api_endpoint+'/'+book._id);
            new Noty ({
                theme: 'mint',
                text: 'Category deleted',
                type: "success",
                timeout: 4000
            }).show();
        }
        catch (ex) {
            console.log(ex.response);
            new Noty ({
                theme: 'mint',
                text: ex.response,
                type: "error",
                timeout: 4000
            }).show();

        }
    };


    async componentDidMount() {
        console.log('book table component');
        try {
            const {data} = await axios.get(api_endpoint);
            this.setState({books: data});
        }
        catch (err) {
            const {errors} = this.state;
            errors.push(err.message);
            this.setState({errors});
        }
    }

    render() {
        return (
            <table className="table m-1">
                <TableHeader headerText={this.state.tableHeader}/>
                <TableBody
                    tableData={this.state.books}
                    tableDataExtractor={this.state.tableDataExtractor}
                />
            </table>
        );
    }
}


export default BookTable;

