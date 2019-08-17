import React, {Component} from 'react';

import axios from 'axios';
import _ from 'lodash';
import TableHeader from "../common/table/tableHeader";
import TableBody from "../common/table/tableBody";
import {Link} from "react-router-dom";
import Noty from "noty";
import ListGroup from "../common/listgroup";

class UserInfo extends Component {

    state = {
        tableHeader : [
            {id: 0, label: '#'},
            {id: 1, label: 'First Name'},
            {id: 2, label: 'Last Name'},
            {id: 3, label: 'Email'},
            {id: 4, label: 'Role'},
            {id: 6, label:''},
            {id: 7, label:''}
        ],
        tableDataExtractor: [
            {id: 1, type: 'data', data: 'userinfo.fname'},
            {id: 2, type: 'data', data: 'userinfo.lname'},
            {id: 3, type: 'data', data: 'email'},
            {id: 4, type: 'data', data: 'role'},
//            {id: 5, type: 'data', data: 'activatedOn'},
            {id: 6, type: 'button',
                content: user => <button
                    className="btn btn-warning btn-md"
                    onClick={()=>this.updateUser(user)}
                >Edit</button>
            },
            {id: 7, type: 'button',
                content: user => <button
                    className="btn btn-danger btn-md"
                    onClick={()=>this.deleteUser(user)}
                >Delete</button>
            }
        ],
        userinfo: [],
        userCategory:[],
        infoDisplayed: []
    };

    updateUser = (user) => {
        console.log('update user');
        this.props.history.push('/users/edit/'+user.userinfo._id);
    };
    deleteUser = async (user) => {
        console.log('delete user');
        const beforeDelete = this.state.infoDisplayed;
        const afterDelete =  beforeDelete.filter(u=> u._id !== user._id);
        this.setState({infoDisplayed: afterDelete});

        try {
            const {data} = await axios.delete("http://localhost:4044/api/user/"+user._id);
            new Noty ({
                theme: 'mint',
                text: 'Data Deleted successfully',
                type: "success",
                timeout: 4000
            }).show();
            this.props.history.push('/users');
        }
        catch(ex) {
            this.setState({userinfo:beforeDelete});
            new Noty ({
                theme: 'mint',
                text: ex.response,
                type: "error",
                timeout: 4000
            }).show();
        }
    };

    userCategories = [
        {_id: 0, name: "All Users"},
        {_id: 1, name: "Active"},
        {_id: 2, name: "Inactive"}
    ];

    async componentDidMount() {
        const userinfo_endpoint = "http://localhost:4044/api/user";
        const {data} = await axios.get(userinfo_endpoint);
        const userinfo = data.map(d=> {
            let temp = {...d};
            temp['activatedOn']=new Date(temp.activatedOn).toDateString();
            return temp;
        });
        this.setState({userinfo});
        this.setState({infoDisplayed:userinfo});
        this.setState({userCategory: this.userCategories[0]});
    }

    getSelectedCategoryUser(category) {
        const users = this.state.userinfo;
        if (category === 'all') {
            this.setState({infoDisplayed:users});
        }
        else if (category === 'true') {
            const activeUsers = users.filter (user=> user.userinfo.isActive ? user : null);
            this.setState({infoDisplayed:activeUsers});
        }
        else {
            const inactiveUsers = users.filter (user=> !user.userinfo.isActive ? user : null);
            this.setState({infoDisplayed:inactiveUsers});
        }
    }

    handleUserCategory = (item) => {
        let category = '';
        if (item.name === "Active") {
            category = 'true';
        }
        else if (item.name === "Inactive") {
            category = 'false';
        }
        else {
            category = 'all';
        }
        this.setState({userCategory: item});
        this.getSelectedCategoryUser(category);
    }

    render() {
        const {infoDisplayed, tableHeader, tableDataExtractor, userCategory} = this.state;
        return (
           <div className="row">
               <div className="col-sm-2">
                   <ListGroup listItems={this.userCategories}
                              selectedItem={userCategory}
                              onSelect={this.handleUserCategory}
                   />
               </div>
               <div className="col">
                   <Link
                       to="/users/new"
                       className="btn btn-primary"
                   >Create New</Link>
                   <table className="table m-1">
                       <TableHeader headerText={tableHeader}/>
                       <TableBody
                           tableData={infoDisplayed}
                           tableDataExtractor={tableDataExtractor}
                       />
                   </table>
               </div>
           </div>
        );
    }
}


export default UserInfo;
