import React, { Component } from "react";
import {Progress, notification} from 'antd'

const example = [{ "picture": "https://voice.ilegame.com.cn/gtav/image/1.png", "type": "教程1", "explain": "我是说明文1号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/2.png", "type": "教程2", "explain": "我是说明文2号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/3.png", "type": "教程3", "explain": "我是说明文3号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/4.png", "type": "教程4", "explain": "我是说明文4号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/5.png", "type": "教程5", "explain": "我是说明文5号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }, { "picture": "https://voice.ilegame.com.cn/gtav/image/6.png", "type": "教程6", "explain": "我是说明文6号", "music": "https://voice.ilegame.com.cn/gtav/music/KidsUnited.mp3" }]

export default class OnLineList extends Component {
    state = {
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
                    this.props.setTimer(null)
                    const scanedGuides = [...this.state.scanedGuides,currMenu]
                    if(scanedGuides.length === this.state.menus.length) {
                        this.props.setIsFirstGuide(false)
                        notification.success({
                            message: '提示',
                            description: '请点击右上角关闭',
                        });
                    }else {
                        notification.success({
                            message: '提示',
                            description: '请查看下个教程',
                        });
                    }
                    this.setState({
                        scanedGuides
                    })
                    return
                }
                this.setState({
                    percent: this.state.percent + 10
                })
            },1000))
        })
    }
    _getGuideMenu(isFirst = 'true', arr = JSON.stringify(example)) {
        
        const menus = []
        const guideMap = {}
        arr = JSON.parse(arr)
        isFirst = JSON.parse(isFirst)
        console.log(isFirst,arr)
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
        this.props.setIsFirstGuide(isFirst)
    }
    render() {
        const { guideMap,percent,isFirstGuide} = this.state
        const { currMenu } = this.props
        const content = guideMap[currMenu] || {}
        console.log('STATE',isFirstGuide)
        return (
            <div>
                {
                    isFirstGuide ? <Progress percent={percent} showInfo={false} /> : null
                }
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