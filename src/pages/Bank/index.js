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
        const menus = [{
            label: '存款',
            icon: 'rise'
        }, {
            label: '取款',
            icon: 'fall'
        }, {
            label: '转账',
            icon: 'sync'
        }, {
            label: '交易记录',
            icon: 'ordered-list'
        }]
        this.props.setMenus(menus)
        this.props.setCurrMenu(menus[0])
    }
    _getOverage = (overage) => {
        this.setState({
            overage: overage
        })
    }
    _getRecord = (data) => {
        const record = JSON.parse(data)
        // const record = [{"amount":123,"time":"2019/1/18 23:44:12","oname":"存款 收款方:cyuancai"},{"amount":5000,"time":"2019/1/12 16:00:44","oname":"存款 收款方:cyuancai"},{"amount":500,"time":"2018/12/28 23:41:04","oname":"存款 收款方:cyuancai"},{"amount":500,"time":"2018/12/27 00:56:10","oname":"存款 收款方:cyuancai"},{"amount":500,"time":"2018/12/27 00:53:47","oname":"存款 收款方:cyuancai"},{"amount":500,"time":"2018/12/27 00:52:16","oname":"存款 收款方:cyuancai"},{"amount":5000,"time":"2018/12/27 00:50:04","oname":"存款 收款方:cyuancai"},{"amount":50000,"time":"2018/12/27 00:47:16","oname":"存款 收款方:cyuancai"},{"amount":5000,"time":"2018/12/27 00:45:44","oname":"存款 收款方:cyuancai"},{"amount":5000,"time":"2018/12/27 00:39:55","oname":"存款 收款方:cyuancai"},{"amount":100000,"time":"2018/11/18 16:32:38","oname":"取款 收款方:cyuancai"},{"amount":1000,"time":"2018/11/18 00:31:09","oname":"取款 收款方:cyuancai"},{"amount":3067037,"time":"2018/11/11 15:08:20","oname":"存款 收款方:ATM"},{"amount":1000,"time":"2018/11/11 15:08:13","oname":"取款 收款方:cyuancai"},{"amount":9990000,"time":"2018/10/13 15:07:53","oname":"取款 收款方:cyuancai"},{"amount":9018681,"time":"2018/10/13 15:06:53","oname":"存款 收款方:ATM"}]
        record.forEach((v,idx) => {
            v.key = idx
        })
        this.setState({
            record,
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
                    存款金额<Input value={saveMoney} onChange={(e) => this.setState({ saveMoney: e.target.value })} type="number"></Input>
                    <Button onClick={this.handleOper.bind(this, 1)}>存款</Button>
                </div>
            ),
            '取款': (
                <div>
                    取款金额<Input value={fetchMoney} onChange={(e) => this.setState({ fetchMoney: e.target.value })} type="number"></Input>
                    <Button onClick={this.handleOper.bind(this, 2)}>取款</Button>
                </div>
            ),
            '转账': (
                <div>
                    收款人<Input value={transName} onChange={(e) =>  (/^[a-zA-Z]+$/.test(e.target.value) || e.target.value === '') && this.setState({ transName: e.target.value })}></Input>
                    转账金额<Input value={transMoney} onChange={(e) => this.setState({ transMoney: e.target.value })} type="number"></Input>
                    <Button onClick={this.handleOper.bind(this, 3)}>转账</Button>
                </div>
            ),
            '交易记录': (
                <Table dataSource={record} columns={columns}  pagination={false} scroll={{ y: '60vh' }}></Table>
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