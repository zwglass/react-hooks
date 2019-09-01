import React, { Fragment, useState } from 'react'
import './App.css'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import About from './components/pages/About'

import AlertState from './contexts/alert/alertState'

const App = () => {

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  const searchUsers = async (text) => {
    /** 搜索用户 */
    if (!text) {
      return;
    }
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  }

  const loadUser = async (login) => {
    /** 获取单个用户信息 */
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${login}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(res.data);
  }

  const loadUserRepos = async (login) => {
    /** 获取当前用户的仓库信息 */
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  }

  const clearUsers = () => {
    /** 清空用户内容 */
    setUsers([]);
    setLoading(false);
  };

  // const showAlert = ({ msg, type }) => {
  //   setAlert({ msg, type });
  //   // 取消显示提示
  //   setTimeout(() => {
  //     setAlert(null);
  //   }, 5000);
  // }

  // const { users, user, repos, loading, alert } = this.state;
  return (
    <AlertState>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route exact path="/" render={props => (<Fragment>
                <Search searchUsers={searchUsers} clearUsers={clearUsers}
                  showClaer={users.length === 0 ? false : true} />
                <Users users={users} loading={loading}></Users>
              </Fragment>)} />
              <Route exact path="/about" component={About}></Route>
              <Route exact path="/user/:login" render={props => (
                <User {...props} user={user} loadUser={loadUser}
                  repos={repos} loadUserRepos={loadUserRepos} loading={loading} />
              )}></Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </AlertState>
  )

}


export default App;
