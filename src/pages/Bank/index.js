import React, { Component } from "react";
import { Input, Button } from 'antd'

export default class OnLineList extends Component {
    state = {
        saveMoney: '',
        fetchMoney: '',
        transName: '',
        transMoney: ''
    }
    componentDidMount() {
        window._react.bank = this
        const menus = ['存款', '取款', '转账','交易记录']
        this.props.setMenus(menus)
        this.props.setCurrMenu(menus[0])
    }
    handleSave = () => {
        window.mp.trigger("DataFromClient", {
            action: 'executeBankOperation',
            payload: [this.state.saveMoney]
        });
    }
    handleOper(type) {
        const { fetchMoney, saveMoney, transMoney, transName } = this
        let payload = []
        if (type === 1) {
            payload = [1, saveMoney]
        }
        if (type === 2) {
            payload = [2, fetchMoney]
        }
        if (type === 3) {
            payload = [3, transMoney, transName]
        }
        window.mp.trigger("DataFromClient", {
            action: 'executeBankOperation',
            payload
        });
    }
    render() {
        const { currMenu } = this.props
        const { saveMoney, fetchMoney, transMoney, transName } = this.state
        const rightMap = {
            '存款': (
                <div>
                    存款金额<Input value={saveMoney} onChange={(e) => this.setState({ saveMoney: e.target.value })}></Input>
                    <Button onClick={this.handleOper.bind(this, 1)}>存款</Button>
                </div>
            ),
            '取款': (
                <div>
                    取款金额<Input value={fetchMoney} onChange={(e) => this.setState({ fetchMoney: e.target.value })}></Input>
                    <Button onClick={this.handleOper.bind(this, 2)}>取款</Button>
                </div>
            ),
            '转账': (
                <div>
                    转账人<Input value={transName} onChange={(e) => this.setState({ transName: e.target.value })}></Input>
                    转账金额<Input value={transMoney} onChange={(e) => this.setState({ transMoney: e.target.value })}></Input>
                    <Button onClick={this.handleOper.bind(this, 3)}>转账</Button>
                </div>
            )
        }
        return (
            <div style={{ display: 'flex', width: '100%' }}>
                {
                    rightMap[currMenu]
                }
            </div>
        )
    }
}