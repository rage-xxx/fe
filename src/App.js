import React, { Component } from 'react';
import './App.css';
import { Menu, Icon, Button,message } from 'antd';
import OnLineList from './pages/OnLineList/'
import Guide from './pages/Guide/'
import Bank from './pages/Bank/'



class App extends Component {
    state = {
        show: true,
        collapsed: false,
        currView: 'bank',
        menus: [],
        hideMenuList: ['onLineList'],
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
            bank: <Bank currMenu={currMenu} setCurrMenu={this.setCurrMenu} setMenus={this.setMenus}></Bank>
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
        message[type](text)
    }
    handleMenuClick({ item, key }) {
        this.setState({
            currMenu: item.props.label
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
                                <Icon type="close" style={{position: 'absolute',right: 10,top: 5,fontSize: 20,cursor: 'pointer'}} onClick={() => this.setState({show: false})} />
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
