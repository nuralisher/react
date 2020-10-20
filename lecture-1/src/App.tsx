import React, { ReactElement, useState } from 'react'
import Auth from './components/Auth';
import Fail from './components/Fail';
import Registration from './components/Registration'
import Welcome from './components/Welcome';
import { User } from './models/User';


let users:User[] = [
]

export default function App(): ReactElement {
  const [showedComponent, setShowedComponent] = useState(<></>);

  function toAuth(){
    setShowedComponent(<Auth auth={auth} cancel={cancel}></Auth>);
  }

  function toRegistration(){
    setShowedComponent(<Registration registrate={registrate} cancel={cancel}></Registration>);
  }

  function registrate(newUser:User){

    let isExist = users.find((user)=>{return user.email===newUser.email});

    if(isExist){
      setShowedComponent(<Fail reason={'You already have account'}></Fail>)
    }else if(!isValid(newUser)){
      setShowedComponent(<Fail reason={'Not valid email or password'}></Fail>)
    }else{
      newUser.id = users.length+1;
      users.push(newUser);
      setShowedComponent(<Auth auth={auth} cancel={cancel}></Auth>);
    }
  }

  function auth(email:string, password:string){
    let user = users.find((user)=>{return user.email===email && user.password===password});

    if(user){
      setShowedComponent(<Welcome user={user}></Welcome>);
    }else{
      setShowedComponent(<Fail reason={'Wrong email or password'}></Fail>)
    }
  }

  function cancel(){
    setShowedComponent(<></>);
  }

  function isValid(user:User):boolean{
    if(user.email.indexOf('@')===-1 || user.email.indexOf('.com')===-1 || user.password.length<8){
      return false;
    }

    return true;
  }

  return (
    <div>
      <div className="buttons">
        <button onClick={ ()=> { toAuth() }} >Login</button>
        <button onClick={ ()=> { toRegistration()}} >Sign Up</button>
      </div>

      {showedComponent}
    </div>
  )
}
