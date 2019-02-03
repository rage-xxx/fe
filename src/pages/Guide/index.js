import React, { Component } from "react";
import {Progress} from 'antd'

const example = [{ "picture": "https://voice.ilegame.com.cn/gtav/image/1.png", "type": "教程1", "explain": "我是说明文1号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/2.png", "type": "教程2", "explain": "我是说明文2号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/3.png", "type": "教程3", "explain": "我是说明文3号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/4.png", "type": "教程4", "explain": "我是说明文4号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/5.png", "type": "教程5", "explain": "我是说明文5号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/6.png", "type": "教程6", "explain": "我是说明文6号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }]

export default class OnLineList extends Component {
    state = {
        dataSource: [],
        columns: [
            { title: 'ID', dataIndex: 'id', key: 'id' },
            { title: '玩家名字', dataIndex: 'player', key: 'player' },
            { title: '等级', dataIndex: 'level', key: 'level' },
            { title: '延迟', dataIndex: 'ping', key: 'ping' },
        ],
        guideMap: {},
        percent: 0,
        isFirstGuide: true,
        scanedGuides: []
    }
    componentDidMount() {
        window._react.guide = this
        this._getGuideMenu()
    }
    componentWillUpdate(nextProps,state) {
        if(nextProps.currMenu !== this.props.currMenu) {
            if(state.isFirstGuide && !state.scanedGuides.includes(nextProps.currMenu)) {
                this.startCountDown(nextProps.currMenu)
            }
        }
    }
    startCountDown(currMenu) {
        this.setState({
            percent: 0
        },() => {
            this.props.setTimer(setInterval(() => {
                if(this.state.percent >= 100) {
                    clearInterval(this.props.timer)
                    this.setState({
                        scanedGuides: [...this.state.scanedGuides,currMenu]
                    })
                    this.props.setTimer(null)
                    return
                }
                this.setState({
                    percent: this.state.percent + 10
                })
            },1000))
        })
    }
    _getGuideMenu(isFirst = true, arr = JSON.stringify(example)) {
        console.log(arr)
        const menus = []
        const guideMap = {}
        arr = JSON.parse(arr)
        isFirst = JSON.parse(isFirst)
        arr.forEach(v => {
            menus.push({
                label: v.type
            })
            guideMap[v.type] = v
        })
        this.setState({
            menus,
            guideMap,
            isFirstGuide: isFirst
        })
        this.props.setMenus(menus)
        this.props.setCurrMenu(menus[0].label)
    }
    render() {
        const { guideMap,percent} = this.state
        const { currMenu } = this.props
        const content = guideMap[currMenu] || {}
        return (
            <div>
                <Progress percent={percent} showInfo={false} />
                <div style={{ display: 'flex', width: '100%' }}>
                    <img src={content.picture} alt="" width="50%" />
                    <div style={{ width: '50%', padding: '0 20px' }}>
                        <p>
                            {content.explain}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}