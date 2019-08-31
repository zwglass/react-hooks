import React from 'react'
import PropTypes from 'prop-types'

/**
 * 有状态组件: rcc 有状态组件主要用来定义交互逻辑和业务数据
 * 无状态组件: rfc 主要用来定义模板，接收来自父组件props传递过来的数据
 *
 * 有状态组件也可以叫做容器组件，无状态组件也可以叫做展示组件
 */

// const Navbar = (props) => {
const Navbar = ({icon, title}) =>{

    return (
        <nav className="Navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
        </nav>
    )

}

// 设置默认属性值
Navbar.defaultProps = {
    icon: "fa fa-github",
    title: "Load GitHub"
}

// 定义属性类型
Navbar.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Navbar;
