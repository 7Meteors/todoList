import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {Table, Button} from 'react-bootstrap';
import {observer, inject} from 'mobx-react';

@inject('todolist')
@observer
class Home extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            todoItems: []
        };
    }

    componentWillMount() {
        this.props.todolist.fetchList();
    }

    render() {
        function getNowFormatDate() {
            let date = new Date();
            let seperator1 = "-";
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            return currentdate;
        }

        const {todolist, openModalEdit} = this.props;
        return (
            <div>
                <div style={{marginBottom: '10px'}}>排序：
                    <Button style={{marginLeft: '10px'}}
                            onClick={() => todolist.fetchList(1, 'starttime')}>创建时间</Button>
                    <Button style={{marginLeft: '10px'}}
                            onClick={() => todolist.fetchList(1, 'deadline')}>deadline</Button>
                </div>
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
                        todolist.list.map(function (item) {
                            return <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{{1: '极高', 2: '高', 3: '普通', 4: '低', 5: '极低'}[item.priority]}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.status ? '已完成' : '未完成'}</td>
                                <td>{item.starttime}</td>
                                <td>{item.deadline}</td>
                                <td>{item.endtime}</td>
                                <td>
                                    {item.status || <Button bsSize="xsmall" style={{marginRight: '5px'}}
                                                            onClick={() => openModalEdit({...item})}>编辑</Button>}
                                    {item.status ||
                                    <Button bsSize="xsmall" bsStyle="primary" style={{marginRight: '5px'}}
                                            onClick={() => todolist.patchTodoItem({
                                                id: item.id,
                                                status: true,
                                                endtime: getNowFormatDate()
                                            })}>完成</Button>}
                                    <Button bsSize="xsmall" bsStyle="danger"
                                            onClick={() => todolist.deleteTodoItem({
                                                id: item.id
                                            })}>删除</Button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </Table>

                <div style={{textAlign: 'right'}}>
                    {todolist.prev &&
                    <Button bsStyle="link" onClick={() => todolist.fetchList(todolist.prev)}>←Prev</Button>}
                    {todolist.next &&
                    <Button bsStyle="link" onClick={() => todolist.fetchList(todolist.next)}>Next→</Button>}
                </div>
            </div>
        );
    }
}

export default Home;
