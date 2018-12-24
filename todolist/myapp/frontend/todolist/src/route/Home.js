import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Table, Button} from 'react-bootstrap';
import axios from 'axios';

class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            todoItems: []
        };
    }

    componentWillMount() {
        // this.state.todoItems.push({
        //     id: '23',
        //     owner: 'zzh',
        //     title: 'zzh_test',
        //     content: 'zzhzzhzzhzzhzzhzzhzzhzzhzzhzzh',
        //     status: 'zzh',
        //     starttime: 'zzh',
        //     endtime: 'zzh',
        //     deadline: 'zzh',
        //     priority: 'zzh',
        // })

        axios.get('http://127.0.0.1:8089/api/list')
            .then(function (response) {
                console.log(response);
                // this.setState({
                //     users: response.data,
                //     isLoaded: true
                // });
            })
            .catch(function (error) {
                console.log(error);
                // this.setState({
                //     isLoaded: false,
                //     error: error
                // })
            })
    }


    render() {
        return (
            <div>
                <Table striped bordered condensed hover style={{fontSize: "14px"}}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>优先级</th>
                        <th>标题</th>
                        <th>内容</th>
                        <th>状态</th>
                        <th>创建时间</th>
                        <th>Deadline</th>
                        <th>结束时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.todoItems.map(function (item) {
                            return <tr>
                                <td>{item.id}</td>
                                <td>{item.priority}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.status}</td>
                                <td>{item.starttime}</td>
                                <td>{item.deadline}</td>
                                <td>{item.endtime}</td>
                                <td><Button bsSize="xsmall">删除</Button></td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Home;
