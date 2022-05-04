
import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom'



import './Auth.css'
import Modal from '../../UI/Modal/Modal'

const Auth =()=>{
    const [isError, setIsError] = useState()
    const [isErrorMsg, setIsErrorMsg] = useState()
    const [isLoginMode, setIsLoginMode] = useState(false)
    const history = useHistory()
    const {register, handleSubmit, errors} = useForm()
    
    const onSwitchHandler = ()=>{
        setIsLoginMode(isLoginMode => !isLoginMode)
    }

    const clearErrorHandler =()=>{
        setIsError(false)
        console.log('Clicked')
    }

    const onSumbitHandler = async (data)=>{
        
        if(!errors.nickname && !errors.password){
           
    
            if(!isLoginMode){
            try{
            const newUser =  await fetch(`${process.env.REACT_APP_BACKEND_URL}signup`,
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:data.nickname,
                    password:data.password
                })
            })
           const resopnseData =  await newUser.json()
            
            if(!newUser.ok){
                throw new Error(resopnseData.message)
            }
           const url = '/ourmessager/'+resopnseData.createdUser.id
            history.push(url)
            }
            catch(err){
           
                console.log(err)
                setIsErrorMsg(err.message)
                setIsError(true)
               
            }
        }
        else{         
            try{
                const newUser =  await fetch(`${process.env.REACT_APP_BACKEND_URL}login`,
                {
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name:data.nickname,
                        password:data.password
                    })
                })
               const resopnseData =  await newUser.json()
                
                if(!newUser.ok){
                    throw new Error(resopnseData.message)
                }
         
               const url = '/ourmessager/'+resopnseData.existedUser.id
                history.push(url)
                }
                catch(err){
                    console.log(err)
                    setIsErrorMsg(err.message)
                    setIsError(true)
                }         
        }
    }
        
    }


   

    return(
        <React.Fragment>
        <form onSubmit={handleSubmit(onSumbitHandler)}>
            
        <div className='signin'>
            {!isLoginMode ? <h2>Sign up</h2> : <h2>Login</h2>}
        <input type="text" placeholder="Your nick name" name="nickname" ref={register({required:"Hey your nick name is required"})}/>
        {errors.nickname&&<p>{errors.nickname.message}</p>}
        <input type="password" autoComplete="off" placeholder="Your password" ref={register({required:"Hey password is required",minLength:{value:5,message:"Your password is too short like your d*ck"}})} name='password' />
        {errors.password&&<p>{errors.password.message}</p>}
        <button>{!isLoginMode?<span>Sign up</span>:<span>Login</span>}</button>
        <p className='switch' onClick={onSwitchHandler}>Switch</p>
        </div>
        </form>
        <Modal show={isError} clearError ={clearErrorHandler}>
            {isErrorMsg}
        </Modal>
        </React.Fragment>
        
    )
}

export default Auth