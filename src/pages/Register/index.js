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
            <div>
                <Input value={password} autoFocus="autofocus" onChange={(e) => this.setState({ password: e.target.value })}  type="password"></Input>
                <Input value={password2} onChange={(e) => this.setState({ password2: e.target.value })}  type="password"></Input>
                <Button onClick={this.handleClick}>登录</Button>
            </div>
        )
    }
}