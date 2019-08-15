import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Noty from 'noty';

import BookForm from "./bookForm";

const api_endpoint = "http://localhost:4044/api/book";

class AddBook extends Component {

    state = {
        book: {'title':'', 'isActive': '', 'publish_date': '',
            'pages':'', 'abstract':'', 'category':'', 'author':''},
        selectedAuthor: '',
        selectedCategory: '',
        errors:[],
        success:[],
        action:[]
    };

    async componentDidMount() {
        if (this.props.match.params.id) {
            try {
                const {data} = await axios.get(api_endpoint+'/'+this.props.match.params.id);
                if (!data) {
                    throw new Error('No Data Found');
                }
                this.setState({book: _.pick(data, ['title', 'isActive', 'publish_date',
                        'pages', 'abstract', 'author', 'category'])});
                console.log(this.state.book);
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
        else {
            const book =  {'title':'', 'isActive': '', 'publish_date': '',
                'pages':'', 'abstract':'',
                'author':{_id: ''}, 'category':{_id: ''}};
            const action ='create';
            this.setState({book, action});
        }
    }

    async AddBook() {
        console.log('add book', this.state.book);
        try {
            const {data} = await axios.post(api_endpoint, this.state.book);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/books');
        }
        catch(ex) {
            /*            console.log(ex.message);
                        console.log(ex.request);
                        console.log(ex.response);*/
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
        console.log('update book', this.state.book);
        try {
            const {book} = this.state;
            const {data} = await axios.put(api_endpoint+'/'+this.props.match.params.id, book);
            new Noty ({
                theme: 'mint',
                text: 'Data updated successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/book');
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
        const errors = [];
        const success=[];
        this.setState({errors, success});
        e.preventDefault();
        if (this.state.action === 'create') {
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
        console.log('options', e.target.name, e.target.value);
        const book = {...this.state.book};
        book[e.target.name]=e.target.value;
        this.setState({book});
        console.log('handle change', this.state.book);
    }

    render() {
        return (
            <div>
                <h2>Book Add Form </h2>
                <BookForm
                    action={this.state.action}
                    existingValue={this.state.book}
                    onInputChange={this.handleChange}
                    onCheck={this.handleCheckbox}
                    onChange={this.handleSelect}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}


export default AddBook;
