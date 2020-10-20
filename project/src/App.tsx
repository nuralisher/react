import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import Main from './components/Main';
import Registration from './components/Registration';
import Auth from './components/Auth';
import { User } from './local/interfaces';
import { users } from './local/localdb';
import Profile from './components/Profile';
import example from './components/example';
import { ValidationStatus } from './local/validationStatus';
import Sidebar from './components/Sidebar';
import Chats from './components/Chats';

function App() {
  const [isLogged, setisLogged] = useState(false);
  const [authUser, setauthUser] = useState(ValidationStatus.UNDEFINED);
  const [regUser, setregUser] = useState(ValidationStatus.UNDEFINED);
  const [curUser, setcurUser] = useState({id:"", name:"", email:"",password:""});

  useEffect(() => {
    console.log(`usefect:=> userID: ${curUser.id} , islogged ${isLogged} , authuser: ${authUser}`);
}, )


  return (
    <BrowserRouter>
      {!isLogged ?
      
      <>
      
      <Route path='/'  component={Main}/> 
      <Switch>
        <Route exact path='/registration' component={()=><Registration registrate={registrate} cancel={cancel}  regUser={regUser}/>}/>
        <Route exact path='/login' component={()=><Auth login={login} cancel={cancel} regUser={regUser} authUser={authUser}/>} />
        <Route  path='/profile' component={()=> <Profile authUser={authUser}/>} />
      </Switch></>
      :
      <>
      <Sidebar logout={logout} />
      <Switch>
        <Route  path='/profile' component={()=> <Profile  user={curUser}/>}/>
        <Route path='/chats' component={()=> <Chats user={curUser} />}/>
      </Switch>
      </>
      }
    </BrowserRouter>
  );
  
  function cancel(){
    setauthUser((prev)=>(prev=ValidationStatus.UNDEFINED));
    setregUser((prev)=>(prev=ValidationStatus.UNDEFINED));
  }

  function registrate(newUser:User){
    if(isValid(newUser)){
      const isExist = users.find((user)=>user.email===newUser.email);
      if(isExist){
        alert('already exist');
        setregUser((prev)=>(prev=ValidationStatus.NOTVALID));
        return
      }
      newUser.id = (users.length + 1).toString();
      newUser.chats = [];
      users.push(newUser);
      alert(users.length);
      setregUser((prev)=>(prev=ValidationStatus.VALID));
      return
    }
    setregUser((prev)=>(prev=ValidationStatus.NOTVALID));
  }
  
  function login(user:User){
    console.log('login function');
    if(isValid(user)){
      const isExist = users.find( (u)=> u.email===user.email && u.password===user.password)
      if(isExist){
        console.log(user.password)
        console.log(`isexist name: ${isExist.name}`)
          setauthUser((prev)=>(prev=ValidationStatus.VALID));
          setisLogged((prev)=>(prev=true));
          setcurUser((prev)=>(prev=isExist))
          return;
      }
    }
    setauthUser((prev)=>(prev=ValidationStatus.NOTVALID));
  }
  
  function isValid(user:User){
    user.email = user.email.trim();
    user.password = user.password.trim();
  
    if(user.email && user.password && user.email.includes('@') && user.email.includes('.com') && user.password.length>=8){
      console.log('valid');
      return true;
    }
    return false;
  }
  

  function logout(){
    setisLogged((prev)=>(prev=false));
    setauthUser((prev)=>(prev=ValidationStatus.UNDEFINED));
    setcurUser((prev)=>(prev={id:"", name:"", email:"",password:""}));
    setregUser((prev)=>(prev=ValidationStatus.UNDEFINED));
  }

}


export default App;
