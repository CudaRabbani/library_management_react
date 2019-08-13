import React, {Component} from 'react';
import axios from 'axios';
import _ from 'lodash';
import Noty from 'noty';

import CategoryForm from "./categoryForm";
const api_endpoint = "http://localhost:4044/api/category";

class AddCategory extends Component {

    state = {
        category: {name: '', isActive: false},
        errors:[],
        success:[],
        action:'create'
    };
    formElements= [
        {id: '1', name: 'name', label: 'Category Name', type: 'text'},
        {id: '2', name: 'isActive', label: 'Active', type: 'text'}
    ];

    async componentDidMount() {
        if (this.props.match.params.id) {
            try {
                const {data} = await axios.get(api_endpoint+'/'+this.props.match.params.id);
                if (!data) {
                    throw new Error('No Data Found');
                }
                this.setState({category: _.pick(data, ['name', 'isActive'])});
                this.setState({action: 'update'})
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
    }

    async addCategory() {
        try {
            const {data} = await axios.post(api_endpoint, this.state.category);
            new Noty ({
                theme: 'mint',
                text: 'Data saved successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/category');
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

    async updateCategory() {
        try {
            const {category} = this.state;
            const {data} = await axios.put(api_endpoint+'/'+this.props.match.params.id, category);
            new Noty ({
                theme: 'mint',
                text: 'Data updated successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/category');
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
            this.addCategory();
        }
        else {
            this.updateCategory();
        }

    };

    handleChange = (e) => {
        const category = {...this.state.category};
        category[e.currentTarget.name] = e.currentTarget.value;
        this.setState({category});
    };

    handleCheckbox = (e) => {
        console.log('checkbox', e.target.name, e.target.checked);
        const category={...this.state.category};
        category[e.target.name]=e.target.checked;
        this.setState({category})

    };

    render() {
        return (
            <div>
                <CategoryForm
                    action={this.state.action}
                    existingValue={this.state.category}
                    onInputChange={this.handleChange}
                    onCheck={this.handleCheckbox}
                    onSubmit={this.handleSubmit}
                />
            </div>
        );
    }
}


export default AddCategory;
