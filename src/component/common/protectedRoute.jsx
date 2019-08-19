import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {CurrentUser} from "../../util/currentUser";

const ProtectedRoute = (props) => {
    const {path, component: Component, render, ...rest} = props;
    const user = CurrentUser();
    return (
        <Route
            {...rest}
            render=
                { props =>
                    {
                        if (!user) return <Redirect to="/login" />
                        else return Component ? <Component {...props} /> : render(props);
                    }
                }
        />
    );
};

export default ProtectedRoute;
