import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import AlertContent from '../../contexts/alert/alertContext'

const Search = ({ clearUsers, showClaer, searchUsers }) => {
    const alertContext = useContext(AlertContent);

    const [text, setText] = useState('');

    const onChange = (e) => setText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault(); //提交表单阻止刷新页面
        if (text.length === 0) {
            alertContext.showAlert({ msg: '请输入查询内容', type: 'light' })
        } else {
            searchUsers(text); 
        }
    }

    const clearUsersText = () => {
        /** 清空用户和搜索文字 */
        clearUsers();
        setText('');
    }

    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text" placeholder="Search user..." value={text} onChange={onChange} />
                <input type="submit" value="Search" className="btn btn-dark btn-block" />
            </form>
            {showClaer &&
                (<button onClick={clearUsersText} className="btn btn-block btn-light"
                >Clear</button>)}
        </div>
    )
}

Search.propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClaer: PropTypes.bool.isRequired
}

export default Search
