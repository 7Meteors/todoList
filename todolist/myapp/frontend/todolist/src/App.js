import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {PageHeader, Navbar, Jumbotron, Button, Grid} from 'react-bootstrap';
import Home from './route/Home';
import TodoModal from './component/TodoModal/TodoModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './stores/todolist'
import {Provider} from 'mobx-react'

class App extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModal: false,
            modalData: null
        };
    }

    handleShow = () => {
        this.setState({showModal: true, modalData: null});
    };

    handleClose = () => {
        this.setState({showModal: false, modalData: null});
    };
    openModalEdit = (item) => {
        this.setState({showModal: true, modalData: item});
    }

    render() {
        return (
            <Provider todolist={TodoList}>
                <HashRouter>
                    <Grid fluid={false}>
                        <PageHeader>
                            Todo List
                            <small>start now!</small>
                            <Button bsStyle="primary" style={{marginLeft: '10px'}} onClick={this.handleShow}>新建</Button>
                        </PageHeader>

                        <TodoModal show={this.state.showModal} onHide={this.handleClose}
                                   modalData={this.state.modalData}/>
                        <Switch>
                            <Route path="/list" render={() => <Home openModalEdit={this.openModalEdit}/>}></Route>
                        </Switch>
                    </Grid>
                </HashRouter>
            </Provider>
        );
    }
}

export default App;
