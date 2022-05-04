import React,{useState,useEffect,useRef, useCallback} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import VisibilitySensor from 'react-visibility-sensor'

import './OurMessenger.css'
import MessageBox from './MessageBox/MessageBox'
import Loading from '../Loading/Loading'
import NotifyButton from '../Notify Button/NotifyButton'

const OurMessenger =()=>{
    
    const inputEl = useRef();
    const textMsg = useRef()
    const formMsg = useRef()
    const [gotNewMessage, setGotNewMessage] = useState(false)
    const [userName, setUserName] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [messages, setMessages] = useState([])
    const {id} = useParams()
    
 
const onChange = (isVisible)=> {
    
  if(!isVisible){
      setGotNewMessage(true)
  }
  else{
      setGotNewMessage(false)
  }
}

const clickGotNewMessageHanlder =()=>{
    inputEl.current.scrollIntoView({ behavior: "smooth" });
}
 

    const formClearHandler = ()=>{
        formMsg.current.reset()
    }

    const scrollToBottom = useCallback( async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}start/`).then(res=>{
            setMessages(res.data.message)
        }).catch(err=>console.log(err.message))
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}check/`+id).then(res=>
        setUserName(res.data.existedUser.name)
            ).catch(err=>console.log(err.message))
        setIsLoading(false)
        
        inputEl.current.scrollIntoView({ behavior: "smooth" });
        
      },[id])
    useEffect(()=>{
            scrollToBottom()
    }
        ,[id, scrollToBottom])

        const checkMsgHandler =async  ()=>{
           
            let dataMsg = []
            await axios.get(`${process.env.REACT_APP_BACKEND_URL}start/`).then(res=>dataMsg=res.data.message).catch(err=>console.log(err.message))
            
            if(messages.length !== dataMsg.length){
                
                setMessages(dataMsg)
                
              
            }
        
        }

    useEffect(
       ()=>{
        const interval = setInterval(() => {
            
            checkMsgHandler()
          }, 10000);
          return () => clearInterval(interval);
       })

        const onChangeHandler=async ()=>{
            setIsLoading(true)
            let realMsg =  textMsg.current.value


           formClearHandler()
            try{
                const newMessage=  await fetch(`${process.env.REACT_APP_BACKEND_URL}start/`+id,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        messengerId:'627258f3e65d3b3440a2353c',
                        name:userName,
                        message:realMsg
                    })
                })
               const resopnseData =  await newMessage.json()
                if(!newMessage.ok){
                    throw new Error(resopnseData.message)
                }
                await axios.get(`${process.env.REACT_APP_BACKEND_URL}start/`).then(res=>{
                    setMessages(res.data.message)
                }).catch(err=>console.log(err.message))
                setIsLoading(false)
                scrollToBottom()
                
                }
                catch(err){
                    setIsLoading(false)
                    alert(err.message)
                   
                }
            
        }
        const body = !isLoading?(<div>
            <div className="container">
        {messages.length>0&& messages.map((each)=> <MessageBox  key={each.id} {...each}/>)}
        </div>
        
        <VisibilitySensor offset={{bottom:-200}} partialVisibility onChange={onChange}>
            <form ref={formMsg}>
        <div className="messageinput">
        <input type="text" ref={textMsg} name='message' />
        <button onClick={onChangeHandler}>Send</button>
        </div>
        </form>
        </VisibilitySensor>
        <div className='bot' ref={inputEl}/>
        {gotNewMessage&&<NotifyButton clickGotNewMessageHanlder={clickGotNewMessageHanlder}/>}
        </div>): <Loading />
 
    return(

        <React.Fragment>
            
            {body}
            
        </React.Fragment>
    )
}

export default OurMessenger
