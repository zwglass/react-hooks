import React from 'react'

const Alert = ({ alert }) => {
    /** alert={msg:'', type:''} type=[primary,light,dark,danger,success,white] */
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fa fa-info-circle"></i>&nbsp;
                {alert.msg}
            </div>
        )
    )
}

export default Alert
