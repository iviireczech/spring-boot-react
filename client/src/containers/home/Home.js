import React from 'react';

import './Home.scss';

export default class Home extends React.Component {
    render() {

        const logoImage = require('./logo.png');

        return (
                <div className="banner">
                    <div className="logo">
                        <p>
                            <img src={logoImage}/>
                        </p>
                    </div>
                    <h1>
                        Spring Boot & React Starter Kit
                    </h1>
                </div>
        );

    }
}
