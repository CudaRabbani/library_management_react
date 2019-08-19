import React from 'react';
import User from "../user/user";
import {Redirect, Route} from "react-router-dom";
import {CurrentUser} from "../../util/currentUser";

const AdminRoute = (props) => {
    const {path, component:Component, render} = props;
    const user = CurrentUser();
    return (
        <Route
            render=
                { props =>
                {
                    if (user.role !== 'admin') return <Redirect to="/unauthorized" />
                    else return Component ? <Component {...props} /> : render(props);
                }
                }
        />
    );
};

export default AdminRoute;
