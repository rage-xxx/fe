import React, { Component } from "react";
import { Input, Button, Table } from 'antd'

export default class OnLineList extends Component {
    state = {
        saveMoney: '',
        fetchMoney: '',
        transName: '',
        transMoney: '',
        overage: 0,
        record: [],
        columns: [
            {title: '金额',dataIndex: 'amount',key: 'amount'},
            {title: '时间',dataIndex: 'time',key: 'time'},
            {title: '详情',dataIndex: 'oname',key: 'oname'},
        ]
    }
    componentDidMount() {
        window._react.bank = this
        const menus = ['存款', '取款', '转账', '交易记录']
        this.props.setMenus(menus)
        this.props.setCurrMenu(menus[0])
    }
    _getOverage = (overage) => {
        this.setState({
            overage: overage
        })
    }
    _getRecord = (data) => {
        console.log(data)
        const record = JSON.parse(data)
        console.log(record)
        // const record = data
        record.forEach((v,idx) => {
            v.key = idx
        })
        this.setState({
            record: data,
        })
    }
    handleOper(type) {
        const { fetchMoney, saveMoney, transMoney, transName } = this.state
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
        window.mp.trigger("DataFromClient", JSON.stringify({
            action: 'executeBankOperation',
            payload
        }));
    }
    render() {
        const { currMenu } = this.props
        const { saveMoney, overage, fetchMoney, transMoney, transName ,record,columns} = this.state
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
            ),
            '交易记录': (
                <Table dataSource={record} columns={columns}  pagination={false}></Table>
            )
        }
        return (
            <div>
                <div style={{  width: '100%' }}>
                    {
                        rightMap[currMenu]
                    }
                </div>
                <div>
                    余额：  {overage}
                </div>
            </div>

        )
    }
}