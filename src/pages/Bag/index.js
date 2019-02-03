import React, { Component } from "react";
import { InputNumber, Button, Popover, Modal } from 'antd'

export default class Bag extends Component {
    state = {
        payload: '',
        currOper: '',
        currItem: '',
        currMax: 0,
        currNum: 0,
        showModal: false,
        list: []
    }
    componentDidMount() {
        window._react.bag = this
    }
    _getList(arr) {
        this.setState({
            list: JSON.parse(arr),
            // list: arr,
        })
    }
    confirm() {
        const { currOper, payload } = this.state
        console.log({
            action: currOper,
            payload
        })
        window.mp.trigger("DataFromClient", JSON.stringify({
            action: currOper,
            payload
        }));
    }
    onclick(btn, { name, amount }) {
        switch (btn) {
            case '使用':
                this.setState({ currOper: 'UseItem', showModal: true, currItem: name, currMax: amount })
                break;
            case '废弃':
                this.setState({ currOper: 'DropItem', showModal: true, currItem: name, currMax: amount })
                break;
            case '删除':
                this.setState({ currOper: 'RemoveItem', payload: [name] }, () => { this.confirm() })
                break;
        }
    }
    onChange = (value) => {
        this.setState({
            currNum: value
        })
    }
    handleOk = () => {
        const { currNum, currItem } = this.state
        this.setState({
            payload: [currItem, currNum],
            showModal: false,
            currNum: 0
        }, () => {
            this.confirm()
        })
    }
    handleCancel = () => {
        this.setState({
            showModal: false,
            currNum: 0
        })
    }
    render() {
        const { showModal, list, currMax } = this.state

        return (
            <div>
                <ul style={{ display: 'flex', flexDirection: 'column' }}>
                    {
                        list.map(v => (
                            <Popover content={(
                                <div>
                                    {['使用', '废弃', '删除'].map(b => <Button key={b} onClick={this.onclick.bind(this, b, v)}>{b}</Button>)}
                                </div>
                            )} title="请选择操作" key={v} placement="right">
                                <li style={{ width: 200, border: '1px solid #ddd' }} key={v.id}>
                                    <img src={v.url} alt=""  />
                                    <span>
                                        {v.name} (×{v.amount})
                                    </span>
                                    <p>
                                        {v.description}
                                    </p>
                                    <p>
                                        {v.intro}
                                    </p>
                                </li>
                            </Popover>
                        ))
                    }
                </ul>

                <Modal
                    zIndex={2000}
                    title="请选择数量"
                    visible={showModal}
                    cancelText="取消"
                    okText="确定"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <InputNumber min={1} max={currMax} defaultValue={1} onChange={this.onChange} />
                </Modal>
            </div>
        )
    }
}