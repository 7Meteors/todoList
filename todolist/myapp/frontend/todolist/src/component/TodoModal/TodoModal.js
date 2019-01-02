import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {
    Modal,
    Button,
    FormGroup,
    Radio,
    FormControl,
    ControlLabel,
    HelpBlock,
    Row,
    Col,
    Grid,
    Clearfix
} from 'react-bootstrap';
import {inject} from 'mobx-react';

@inject('todolist')
class TodoModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            isEdit: false,
            data: null
        };
    }

    handleSubmit = () => {
        this.setState({submitting: true});
        if (this.state.isEdit) {
            this.props.todolist.patchTodoItem({
                id: this.state.data.id,
                title: this.title.value,
                content: this.content.value,
                priority: this.priority.value,
                deadline: this.deadline.value
            }, () => {
                this.clearModal();
                this.props.onHide();
            });
        } else {
            this.props.todolist.addNewTodo({
                title: this.title.value,
                content: this.content.value,
                priority: this.priority.value,
                deadline: this.deadline.value
            }, () => {
                this.clearModal();
                this.props.onHide();
            });
        }
    };

    clearModal = () => {
        this.title.value = null;
        this.content.value = null;
        this.priority.value = null;
        this.deadline.value = null;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.modalData) {
            let item = nextProps.modalData;
            const _this = this;
            _this.setState({
                isEdit: true,
                data: item
            });
        }
    }

    render() {
        function FieldGroup({id, label, help, ...props}) {
            return (
                <FormGroup controlId={id}>
                    <Clearfix>
                        <Col xs={3} md={2}>
                            <ControlLabel style={{
                                textAlign: 'right',
                                width: '100%',
                                paddingTop: "7px"
                            }}>{label}：</ControlLabel>
                        </Col>
                        <Col xs={8} md={8}>
                            <FormControl {...props}/>
                            {help && <HelpBlock>{help}</HelpBlock>}
                        </Col>
                    </Clearfix>
                </FormGroup>
            );
        }

        const {data} = this.state;
        console.log(data);
        const formInstance = (
            <Grid fluid={true}>
                <form>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="标题"
                        placeholder="Enter Title"
                        defaultValue={data && data.title || null}
                        inputRef={(ref) => this.title = ref}
                    />
                    <FieldGroup
                        id="formControlsEmail"
                        type="textarea"
                        label="内容"
                        placeholder="Enter Content"
                        componentClass="textarea"
                        defaultValue={data && data.content || null}
                        inputRef={(ref) => this.content = ref}
                    />
                    <FormGroup controlId='formControlsPriority'>
                        <Clearfix>
                            <Col xs={3} md={2}>
                                <ControlLabel style={{
                                    textAlign: 'right',
                                    width: '100%',
                                    paddingTop: "7px"
                                }}>优先级：</ControlLabel>
                            </Col>
                            <Col xs={8} md={8}>
                                <FormControl componentClass="select" placeholder="选择优先级"
                                             defaultValue={data && data.priority || null}
                                             inputRef={(ref) => this.priority = ref}>
                                    <option value={1}>极高</option>
                                    <option value={2}>高</option>
                                    <option value={3}>正常</option>
                                    <option value={4}>低</option>
                                    <option value={5}>极低</option>
                                </FormControl>
                            </Col>
                        </Clearfix>
                    </FormGroup>
                    <FieldGroup
                        id="time"
                        type="date"
                        label="Dead Line"
                        placeholder=""
                        defaultValue={data && data.deadline || null}
                        inputRef={(ref) => this.deadline = ref}
                    />
                </form>
            </Grid>

        );

        return (
            <Modal {...this.props} bsSize='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Add A Todo Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {formInstance}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                    <Button type="submit" bsStyle="primary" onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
            ;
    }
}

export default TodoModal;
