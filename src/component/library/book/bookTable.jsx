import React, {Component} from 'react';
import axios from "axios";
import Noty from 'noty';

import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";
import _ from "lodash";

const api_endpoint = "http://localhost:4044/api/book";
const category_api = 'http://localhost:4044/api/category';

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
        books: [],
        category: []
    };

    updateBook = (book) => {
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

    handleCategorySideBar = (category) => {
        console.log(category);
        this.setState({selectedCategory: category});
    };

    getFilteredBooks() {
        const {books: allBooks, selectedCategory} = this.state;
        const filteredBooks = selectedCategory && selectedCategory._id ?
            allBooks.filter(book => book.category._id === selectedCategory._id) : allBooks;
        console.log('filtered books', filteredBooks);
        return {totalFilteredBooks: filteredBooks.length,filteredBooks: filteredBooks };
    }


    async componentDidMount() {
        try {
            const {data} = await axios.get(api_endpoint);
            this.setState({books: data});
            const {data: tempCategories} = await axios.get(category_api);
            //console.log(data);
            const categories = tempCategories.map(d=>_.pick(d,['_id','name']));
            const category = [{'_id': '', 'name': 'All Categories'},...categories];
            this.setState({category});
        }
        catch (ex) {
            new Noty ({
                theme: 'mint',
                text: ex.response || ex.message,
                type: "error",
                timeout: 4000
            }).show();
        }
    }


    render() {
        const {selectedCategory} = this.state;
        const {books} = this.state;
        const {totalFilteredBooks, filteredBooks} = this.getFilteredBooks();
        return (
            <div className="row">
                <div className="col-sm-3">
                    <ul className="list-group">
                        {this.state.category.map(cat=>(
                            <li key={cat._id}
                                className={selectedCategory === cat ? "list-group-item active" : "list-group-item"}
                                onClick={()=>this.handleCategorySideBar(cat)}
                            >{cat.name}</li>
                        ))}
                    </ul>
                </div>
                <div className="col-sm-9">
                    <p> Showing {totalFilteredBooks} Books out of {books.length} Books</p>
                    <table className="table m-1">
                        <TableHeader headerText={this.state.tableHeader}/>
                        <TableBody
                            /*tableData={this.state.books}*/
                            tableData={filteredBooks}
                            tableDataExtractor={this.state.tableDataExtractor}
                        />
                    </table>
                </div>
            </div>
        );
    }
}


export default BookTable;

