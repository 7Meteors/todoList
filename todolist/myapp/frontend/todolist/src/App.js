import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {PageHeader, Navbar, Jumbotron, Button, Grid} from 'react-bootstrap';
import Home from './route/Home';
import TodoModal from './component/TodoModal/TodoModal';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false
        };
    }

    handleShow = () => {
        this.setState({showModal: true});
    };

    handleClose = () => {
        this.setState({showModal: false});
    };

    render() {
        return (
            <HashRouter>
                <Grid fluid={false}>
                    <PageHeader>
                        Todo List
                        <small>start now!</small>
                        <Button bsStyle="primary" style={{marginLeft: '10px'}} onClick={this.handleShow}>新建</Button>
                    </PageHeader>

                    <TodoModal show={this.state.showModal} onHide={this.handleClose}/>
                    <Switch>
                        <Route path="/list" component={Home}></Route>
                        <Route path="/liste" component={this.Liste}></Route>
                    </Switch>
                </Grid>
            </HashRouter>
        );
    }
}

export default App;
