import React, { Component } from "react";
export default class OnLineList extends Component {
    state = {
        dataSource: [],
        columns: [
            {title: 'ID',dataIndex: 'id',key: 'id'},
            {title: '玩家名字',dataIndex: 'player',key: 'player'},
            {title: '等级',dataIndex: 'level',key: 'level'},
            {title: '延迟',dataIndex: 'ping',key: 'ping'},
        ],
        guideMap: {},
    }
    componentDidMount() {
        window._react.guide = this
    }
    _getGuideMenu(isFirst,arr) {
        console.log(arr)
        const menus = []
        const guideMap = {}
        arr = JSON.parse(arr)
        isFirst = JSON.parse(isFirst)
        arr.forEach(v => {
            menus.push(v.type)
            guideMap[v.type] = v
        })
        this.setState({
            menus,
            guideMap,
            isFirstGuide: isFirst
        })
        this.props.setMenus(menus)
        this.props.setCurrMenu(menus[0])
    }
    render() {
        const {guideMap} = this.state
        const {currMenu} = this.props
        const content = guideMap[currMenu] || {}
        return (
            <div style={{display: 'flex',width: '100%'}}>
                <img src={content.picture} alt="" width="50%" />
                <div style={{width: '50%',padding: '0 20px'}}>
                    <p>
                        {content.explain}
                    </p>
                </div>
            </div>
        )
    }
}