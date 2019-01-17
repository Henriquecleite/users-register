import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header/Header';
import List from './containers/List/List';
import Register from './containers/Register/Register';
import PicRegister from './containers/PicRegister/PicRegister';
import classes from './App.css';

export class App extends Component {

    render() {
        let screen = null;
        
        if (this.props.screen === 'list') {
            screen = <List />;
        } else if (this.props.screen === 'register') {
            screen = <Register />;
        } else if (this.props.screen === 'pic-register') {
            screen = <PicRegister />;
        }

        return (
            <div className={classes.App}>
                <Header />
                {screen}
            </div>            
        );
    }
}

const mapStateToProps = state => {
    return {
        screen: state.screen,
    }
}

export default connect(mapStateToProps)(App);
