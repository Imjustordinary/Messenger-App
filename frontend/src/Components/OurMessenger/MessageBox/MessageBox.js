import React from 'react'
import {useParams} from 'react-router-dom'

import './MessageBox.css'

const MessageBox =(props)=>{
    
    let {id} = useParams()
    

    return(
        <div className={props.userid===id?'realuser':undefined} >
        <p className='name'>{props.name}</p>
        <div className='messagebox'>
            
            {props.message}
        </div>
        </div>
    )
}

export default MessageBox