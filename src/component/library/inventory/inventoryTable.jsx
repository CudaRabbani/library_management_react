import React, {Component} from 'react';
import axios from 'axios';
import TableHeader from "../../common/table/tableHeader";
import TableBody from "../../common/table/tableBody";
import {Link} from "react-router-dom";
import Noty from "noty";

class InventoryTable extends Component {

    state = {
        tableHeader: [
            {id: 0, label: '#'},
            {id: 1, label: 'Book Title'},
            {id: 2, label: 'Quantity In Hand'},
            {id: 3, label: 'Purchase Cost'},
            {id: 4, label: 'Rent Per Day'},
            {id: 5, label: 'Added On'},
            {id: 6, label: ''},
            {id: 7, label: ''},
        ],
        tableDataExtractor: [
            {id: 0, type: 'data', data: 'book.title'},
            {id: 1, type: 'data', data: 'qtyInHand'},
            {id: 2, type: 'data', data: 'cost'},
            {id: 3, type: 'data', data: 'rent_per_day'},
            {id: 4, type: 'data', data: 'added_on'},
            {id: 5, type: 'button',
                content: inventory => <button
                    className="btn btn-warning btn-md"
                    onClick={()=>this.handleEdit(inventory)}
                >Edit</button>
            },
            {id: 6, type: 'button',
                content: inventory => <button
                    className="btn btn-danger btn-md"
                    onClick={()=>this.handleDelete(inventory)}
                >Delete</button>
            }
        ],
        inventoryList: []
    };

    handleEdit = (inventory) => {
        this.props.history.push('/inventory/edit/'+inventory._id);
    };

    handleDelete = async(inventory) => {
        const beforeDelete = this.state.inventoryList;
        const newInvetoryList = beforeDelete.filter (i=>(i._id !== inventory._id));
        this.setState({inventoryList: newInvetoryList});
        try {
            const api = "http://localhost:4044/api/bookstatus/"+inventory._id;
            const {data} = await axios.delete(api);
            new Noty ({
                theme: 'mint',
                text: 'Successfully Deleted',
                type: "success",
                timeout: 4000
            }).show();
        }
        catch(ex) {
            this.setState({inventoryList:beforeDelete});
            const msg = ex.response || ex.request;
            new Noty ({
                theme: 'mint',
                text: msg,
                type: "error",
                timeout: 4000
            }).show();
        }
    };

    async getInventoryLists () {
        const api = "http://localhost:4044/api/bookstatus";
        try {
            const {data} = await axios.get(api);
            const inventoryList = data.map(d=>{
                const temp = {...d};
                const tempDate= new Date(temp.added_on);
                let month = tempDate.getMonth().toString().length < 2 ? '0'+(tempDate.getMonth()+1) : (tempDate.getMonth()+1);
                let date = tempDate.getDate().toString().length < 2 ? '0'+tempDate.getDate() : tempDate.getDate();
                temp['added_on'] = tempDate.getFullYear()+"/"+month+"/"+date;
                return temp;
            })
            this.setState({inventoryList});
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
        document.title="Inventory List";
        this.getInventoryLists();
    }

    render() {
        const {tableHeader, tableDataExtractor, inventoryList} = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                        <h2>Inventory List</h2>
                        <p></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-11">
                        <Link to="/inventory/new" className="btn btn-primary" style={{marginLeft: 20}}>Create New</Link>
                        <table className="table m-1">
                            <TableHeader headerText={tableHeader}/>
                            <TableBody tableData={inventoryList} tableDataExtractor={tableDataExtractor}/>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}


export default InventoryTable;
