import React, { Component } from "react";
import { InputNumber, Button, Popover, Modal, Card ,Icon} from 'antd'

const { Meta } = Card;

// const example = [, { id: 5002, hash: "3602873787", description: "三明治", type: 0, amount: 10, intro: "使用后缓解饥饿", url: "https://voice.ilegame.com.cn/gtav/img/inventory/3602873787.png", name: "三明治" }]
const example = new Array(15).fill({ id: 2895, hash: "1020618269", description: "可乐", type: 0, amount: 11, intro: "使用后缓解口渴", url: "https://voice.ilegame.com.cn/gtav/img/inventory/1020618269.png", name: "可乐" })
export default class Bag extends Component {
    state = {
        payload: '',
        currOper: '',
        currItem: '',
        currMax: 0,
        currNum: 1,
        showModal: false,
        list: []
    }
    componentDidMount() {
        window._react.bag = this
        this._getList()
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
            case '丢弃':
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
        const { showModal, list, currMax, currNum } = this.state

        return (
            <div style={{height: '100%',paddingTop: 40}}>
                {/* <ul style={{ display: 'flex' }}>
                    {
                        list.map(v => (
                            <li key={v.id} style={{width: '50%'}}>
                                <Popover
                                    content={(
                                        <div>
                                            {
                                                [{ label: '使用', type: 'primary' }, { label: '丢弃', type: '' }, { label: '删除', type: 'danger' }].map(b =>
                                                    <Button key={b.label} style={{ marginRight: 15 }} size="small" type={b.type} onClick={this.onclick.bind(this, b.label, v)}>
                                                        {b.label}
                                                    </Button>
                                                )
                                            }
                                        </div>
                                    )}
                                    title="请选择操作"
                                    
                                    placement="right"
                                >
                                    <div style={{ width: 200, border: '1px solid #ddd', background: 'rgba(0,0,0,0.8)', color: '#fff' }} >
                                        <img src={v.url} alt="" />
                                        <span>
                                            {v.name} (×{v.amount})
                                    </span>
                                        <p>
                                            {v.intro}
                                        </p>
                                    </div>
                                </Popover>
                            </li>
                        ))
                    }
                </ul> */}
                <div style={{display: 'flex',flexWrap: 'wrap',overflow: 'auto',height: '100%' }}>
                    {
                        list.map(v => (
                            <Card
                                key={v.id}
                                style={{ width: 200,margin: 15}}
                                cover={
                                    <div style={{height: 150,background: 'rgba(0,0,0,0.8)',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                                        <img alt="example" src={v.url} style={{width: '50%'}} />
                                    </div>
                                }
                                actions={
                                    [{ label: '使用', type: 'primary' }, { label: '丢弃', type: '' }, { label: '删除', type: 'danger' }].map(b =>
                                        <span key={b.label}  size="small" type={b.type} onClick={this.onclick.bind(this, b.label, v)}>
                                            {b.label}
                                        </span>
                                    )
                                }
                            >
                                <Meta
                                    title={ `${v.name}(×${v.amount})` }
                                    description={v.intro}
                                />
                            </Card>
                        ))
                    }
                </div>

                <Modal
                    zIndex={2000}
                    title="请选择数量"
                    visible={showModal}
                    cancelText="取消"
                    okText="确定"
                    width="300px"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <InputNumber min={1} max={currMax} autoFocus value={currNum} onChange={this.onChange} />
                </Modal>
            </div>
        )
    }
}