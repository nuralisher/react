import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, NavLink, Route} from 'react-router-dom';
import Registration from './components/Registration';
import Auth from './components/Auth';
import Welcome from './components/Welcome';
import Fail from './components/Fail';
import { User } from './interfaces/User';


let defaultUser:User = {id:"", name:"", email:"",password:""};
let users:User[] = [
  {id:'1', name:'a', email:'a', password:'a' },
];
let isFailed = false;

function App() {
  const [curUser, setCurUser] = useState(defaultUser);

  return (
    <BrowserRouter>
      <div className="App">
        {!curUser.id &&
        <div className="btns">
          <NavLink to='/registration'>Sign up</NavLink>
          <NavLink to='/login'>Log in</NavLink>
        </div>
        }
        <div>
          <Route exact path='/registration' render={()=><Registration cancel={cancel} registrate={registrate}/>} />
          <Route exact path='/login' render={()=><Auth cancel={cancel} auth={auth} isFailed={isFailed} />} />
          <Route exact path='/welcome' render={()=><Welcome curUser={curUser} logOut={logOut} />} />
          <Route exact path='/fail' render={()=><Fail backToHome={backToHome} />} />
        </div>  
      </div>
    </BrowserRouter>
  );

  

function registrate(user:User){
  console.log('reg');
  let isExist = users.find((u)=>u.email===user.email);
  if(isExist){
    console.log('failed');
    isFailed = true;
    return
  }
  
  isFailed = false;
  user.id = (users.length+1).toString();
  users.push(user);  
}

function auth(user:User){
  console.log('auth'+ users.length);
  let isExist = users.find((u)=>u.email===user.email && u.password===user.password);
  if(!isExist){
    isFailed = true;
    return
  }
  setCurUser((prev)=>(prev=isExist ||defaultUser));
  
}

function cancel(){
  console.log('cancel');
}

function backToHome(){
  isFailed = false;
}

function logOut(){
  isFailed = false;
  setCurUser((p)=>(p=defaultUser));
}

}

export default App;
