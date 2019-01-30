import React, { Component } from "react";
import echarts from 'echarts'

export default class OnLineList extends Component {
    state = {
        speed: 0,
        gas: 0,
        healthy: 0,
        echartsIns: null,
        bg: '#1b1b1b'
    }
    componentDidMount() {
        window._react.gauge = this
        const myChart = echarts.init(document.getElementById('echarts-div'))
        this.setState({
            echartsIns: myChart
        },() => {
            this.setOption()
        })
    }
    _getAllState(speed = 0,gas = 0,healthy = 0) {
        this.setState({
            speed: +speed,
            gas: +gas,
            healthy: +healthy
        })
    }
    _getSpeed(text) {
        this.setState({
            speed: +text
        })
    }
    _getGas(text) {
        this.setState({
            gas: +text
        })
    }
    _getBg(text) {
        this.setState({
            bg: text
        })
    }
    _getHealthy(text) {
        this.setState({
            healthy: +text
        })
    }
    setOption() {
        const { speed, gas, healthy, echartsIns, bg = 'transparent' } = this.state
        if(!echartsIns) {return}
        const option = {
            backgroundColor: bg,
            tooltip: {
                formatter: "{a} <br/>{c} {b}"
            },
            toolbox: {
                show: false,
            },
            series: [
                {
                    name: '速度',
                    type: 'gauge',
                    min: 0,
                    max: 400,
                    splitNumber: 10,
                    radius: '50%',
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                            width: 3,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 15,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 25,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {           // 分隔线
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontSize: 20,
                            fontStyle: 'italic',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        backgroundColor: 'rgba(30,144,255,0.8)',
                        borderWidth: 1,
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        offsetCenter: [0, '50%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            color: '#fff'
                        }
                    },
                    data: [{ value: speed, name: 'km/h' }]
                },
                {
                    name: '损坏程度',
                    type: 'gauge',
                    center: ['25%', '55%'],    // 默认全局居中
                    radius: '30%',
                    min: 0,
                    max: 100,
                    endAngle: 45,
                    splitNumber: 10,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.29, '#ff4500'], [0.86, '#1e90ff'], [1, 'lime']],
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 20,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 5,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        offsetCenter: [0, '-30%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            fontStyle: 'italic',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    detail: {
                        //backgroundColor: 'rgba(30,144,255,0.8)',
                        // borderWidth: 1,
                        borderColor: '#fff',
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5,
                        width: 80,
                        height: 30,
                        offsetCenter: [25, '20%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontWeight: 'bolder',
                            color: '#fff'
                        }
                    },
                    data: [{ value: healthy, name: '损坏程度%' }]
                },
                {
                    name: '油表',
                    type: 'gauge',
                    center: ['75%', '50%'],    // 默认全局居中
                    radius: '30%',
                    min: 0,
                    max: 2,
                    startAngle: 135,
                    endAngle: 45,
                    splitNumber: 2,
                    axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: [[0.2, 'lime'], [0.8, '#1e90ff'], [1, '#ff4500']],
                            width: 2,
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisTick: {            // 坐标轴小标记
                        length: 12,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                            color: 'auto',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    axisLabel: {
                        textStyle: {       // 属性lineStyle控制线条样式
                            fontWeight: 'bolder',
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        },
                        formatter: function (v) {
                            switch (v + '') {
                                case '0': return 'E';
                                case '1': return '油量';
                                case '2': return 'F';
                            }
                        }
                    },
                    splitLine: {           // 分隔线
                        length: 15,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                            width: 3,
                            color: '#fff',
                            shadowColor: '#fff', //默认透明
                            shadowBlur: 10
                        }
                    },
                    pointer: {
                        width: 2,
                        shadowColor: '#fff', //默认透明
                        shadowBlur: 5
                    },
                    title: {
                        show: false
                    },
                    detail: {
                        show: false
                    },
                    data: [{ value: 0.02 * gas, name: 'gas' }]
                },
            ]
        };
        echartsIns.setOption(option)
    }
    render() {
        this.setOption()
        return (
            <div id="echarts-div" style={{ width: 1000, height: 700 }}></div>
        )
    }
}