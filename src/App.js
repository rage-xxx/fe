import React, { Component } from 'react';
import './App.css';
import { Menu, Icon, Button,message } from 'antd';
import OnLineList from './pages/OnLineList/'
import Guide from './pages/Guide/'
import Bank from './pages/Bank/'
import Login from './pages/Login/'
import Register from './pages/Register/'



class App extends Component {
    state = {
        show: true,
        collapsed: false,
        currView: 'login',
        menus: [],
        hideMenuList: ['onLineList','login','register'],
        isFirstGuide: false,
        currMenu: ''
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
        const { currView, currMenu,isFirstGuide } = this.state
        const map = {
            onLineList: <OnLineList></OnLineList>,
            guide: <Guide currMenu={currMenu} setCurrMenu={this.setCurrMenu} setMenus={this.setMenus} isFirstGuide={isFirstGuide} ></Guide>,
            bank: <Bank currMenu={currMenu} setCurrMenu={this.setCurrMenu} setMenus={this.setMenus}></Bank>,
            login: <Login></Login>,
            register: <Register></Register>,
        }
        return map[currView]
    }
    setMenus = (menus) => {
        this.setState({
            menus
        })
    }
    setCurrMenu = (currMenu) => {
        this.setState({
            currMenu
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
    _msg(type,text) {
        const arr = text.split('****')
        message[type](
            <span>
                {
                    arr.map((v,idx) => {
                        return v.includes('::') ? <strong key={idx} style={{color: v.split('::')[1]}}>{v.split('::')[0]}</strong> : v
                    })
                }
            </span>
        )
    }
    handleMenuClick({ item, key }) {
        const currMenu = item.props.label

        this.setState({
            currMenu
        },() => {
            if(this.state.currView === 'bank' && currMenu === '交易记录') {
                if(!window.mp) {return}
                window.mp.trigger('DataFromClient', JSON.stringify({
                    action: 'loadPlayerBankBalance',
                    payload: 'loadPlayerBankBalance'
                }))
            }
        }) 
    }
    renderLeft() {
        const { collapsed, menus } = this.state
        const showLeft = this.isShowLeft()
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
                            <Menu.Item key={idx} label={m.label}>
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
        this.setState({show: false},() => {
            if(!window.mp) {return}
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
        const { collapsed, show } = this.state
        const showLeft = this.isShowLeft()
        return (
            show ?
                <div style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent' }}>
                    <div className="App" style={{ display: 'flex', border: '1px solid #ddd', height: '80vh', width: '80vw', background: 'white' }}>

                        {this.renderLeft()}

                        <div className="right" style={{ padding: 15, flex: 1 }}>
                            <div style={{position: 'relative'}}>
                                {
                                    showLeft ? <Button onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
                                        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                                    </Button> : null
                                }
                                <Icon type="close" style={{position: 'absolute',right: 10,top: 5,fontSize: 20,cursor: 'pointer'}} onClick={this.handleClose} />
                            </div>
                            {this.renderRight()}
                        </div>

                    </div>
                </div>
                : null
        );
    }
}

export default App;
