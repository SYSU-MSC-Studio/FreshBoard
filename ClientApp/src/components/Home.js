import React, { Component } from 'react';
import * as Dom from 'react-router-dom';
import { Jumbotron, TabPane, Button, Container, Modal, ModalBody, ModalHeader, ModalFooter, Nav, NavItem, NavLink, TabContent, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Register } from './Account/Register';
import { Login } from './Account/Login';

export class Home extends Component {
    displayName = Home.name
    constructor(props) {
        super(props);

        this.toggleLogin = this.toggleLogin.bind(this);
        this.state = {
            loginShown: false,
            activeTab: '1'
        };

        this.switchTab = this.switchTab.bind(this);
    }

    toggleLogin() {
        this.setState({
            loginShown: !this.state.loginShown
        });
    }

    switchTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        let loginPortal = this.props.user == null ? null :
            this.props.user.isSignedIn
                ?
                <Dom.NavLink to={'/Portal'}>
                    <Button color="primary">进入账户</Button>
                </Dom.NavLink>
                : <Button color="primary" onClick={this.toggleLogin}>立即上车</Button>;
        return (
            <div>
                <Jumbotron>
                    <Container>
                        <h2 className="display-3">欢迎上车！</h2>
                        <p className="lead">这里是中山大学微软学生俱乐部 —— 中山大学最 cool 的社团</p>
                        <hr />
                        <p>2018 的小朋友们，策划部、媒传部、技术部等你来加入</p>

                        {loginPortal}
                    </Container>
                </Jumbotron>

                <Modal isOpen={this.state.loginShown} toggle={this.toggleLogin} className={this.props.className}>
                    <ModalHeader toggle={this.toggleLogin}>加入 MSC！</ModalHeader>
                    <ModalBody>
                        <p>注册 MSC Freshman 账号可以方便的申请入部、查看面试状态、查看录取结果以及收取相关通知</p>
                        <div>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.switchTab('1'); }}
                                        href='#'
                                    >
                                        登录
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.switchTab('2'); }}
                                        href='#'
                                    >
                                        注册
                                </NavLink>
                                </NavItem>
                            </Nav>
                            <br />
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">
                                    <Row>
                                        <Col sm="12">
                                            <Login />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2">
                                    <Row>
                                        <Col sm="12">
                                            <Register />
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <p>SYSU MSC Freshman Account</p>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
