import React, { Component } from "react";
import { Table,Button } from 'antd';
export default class OnLineList extends Component {
    state = {
        dataSource: [],
        columns: [
            {title: 'ID',dataIndex: 'id',key: 'id'},
            {title: '玩家名字',dataIndex: 'player',key: 'player'},
            {title: '等级',dataIndex: 'level',key: 'level'},
            {title: '延迟',dataIndex: 'ping',key: 'ping'},
        ]
    }
    componentDidMount() {
        window._react.onLineList = this
    }
    _getTableData = (data) => {
        // data格式如下：
        // const data = [
        //     {id: 'xxx',player: 'player1',level: 100,ping: 60},
        // ]
        console.log(data)
        this.setState({
            dataSource: typeof data === 'string' ? JSON.parse(data) : data
        })
    }
    handleTest() {
        window.mp.trigger("DataFromClient","数据");
    }
    render() {
        const {dataSource,columns} = this.state

        return (
            <div>
                <Table dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        )
    }
}