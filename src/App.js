import React, { Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import axios from 'axios'

export default class App extends Component {

  state = {
    users: [],
    loading: false
  }

  async componentDidMount() {
    // 获取本地环境变量值 .env.local 里面设置的值
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID);
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_SECRET);
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data, loading: false });
  }
  render() {
    return (
      <div className="App container">
        <Navbar></Navbar>
        <div className="container">
        <Search></Search>
          <Users users={this.state.users} loading={this.state.loading}></Users>
        </div>
      </div>
    )
  }
}
