import React from 'react';

const Nav = () => {
    return (
        <div className="pos-f-t nav-component">
            <div className="collapse" id="navbarToggleExternalContent">
                <div className="nav-expanded p-4">
                    <h5 className="h4">Collapsed content</h5>
                    <span className="text-muted">Toggleable via the navbar brand.</span>
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