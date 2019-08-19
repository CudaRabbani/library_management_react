import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Noty from "noty";
import {Link} from "react-router-dom";

import TextInput from "../../common/form/textInput";
import CheckboxInput from "../../common/form/checkboxInput";
import CustomSelect from "../../common/form/customSelect";
import SubmitButton from "../../common/form/submitButton";
import CustomTextarea from "../../common/form/customTextarea";
import http from "../../../util/httpService";
import {getRole} from "../../../util/currentUser";


axios.defaults.timeout = 10000;
const book_api = 'http://localhost:4044/api/book';

class BookForm extends Component {

    state={
        categories: [],
        authors: [],
        book: {title:'', isActive: '', publish_date: '',
            pages:'', abstract:'', category:'', author:''},
        selectedAuthor: '',
        selectedCategory: '',
        action: []
    };

    async getAuthor() {
        const authorURL = 'http://localhost:4044/api/author';
        try {
            const {data} = await http.get(authorURL);
            const extractedAuthor = data.map(d=>_.pick(d, ['_id', 'name']));
            const authors = extractedAuthor;
            this.setState({authors});
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

    async getCategory() {
        const categoryURL = 'http://localhost:4044/api/category';
        try {
            const {data} = await http.get(categoryURL);
            const extractedCategory = data.map(c=> _.pick(c, ['_id', 'name']))
            this.setState({categories:extractedCategory});
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

    async getBook(_id) {
        try {
            const {data} = await http.get(book_api+'/'+_id);
            if (!data) {
                throw new Error('No Data Found');
            }
            this.setState({book: _.pick(data, ['title', 'isActive', 'publish_date',
                    'pages', 'abstract', 'author', 'category'])});
            this.setState({action: 'update'});
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

    async componentDidMount() {
        this.getAuthor();
        this.getCategory();
        const bookId = this.props.match.params.id;
        if (!bookId) {
            const button = {buttonClass: 'btn btn-primary', buttonLabel: 'Save'};
            this.setState({button});
            this.setState({action: 'create'});
            return;
        }
        else {
            this.getBook(bookId);
            const button = {buttonClass: 'btn btn-warning', buttonLabel: 'Update'};
            this.setState({button});
            this.setState({action: 'update'});
        }

    }

    async AddBook() {
        http.setToken();
        try {
            const {data} = await http.post(book_api, this.state.book);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/books');
        }
        catch(ex) {
            const msg = `${ex.response.data}`;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    };

    async updatebook() {
            http.setToken();
        try {
            const {book} = this.state;
            const {data} = await axios.put(book_api+'/'+this.props.match.params.id, book);
            new Noty ({
                theme: 'mint',
                text: 'Data updated successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/books');
        }
        catch(ex) {
            const msg = `${ex.response.data}`;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
            this.setState({errors: msg});
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (!this.props.match.params.id) {
            this.AddBook();
        }
        else {
            this.updatebook();
        }

    };

    handleChange = (e) => {
        const book = {...this.state.book};
        book[e.currentTarget.name] = e.currentTarget.value;
        this.setState({book});
    };

    handleCheckbox = (e) => {
        //console.log('checkbox', e.target.name, e.target.checked);
        const book={...this.state.book};
        book[e.target.name]=e.target.checked;
        this.setState({book})

    };

    handleSelect = (e) => {
        const book = {...this.state.book};
        book[e.target.name]=e.target.value;
        this.setState({book});
//        console.log('handleSelect', this.state.book, e.target.value, e.target.name);
    }

    render() {
        const {title, isActive, publish_date, pages, abstract, author, category} = this.state.book;
        const {action} = this.state;
        let buttonLabel='';
        let buttonClass='';

        if (action === 'update') {
            buttonLabel = 'Update';
            buttonClass = "btn btn-warning";
        }
        else {
            buttonLabel = 'Save';
            buttonClass = "btn btn-primary";
        }

        const {authors, categories} = this.state;
        return (
            <form>
                <TextInput fieldLabel='Book Title'
                           fieldId='title'
                           palceHolder={title}
                           fieldValue={title}
                           onInputChange={this.handleChange}
                />
                <div className="row">
                    <div className="col-sm-6">
                        <CustomSelect fieldLabel='Author'
                                      fieldId='author'
                                      options={authors}
                                      fieldValue={author}
                                      onChange={this.handleSelect}
                        />
                    </div>
                    <div className="col-sm-6">
                        {getRole() === 'admin' ? (
                            <Link
                                to='/authors/new'
                                className="btn btn-primary"
                                style={{marginTop: 32, marginLeft: 20}}
                            >Create New Author </Link>
                        ) : null}

                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                        <CustomSelect fieldLabel='Category'
                                      fieldId='category'
                                      options={categories}
                                      fieldValue={category}
                                      onChange={this.handleSelect}
                        />
                    </div>
                    <div className="col-sm-6">
                        {getRole() === 'admin' ? (
                            <Link
                                to='/category/add'
                                className="btn btn-primary"
                                style={{marginTop: 32, marginLeft: 20}}
                            >Create New Category </Link>
                        ) : null}

                    </div>
                </div>

                <TextInput fieldLabel='Published On'
                           fieldId='publish_date'
                           palceHolder={publish_date}
                           fieldValue={publish_date}
                           onInputChange={this.handleChange}
                />
                <CheckboxInput fieldLabel='Is Active'
                           fieldId='isActive'
                           fieldValue={isActive}
                           onCheck={this.handleCheckbox}
                />
                <TextInput fieldLabel='Total Pages'
                           fieldId='pages'
                           palceHolder={pages}
                           fieldValue={pages}
                           onInputChange={this.handleChange}
                />
                <CustomTextarea fieldLabel='Abstract'
                           fieldId='abstract'
                           palceHolder={abstract}
                           fieldValue={abstract}
                           onInputChange={this.handleChange}
                />
                {getRole() === 'admin' ? (
                    <SubmitButton buttonClass={buttonClass}
                                  buttonLabel={buttonLabel}
                                  onSubmit={this.handleSubmit}
                    />
                ) : null}
                <Link
                    to='/books'
                    className="btn btn-secondary"
                    style={{margin: 20}}
                >Cancel </Link>
            </form>
        );
    }
}


export default BookForm;
