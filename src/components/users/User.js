import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'
import Repos from '../repos/Repos'

export default class User extends Component {
    componentDidMount() {
        // 调用App.js loadUser(login) 方法获取当前用户详细信息
        this.props.loadUser(this.props.match.params.login);
        this.props.loadUserRepos(this.props.match.params.login);
    }

    render() {
        const { name, avatar_url, location, bio, company, blog, html_url, followers,
            following, public_repos, public_gists, hireable } = this.props.user
        return (
            <Fragment>
                <Link to="/" className="btn btn-light">返回</Link>
                是否在职: {''}
                {hireable ? <i className="fa fa-check fa-success"></i> :
                    <i className="fa fa-times-circle fa-danger"></i>}
                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} alt="Avatar" className="round-img" style={{ width: 150 }} />
                        <h1>{name}</h1>
                        <p>地址: {location}</p>
                    </div>
                    <div>
                        {bio && (
                            <Fragment>
                                <h3>个人简介</h3>
                                <p>{bio}</p>
                            </Fragment>)}
                        <a href={html_url} className="btn btn-dark my-1">GitHub</a>
                        <ul>
                            <li>
                                {company && (<Fragment> <strong>公司: </strong>{company}</Fragment>)}
                            </li>
                            <li>
                                {blog && (<Fragment><strong>网址: </strong>{blog}</Fragment>)}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="badge badge-primary">Followers: {followers}</div>
                    <div className="badge badge-success">Following: {following}</div>
                    <div className="badge badge-light">Public Repos: {public_repos}</div>
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>
                </div>
                <Repos repos={this.props.repos} />
            </Fragment>
        )
    }
}
