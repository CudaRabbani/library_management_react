import React, {Component} from 'react';
import UserForm from "./userForm";
import UserInfo from "./userinfo";
import NotFound from "../common/notFound";
import {Route, Switch, Link, Redirect} from 'react-router-dom';
import UserPassword from "./userPassword";
class User extends Component {

    componentDidMount() {
        document.title="User Page";
    }

    render() {
        return (
            <div className="container">
            <div className="row">
                <div className="col"><h2 className="text-center">User Page</h2></div>
            </div>
                <div className="row m-2">
                    <div className="col">
                        <Switch>
                            <Route path="/users" exact component={UserInfo}/>
                            <Route path="/users/new" exact component={UserForm}/>
                            <Route path="/users/edit/:id" exact component={UserForm}/>
                            <Route path="/users/password" exact component={UserPassword}/>
                            <Redirect to="/notfound" exact component={NotFound}/>
                        </Switch>
                    </div>
                </div>

            </div>
        );
    }
}


export default User;
