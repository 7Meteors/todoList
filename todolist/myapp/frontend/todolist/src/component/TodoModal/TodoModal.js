import React, {Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {
    Modal,
    Button,
    FormGroup,
    Checkbox,
    Radio,
    FormControl,
    ControlLabel,
    HelpBlock,
    Row,
    Col,
    Grid,
    Clearfix
} from 'react-bootstrap';
import axios from 'axios';

class TodoModal extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            submitting: false
        };
    }

    componentWillMount() {

    }

    handleSubmit = () => {
        this.setState({submitting: true});
        axios.post('localhost:8089/api/addItem', {})
            .then(function (response) {
                console.log(response);
                // this.setState({
                //     users: response.data,
                //     isLoaded: true
                // });
            })
            .catch(function (error) {
                console.log(error);
                this.setState({
                    isLoaded: false,
                    error: error
                })
            })
    }

    render() {

        function FieldGroup({id, label, help, ...props}) {
            return (
                <Row>
                    <FormGroup controlId={id}>
                        <Clearfix>
                            <Col xs={3} md={2}>
                                <ControlLabel style={{textAlign: 'right', width: '100%'}}>{label}：</ControlLabel>
                            </Col>
                            <Col xs={8} md={8}>
                                <FormControl {...props} />
                                {help && <HelpBlock>{help}</HelpBlock>}
                            </Col>
                        </Clearfix>
                    </FormGroup>
                </Row>
            );
        }

        const formInstance = (
            <Grid fluid={true}>
                <form>
                    <FieldGroup
                        id="formControlsText"
                        type="text"
                        label="标题"
                        placeholder="Enter text"
                    />
                    <FieldGroup
                        id="formControlsEmail"
                        type="email"
                        label="内容"
                        placeholder="Enter email"
                        componentClass="textarea"
                    />
                    <Row>
                        <FormGroup>
                            <Clearfix>
                                <Col xs={3} md={2}>
                                    <ControlLabel style={{textAlign: 'right', width: '100%'}}>优先级：</ControlLabel>
                                </Col>
                                <Col xs={8} md={8}>
                                    <Radio name="radioGroup" inline>
                                        极高
                                    </Radio>{' '}
                                    <Radio name="radioGroup" inline>
                                        高
                                    </Radio>{' '}
                                    <Radio name="radioGroup" inline>
                                        中
                                    </Radio>{' '}
                                    <Radio name="radioGroup" inline>
                                        低
                                    </Radio>{' '}
                                    <Radio name="radioGroup" inline>
                                        极低
                                    </Radio>
                                </Col>
                            </Clearfix>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Clearfix>
                                <Col xs={3} md={2}>
                                    <ControlLabel style={{textAlign: 'right', width: '100%'}}>Deadline：</ControlLabel>
                                </Col>
                                <Col xs={8} md={8}>

                                </Col>
                            </Clearfix>
                        </FormGroup>
                    </Row>
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
                    <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>
        )
            ;
    }
}

export default TodoModal;
