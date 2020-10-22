import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch,} from 'react-router-dom';
import Main from './components/Main';
import Registration from './components/Registration';
import Auth from './components/Auth';
import { Group, User } from './local/interfaces';
import { groups, users } from './local/localdb';
import Profile from './components/Profile';
import { ValidationStatus } from './local/validationStatus';
import Sidebar from './components/Sidebar';
import Chats from './components/Chats';
import Users from './components/Users';
import Groups from './components/Groups';
import GroupCreate from './components/GroupCreate';
import GroupItem from './components/GroupItem';
import PostCreate from './components/PostCreate';
import SubscibedGroups from './components/SubscibedGroups';


export const CurrentUser = React.createContext<User>({
  id:"", name:"", email:"",password:""
});


function App() {
  const [isLogged, setisLogged] = useState(false);
  const [authUser, setauthUser] = useState(ValidationStatus.UNDEFINED);
  const [regUser, setregUser] = useState(ValidationStatus.UNDEFINED);
  const [curUser, setcurUser] = useState({id:"", name:"", email:"",password:""});
  const [createdId, setCreatedId] = useState("initial");



  return (
    <BrowserRouter>
      {!isLogged ?
      
      <>
      
      <Route path='/'  component={Main}/> 
      <Switch>
        <Route exact path='/registration' component={()=><Registration registrate={registrate} cancel={cancel}  regUser={regUser}/>}/>
        <Route exact path='/login' component={()=><Auth login={login} cancel={cancel} regUser={regUser} authUser={authUser}/>} />
        <Route  path='/profile' component={Profile} />
      </Switch></>
      :
      <CurrentUser.Provider value={curUser}>
        <div className="main" >
        <Sidebar logout={logout} />
        <Switch>
          <Route path='/profile' component={Profile}/>
          <Route path='/chats' component={Chats}/>
          <Route path='/users' component={Users} />
          <Route exact path='/groups' component={Groups} />
          <Route exact path='/groups/createNew' component={()=>
                <GroupCreate create={createGroup} createdId={createdId} cancel={cancelCreateGroup}
            />} />
          
          <Route exact path='/my-groups' component={SubscibedGroups} />
          <Route path='/groups/:id' component={GroupItem} />
        </Switch>
        </div>
      </CurrentUser.Provider>

      
      }

      {
        createdId!='initial' && (
            !createdId?
            <Redirect to='/groups/createNew' />
            :
            <Redirect to={`/groups/${createdId}`} />
      )}

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
      newUser.groups = [];
      users.push(newUser);
      setregUser((prev)=>(prev=ValidationStatus.VALID));
      return
    }
    setregUser((prev)=>(prev=ValidationStatus.NOTVALID));
  }
  
  function login(user:User){
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


  function createGroup(newGroup:Group){
    if(isValidGroup(newGroup)){
        newGroup.id = (groups.length+1).toString();
        newGroup.admin = curUser;
        console.log('ADMIN'+newGroup.admin.name);
        groups.push(newGroup);
    }
    
    setCreatedId((prev)=>(prev=newGroup.id));
  }

  function isValidGroup(group:Group):boolean{
      return group.name.trim()? true : false;
  }

  function cancelCreateGroup(){
      setCreatedId((prev)=>(prev='initial'));
  }

}


export default App;
