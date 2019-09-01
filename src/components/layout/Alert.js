import React, { useContext } from 'react'
import AlertContext from '../../contexts/alert/alertContext';
// import React, { useState, useEffect } from 'react'

const Alert = () => {
    /** alert={msg:'', type:''} type=[primary,light,dark,danger,success,white] */
    const alertContext = useContext(AlertContext);
    const { alert } = alertContext;

    // const [alert, setAlert] = useState(null);

    // useEffect(() => {
    //     setAlert(alertObj);
    // }, [alertObj]);

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
