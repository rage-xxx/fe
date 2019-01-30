import React, { Component } from "react";
import { Input, Button, Alert } from 'antd'

export default class OnLineList extends Component {
    state = {
        password: '',
        title: '',
        logo: ''
    }
    componentDidMount() {
        window._react.login = this
    }
    _getAlert(text) {
        this.setState({
            title: text
        })
    }
    _getLogo(url) {
        this.setState({
            logo: url
        })
    }
    handleClick = () => {
        const { password } = this.state
        window.mp.trigger("DataFromClient", JSON.stringify({
            action: 'loginAccount',
            payload: [password]
        }));
    }
    render() {
        const { password, title,logo } = this.state
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <img src={logo} alt="" width="100" height="100" />
                    {
                        title ? <Alert
                            message={title}
                            type="info"
                            closable
                        /> : null
                    }
                </div>
                <Input value={password} onChange={(e) => this.setState({ password: e.target.value })} type="password" onKeyDown={e => e.keyCode === 13 && this.handleClick()}></Input>
                <Button onClick={this.handleClick}>登录</Button>
            </div>
        )
    }
}