import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {
    state = { text: "" }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClaer: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value })

    onSubmit = (e) => {
        e.preventDefault(); //提交表单阻止刷新页面
        if (this.state.text.length === 0) {
            this.props.setAlert({ msg: '请输入查询内容', type: 'light' })
            return;
        }
        this.props.searchUsers(this.state.text);
    }
    render() {
        const { clearUsers, showClaer } = this.props;
        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text"
                        placeholder="Search user..."
                        value={this.state.text}
                        onChange={this.onChange} />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                </form>
                {showClaer &&
                    (<button onClick={clearUsers} className="btn btn-block btn-light"
                    >Clear</button>)}


            </div>
        )
    }
}

export default Search
