import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import TextInput from "../../common/form/textInput";
import CheckboxInput from "../../common/form/checkboxInput";
import Noty from "noty";
import CustomSelect from "../../common/form/customSelect";
import SubmitButton from "../../common/form/submitButton";

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
            const {data} = await axios.get(authorURL);
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
            const {data} = await axios.get(categoryURL);
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
        console.log(_id);
        try {
            const {data} = await axios.get(book_api+'/'+_id);
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
        console.log('book form component');
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
        try {
            const {data} = await axios.post(book_api, this.state.book);
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
        console.log(this.state.book);
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
        console.log('handleSelect', this.state.book, e.target.value, e.target.name);
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
                <CustomSelect fieldLabel='Author'
                              fieldId='author'
                              options={authors}
                              fieldValue={author}
                              onChange={this.handleSelect}
                />
                <CustomSelect fieldLabel='Category'
                              fieldId='category'
                              options={categories}
                              fieldValue={category}
                              onChange={this.handleSelect}
                />
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
                <TextInput fieldLabel='Abstract'
                           fieldId='abstract'
                           palceHolder={abstract}
                           fieldValue={abstract}
                           onInputChange={this.handleChange}
                />
                {/*<button type="submit" className={buttonClass} onClick={(e)=>this.handleSubmit(e)}>{buttonLabel}</button>*/}
                <SubmitButton buttonClass={buttonClass}
                              buttonLabel={buttonLabel}
                              onSubmit={this.handleSubmit}
                />
            </form>
        );
    }
}


export default BookForm;
