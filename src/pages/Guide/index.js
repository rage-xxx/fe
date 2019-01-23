import React, { Component } from "react";
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
        window._react.guide = this
    }

    render() {
        const {content = {}} = this.props
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