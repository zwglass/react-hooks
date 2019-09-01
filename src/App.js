import React, { Fragment, Component } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'

export default class App extends Component {

  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
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

  searchUsers = async (text) => {
    /** 搜索用户 */
    if (!text) {
      return;
    }
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  }

  loadUser = async (login) => {
    /** 获取单个用户信息 */
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${login}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  }

  loadUserRepos = async (login) => {
    /** 获取当前用户的仓库信息 */
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ repos: res.data, loading: false });
  }

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = ({ msg, type }) => {
    this.setState({ alert: { msg, type } });
    // 取消显示提示
    setTimeout(() => {
      this.setState({ alert: null });
    }, 5000);
  }
  render() {
    const { users, user, repos, loading, alert } = this.state;
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route exact path="/" render={props => (<Fragment>
                <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} setAlert={this.setAlert}
                  showClaer={users.length === 0 ? false : true} />
                <Users users={users} loading={loading}></Users>
              </Fragment>)} />
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/user/:login" render={props => (
                <User {...props} user={user} loadUser={this.loadUser} 
                repos={repos} loadUserRepos={this.loadUserRepos} />
              )}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}
