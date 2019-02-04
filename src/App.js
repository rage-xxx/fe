import React, { Component } from 'react';
import './App.css';
import { Menu, Icon, Button, message } from 'antd';
import OnLineList from './pages/OnLineList/'
import Guide from './pages/Guide/'
import Bank from './pages/Bank/'
import Login from './pages/Login/'
import Register from './pages/Register/'
import Gauge from './pages/Gauge/'
import Bag from './pages/Bag/'
import StateBar from './pages/StateBar/'




class App extends Component {
    state = {
        show: true,
        collapsed: false,
        currView: 'guide',
        guideTimer: null,
        showStateBar: true,
        isFirstGuide: true,
        menus: [],
        hideMenuList: ['onLineList', 'login', 'register', 'gauge', 'bag'],
        currMenu: '',
        hideCloseViews: ['login', 'register', 'gauge']
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
        const { currView, currMenu, guideTimer } = this.state
        const map = {
            onLineList: <OnLineList></OnLineList>,
            guide: <Guide timer={guideTimer} setIsFirstGuide={this.setIsFirstGuide} setTimer={this.setGuideTimer} currMenu={currMenu} setCurrMenu={this.setCurrMenu} setMenus={this.setMenus} ></Guide>,
            bank: <Bank currMenu={currMenu} setCurrMenu={this.setCurrMenu} setMenus={this.setMenus}></Bank>,
            login: <Login></Login>,
            register: <Register></Register>,
            gauge: <Gauge></Gauge>,
            bag: <Bag></Bag>
        }
        return map[currView]
    }
    setMenus = (menus) => {
        this.setState({
            menus
        })
    }
    setGuideTimer = (timer) => {
        this.setState({
            guideTimer: timer
        })
    }
    setIsFirstGuide = (isFirstGuide) => {
        this.setState({
            isFirstGuide
        })
    }
    setCurrMenu = (currMenu) => {
        this.setState({
            currMenu
        })
    }
    _showStateBar(show) {
        this.setState({
            showStateBar: JSON.parse(show)
        })
    }
    _showView(show) {
        show = JSON.parse(show)
        this.setState({
            show
        })
    }
    _setCurrView(currView) {
        // currView = JSON.parse(currView)
        console.log(currView)
        this.setState({
            currView
        })
    }
    _msg(type, text) {
        const arr = text.split('****')
        message[type](
            <span>
                {
                    arr.map((v, idx) => {
                        return v.includes('::') ? <strong key={idx} style={{ color: v.split('::')[1] }}>{v.split('::')[0]}</strong> : v
                    })
                }
            </span>
        )
    }
    handleMenuClick({ item, key }) {
        const currMenu = item.props.label

        this.setState({
            currMenu
        }, () => {
            if (this.state.currView === 'bank' && currMenu === '交易记录') {
                if (!window.mp) { return }
                window.mp.trigger('DataFromClient', JSON.stringify({
                    action: 'loadPlayerBankBalance',
                    payload: 'loadPlayerBankBalance'
                }))
            }
        })
    }
    renderLeft() {
        const { collapsed, menus, guideTimer, currView } = this.state
        const showLeft = this.isShowLeft()
        return showLeft ?
            <div style={{ width: collapsed ? 80 : 256 }}>
                <Menu
                    defaultSelectedKeys={['0']}
                    mode="inline"
                    theme="light"
                    inlineCollapsed={collapsed}
                    style={{ height: '100%' }}
                    onClick={this.handleMenuClick.bind(this)}
                >
                    {
                        menus.map((m, idx) => (
                            <Menu.Item key={idx} label={m.label} disabled={currView === 'guide' && !!guideTimer}>
                                {m.icon ? <Icon type={m.icon}></Icon> : null}
                                <span>
                                    {m.label}
                                </span>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </div>
            : null
    }
    handleClose = () => {
        this.setState({ show: false }, () => {
            if (!window.mp) { return }
            window.mp.trigger("DataFromClient", JSON.stringify({
                action: 'activeClosure',
                payload: this.state.currView
            }));
        })
    }
    isShowLeft() {
        const { currView, hideMenuList, show } = this.state
        return show && !hideMenuList.includes(currView)
    }
    render() {
        const { collapsed, show, currView, hideCloseViews, guideTimer, isFirstGuide,showStateBar } = this.state
        const showLeft = this.isShowLeft()
        const hideClose = hideCloseViews.includes(currView) || (currView === 'guide' && isFirstGuide)
        return (
            <React.Fragment>
                {
                    show ?
                        <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                            <div className="App" style={{
                                display: 'flex',
                                border: currView === 'gauge' ? 'none' : '1px solid #ddd',
                                height: '80vh',
                                width: '80vw',
                                background: currView === 'gauge' ? 'transparent' : 'white'
                            }}>

                                {this.renderLeft()}

                                <div className="right" style={{ padding: 15, flex: 1, height: '100%' }}>
                                    <div style={{ position: 'relative' }}>
                                        {
                                            showLeft ?
                                                <Icon onClick={this.toggleCollapsed} style={{ marginBottom: 16, fontSize: 20 }} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                                                :
                                                null
                                        }
                                        {
                                            hideClose ? null :
                                                <Icon type="close" className="close-btn" style={{ position: 'absolute', right: 10, top: 5, fontSize: 20, cursor: 'pointer' }} onClick={this.handleClose} />
                                        }
                                    </div>
                                    {this.renderRight()}
                                </div>

                            </div>
                        </div>
                        : null
                }
                {
                    showStateBar ? 
                    <StateBar></StateBar>
                    : null

                }
            </React.Fragment>
        );
    }
}

export default App;
