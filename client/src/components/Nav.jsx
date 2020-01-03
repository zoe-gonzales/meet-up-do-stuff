import React from 'react';
import { Link } from 'react-router-dom';
import loggedIn from '../loggedIn.json';
import loggedOut from '../loggedOut.json';

const Nav = ({ navType, id }) => {
    return (
        <div className="pos-f-t nav-component">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="nav-expanded p-4">
                    {
                        navType === "loggedIn" ? (
                            loggedIn.map(option => {
                                if (option.label === "Add Event") {
                                    return <Link className="text-muted" key={option.key} to={`/user/${id}${option.url}`}>{option.label}</Link>
                                } else {
                                    return <Link className="text-muted" key={option.key} to={option.url}>{option.label}</Link>
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