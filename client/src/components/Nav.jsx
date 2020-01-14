import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import loggedIn from '../loggedIn.json';
import loggedOut from '../loggedOut.json';
import API from '../utils/API';
import UseRedirectLocally from '../hooks/UseRedirectLocally';

const Nav = ({ navType, id }) => {
    const {
        redirect,
        redirectPage,
    } = UseRedirectLocally();

    const logOut = () => {
        API
          .logOutUser()
          .then(res => {
            if (res.status === 200) redirectPage()
          })
          .catch(err => console.log(err))
    }

    return (
        <div className="pos-f-t nav-component">
            {redirect ? <Redirect to="/loggedout" /> : null}
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="nav-expanded p-4">
                    {
                        navType === "loggedIn" ? (
                            loggedIn.map(option => {
                                switch(option.label) {
                                    case "Add Event":
                                        return <Link className="text-muted" key={option.key} to={`/user/${id}${option.url}`}>{option.label}</Link>;
                                    case "My Profile":
                                    case "My Events":
                                        return <Link className="text-muted" key={option.key} to={`/user/${id}${option.url}`}>{option.label}</Link>;
                                    case "Home":
                                        return <Link className="text-muted" key={option.key} to={`${option.url}${id}`}>{option.label}</Link>;
                                    case "My RSVPs":
                                        return <Link className="text-muted" key={option.key} to={`/user/${id}${option.url}`}>{option.label}</Link>;
                                    case "Log Out":
                                        return <button className="text-muted" key={option.key} onClick={logOut}>{option.label}</button>;
                                    default:
                                        return <Link className="text-muted" key={option.key} to={option.url}>{option.label}</Link>;
                                }
                            })
                        ) : (
                            loggedOut.map(option => <Link className="text-muted" key={option.key} to={option.url}>{option.label}</Link>)
                        )
                    }
                </div>
            </div>
            <nav className="navbar navbar-light justify-content-end">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </div>
    )
}

export default Nav;