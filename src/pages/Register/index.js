import React, { Component } from "react";
import { Input, Button } from 'antd'

export default class OnLineList extends Component {
    state = {
        password: '',
        password2: ''
    }
    handleClick = () => {
        const { password, password2 } = this.state
        window.mp.trigger("DataFromClient", JSON.stringify({
            action: 'registrAccount',
            payload: [password, password2]
        }));
    }
    render() {
        const { password, password2 } = this.state
        return (
            <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                <div style={{width: 200,marginTop: 200}}>
                    <Input placeholder="请输入密码" value={password} autoFocus="autofocus" onChange={(e) => this.setState({ password: e.target.value })}  type="password"></Input>
                    <Input placeholder="确认密码" style={{margin: '10px 0'}} value={password2} onChange={(e) => this.setState({ password2: e.target.value })}  type="password"></Input>
                    <Button style={{width: '100%'}} type="primary" onClick={this.handleClick}>注册</Button>
                </div>
            </div>
        )
    }
}