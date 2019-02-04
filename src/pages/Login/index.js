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

                    
                {
                    title ? <Alert
                        message={title}
                        type="info"
                        closable
                        style={{width: '100%'}}
                    /> : null
                }
                <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
                    <div style={{width: 315,marginTop: 150}}>
                        <img src={logo || 'https://voice.ilegame.com.cn/gtav/img/logo1.png'} alt="" style={{marginBottom: 15}} />
                        <Input placeholder="请输入密码" value={password} autoFocus onChange={(e) => this.setState({ password: e.target.value })} type="password" onKeyDown={e => e.keyCode === 13 && this.handleClick()}></Input>
                        <Button type="primary" style={{width: '100%',marginTop: 15}} onClick={this.handleClick}>登录</Button>
                    </div>
                </div>
            </div>
        )
    }
}