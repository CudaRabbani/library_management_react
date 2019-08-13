import React, {Component} from 'react';
import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";
import axios from "axios";
import Noty from 'noty';

const api_endpoint = "http://localhost:4044/api/category";


class CategoryTable extends Component {
    state={
        tableHeader: [
            {id: 0, label: '#'},
            {id: 1, label: 'Name'},
            {id: 2, label: 'Is Active'},
            {id: 3, label: ''},
            {id: 4, label: ''}
        ],
        tableDataExtractor: [
            {id: 0, type: 'data', data: 'name'},
            {id: 1, type: 'data', data: 'isActive'},
            {id: 2, type: 'button',
                content: category => <button
                    className="btn btn-warning btn-md"
                    onClick={()=>this.updateCategory(category)}
                >Edit</button>
            },
            {id: 3, type: 'button',
                content: category => <button
                    className="btn btn-danger btn-md"
                    onClick={()=>this.deleteCategory(category)}
                >Delete</button>
            }
        ],
        categories: [],
        errors:[]
    };

    updateCategory = (category) => {
        console.log('Update: ', category);
        this.props.history.push('/category/edit/'+category._id);
    };

    deleteCategory = async (category) => {
        const beforeDelete = this.state.categories;
        const categories = beforeDelete.filter (cat => cat !== category);
        this.setState({categories});
        try {
            const {data} = await axios.delete(api_endpoint+'/'+category._id);
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
        try {
            const {data} = await axios.get(api_endpoint);

            this.setState({categories: data});
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
                    tableData={this.state.categories}
                    tableDataExtractor={this.state.tableDataExtractor}
                />
            </table>
        );
    }
}


export default CategoryTable;

