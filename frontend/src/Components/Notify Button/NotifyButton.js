import React from 'react'

import './NotifyButton.css'

const NotifyButton =(props)=>{
    return(
        <React.Fragment>
            <div onClick={props.clickGotNewMessageHanlder} className="noti-button">
            <i className="far fa-arrow-alt-circle-down fa-2x"></i>
            </div>
        </React.Fragment>
    )
}

export default NotifyButton