import React, { Component } from 'react';
import './App.css';
import { Menu, Icon, Button } from 'antd';
import OnLineList from './pages/OnLineList/'
import Guide from './pages/Guide/'

const SubMenu = Menu.SubMenu;

class App extends Component {
    state = {
        show: false,
        collapsed: false,
        currView: 'guide',
        menus: [],
        showMenuList: ['guide'],
        guideMap: {}
    }

    componentDidMount() {
        window._react.app = this
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    renderRight() {
        const {currView,currGuide,guideMap} = this.state
        if(currView === 'onLineList') {return <OnLineList></OnLineList>}
        if(currView === 'guide') {return <Guide content={guideMap[currGuide]}></Guide>}
    }
    _showView(show) {
        show = JSON.parse(show)
        this.setState({
            show
        })
    }
    _setCurrView(currView) {
        currView = JSON.parse(currView)
        this.setState({
            currView
        })
    }
    _getGuideMenu(arr) {
        console.log(arr)
        const menus = []
        const guideMap = {}
        arr = JSON.parse(arr)
        
        arr.forEach(v => {
            menus.push(v.type)
            guideMap[v.type] = v
        })
        this.setState({
            menus,
            guideMap,
            currGuide: menus[0]
        })
    }
    handleMenuClick({item,key}) {
        const {currView} = this.state
        if(currView === 'guide') {
            this.setState({
                currGuide: item.props.label
            })
        }
    }
    renderLeft() {
        const { collapsed,menus } = this.state
        const showLeft = this.isShowLeft
        return showLeft ?
            <div style={{ width: collapsed ? 80 : 256 }}>
                <Menu
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    onClick={this.handleMenuClick.bind(this)}
                >
                    {
                        menus.map((m, idx) => (
                            <Menu.Item key={idx} label={m}>
                                <span>
                                    {m}
                                </span>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
            : null
    }
    isShowLeft() {
        const { currView, showMenuList,show } = this.state
        return show && showMenuList.includes(currView)
    }
    render() {
        const {  collapsed, show } = this.state
        const showLeft = this.isShowLeft()
        return (
            show ?
                <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                    <div className="App" style={{ display: 'flex', border: '1px solid #ddd', height: '80vh', width: '80vw',background: 'white' }}>

                        {this.renderLeft()}

                        <div className="right" style={{ padding: 15, flex: 1 }}>
                            {
                                showLeft ? <Button onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                                    <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                                </Button> : null
                            }             
                            {this.renderRight()}
                        </div>

                    </div>
                </div>
                : null
        );
    }
}

export default App;
