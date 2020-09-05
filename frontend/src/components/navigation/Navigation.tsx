import './Navigation.scss';
import React, { FunctionComponent, ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

export const Navigation: FunctionComponent = (): ReactElement => (
    <div className="nav">
        <NavLink to="/" className="nav--link">
            Events List
        </NavLink>
        <NavLink to="/form" className="nav--link">
            Add new event
        </NavLink>
    </div>
);

