import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Noty from "noty";

import TextInput from "../../common/form/textInput";
import CustomSelect from "../../common/form/customSelect";
import SubmitButton from "../../common/form/submitButton";


const api = "http://localhost:4044/api/";

class InventoryForm extends Component {

    state={
        action:[],
        inventory:{book: '', cost:'', added_on:'', qtyInHand:'', rent_per_day:''},
        bookList:[]
    };

    async getInventory(id) {
        try {
            const inventoryApi = api+"bookstatus/"+id;
            const {data} = await axios.get(inventoryApi);
            const inventory = {...data};
            const tempDate = new Date(inventory['added_on']);
            const yr = tempDate.getFullYear();
            const mn = tempDate.getMonth().toString().length < 2 ? '0'+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
            const day=tempDate.getDate().toString().length < 2 ? '0'+tempDate.getDate() : tempDate.getDate();
            inventory['added_on'] = yr+"/"+mn+"/"+day;
            this.setState({inventory});
        }
        catch (ex) {

        }
    }

    async getBooks () {
        const book_api = api+'book';
        try {
            const {data} = await axios.get(book_api);
            const bookList = data.map(d=>{
                const temp = _.pick(d, ['_id', 'title']);
                let tempBook = {_id: '', name: ''};
                tempBook['_id']= temp._id;
                tempBook['name'] = temp.title;
                return tempBook;
            });
            this.setState({bookList});
        }
        catch (ex) {

        }
    }

    async postIntevtory () {
        const post_end = api+"bookstatus";
        try {
            const {data} = await axios.post(post_end, this.state.inventory);
            new Noty ({
                theme: 'mint',
                text: "Inventory Saved Successfully",
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/inventory');
        }
        catch(ex) {
            const msg = ex.response || ex.request;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    }

    async putInventory () {
        const inventoryId = this.props.match.params.id;
        const put_api = api+"bookstatus/"+inventoryId;
        const book_id = this.state.inventory.book._id;
        const tempInventory = _.pick(this.state.inventory, ['cost', 'added_on', 'qtyInHand', 'rent_per_day'])
        console.log(tempInventory);
        const inventory = {...tempInventory};
        inventory['book'] = book_id;
        console.log(inventory);
        try {
            const {data} = await axios.put(put_api, inventory);
            new Noty ({
                theme: 'mint',
                text: "Inventory Updated Successfully",
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/inventory');
        }
        catch(ex) {
            const msg = ex.response || ex.request;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();

        }
    }

    componentDidMount() {
        const inventoryId = this.props.match.params.id;
        this.getBooks();
        if (!inventoryId) {
            this.setState({action:'create'});
            return;
        }
        this.setState({action:'update'});
        this.getInventory(inventoryId);
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.action === 'create') {
            this.postIntevtory();
        }
        else {
            this.putInventory();
        }
        console.log('Form submitted');
        console.log(this.state.inventory);
    }

    handleBookSelect = (e) => {
        const {inventory} = this.state;
        inventory[e.target.name] = e.target.value;
        console.log(e.target.name, e.target.value);
        this.setState({inventory});
        console.log(this.state.inventory);
    }

    handleTextInput = (e) => {
        const {inventory} = this.state;
        inventory[e.currentTarget.name] = e.currentTarget.value;
        this.setState({inventory});
    }

    render() {
        const {bookList, action} = this.state;
        const {book, cost, added_on, qtyInHand, rent_per_day} = this.state.inventory;
        let buttonClass = "btn btn-primary";
        let buttonLabel="Save New";
        if (action === 'update') {
            buttonClass="btn btn-warning";
            buttonLabel="Update";
        }
        return (
            <div className="container">
                <h2>Inventory Form</h2>
                <form>
                    <CustomSelect fieldLabel="Select a Book"
                                  fieldId="book"
                                  options={bookList}
                                  fieldValue={book}
                                  onChange={this.handleBookSelect}
                    />
                    <TextInput fieldLabel='Puchase Cost'
                               fieldId='cost'
                               palceHolder={cost}
                               fieldValue={cost}
                               onInputChange={this.handleTextInput}
                    />
                    <TextInput fieldLabel='Added On'
                               fieldId='added_on'
                               palceHolder={added_on}
                               fieldValue={added_on}
                               onInputChange={this.handleTextInput}
                    />
                    <TextInput fieldLabel='Stock In Hand'
                               fieldId='qtyInHand'
                               palceHolder={qtyInHand}
                               fieldValue={qtyInHand}
                               onInputChange={this.handleTextInput}
                    />
                    <TextInput fieldLabel='Rent Per day'
                               fieldId='rent_per_day'
                               palceHolder={rent_per_day}
                               fieldValue={rent_per_day}
                               onInputChange={this.handleTextInput}
                    />
                    <SubmitButton buttonClass={buttonClass}
                                  buttonLabel={buttonLabel}
                                  onSubmit={this.handleFormSubmit}
                    />
                    <Link to="/inventory"
                          className="btn btn-secondary"
                          style={{marginLeft: 20}}>Cancel</Link>
                </form>
            </div>
        );
    }
}


export default InventoryForm;
