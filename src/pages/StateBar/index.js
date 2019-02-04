import React, { Component } from "react";
import { Progress,Slider,Icon } from 'antd'

export default class StateBar extends Component {
    state = {
        water: 20,
        food: 30,
        money: 0,
        time: ''
    }
    componentDidMount() {
        window._react.stateBar = this
        setInterval(() => {
            const d = new Date()
            const time = d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
            this.setState({
                time
            })
        },1000)
    }
    _getStateBarData(water,food,money) {
        this.setState({
            water: +water,
            food: +food,
            money: +money
        })
    }
    render() {
        const {water,food,money,time} = this.state
        return (
            <div style={{position: 'fixed',bottom: 50,left: 250,width: 230,color: '#fff',background: 'rgba(0,0,0,0.7)',padding: '10px 20px'}}>
                {/* <div style={{display: 'flex',alignItems: 'center'}}> <Icon style={{marginRight: 10}} type="sound" />  <Slider style={{width: 130}} value={vol} onChange={this.changeVol} /></div> */}
                <div style={{display: 'flex',alignItems: 'center',marginBottom: 8}}> <Icon style={{marginRight: 10}} type="coffee" />  <Progress size="small" percent={water} status="active" strokeColor="#f5222d" showInfo={false} /></div>
                <div style={{display: 'flex',alignItems: 'center',marginBottom: 8}}> <Icon style={{marginRight: 10}} type="thunderbolt" />  <Progress size="small" percent={food} status="active" showInfo={false} /></div>
                <div style={{display: 'flex',alignItems: 'center',marginBottom: 8}}> <Icon style={{marginRight: 10}} type="dollar" /> {money} </div>
                <div style={{display: 'flex',alignItems: 'center'}}> <Icon style={{marginRight: 10}} type="clock-circle" /> {time} </div>
            </div>
        )
    }
}