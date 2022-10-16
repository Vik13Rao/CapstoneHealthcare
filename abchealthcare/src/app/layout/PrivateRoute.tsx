import { Component, ComponentType } from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
    component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
    roles?: string[];

}

export default function PrivateRoute({ component:Component,roles, ...rest }:Props) {
    const { user } = useAppSelector(state => state.account);
    return (
        <Route {...rest} render={props => {
            if (!user) {
                return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
            }

            if (roles && !roles?.some(r => user.roles?.includes(r))) {
                
                return <Redirect to={{ pathname: "/catalog" }} />
            }

            return <Component {...props} />
        }}
        />
    );
}