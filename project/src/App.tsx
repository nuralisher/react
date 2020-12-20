import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useRouteMatch,} from 'react-router-dom';
import Main from './components/Main';
import Registration from './components/Registration';
import Auth from './components/Auth';
import { Group, User } from './local/interfaces';
import { auth, groups, users } from './local/localdb';
import Profile from './components/Profile';
import { ValidationStatus } from './local/validationStatus';
import Sidebar from './components/Sidebar';
import Chats from './components/Chats';
import Users from './components/Users';
import Groups from './components/Groups';
import GroupCreate from './components/GroupCreate';
import GroupItem from './components/GroupItem';
import SubscibedGroups from './components/SubscibedGroups';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from './local/actionType';
import style from './components/css/app.module.css';
import { addGroup} from './api/api';
import Axios from 'axios';

/*
1.css modules: app.css and index.css
2.react lazy-> imports,routing
3.useMemo
4.ErrorBoudary -> no user,no group..
5.Fragments
6.Profile
7.useCallback
8.useReducer
9.Redux
10.axios
npx json-server --watch db.json

->profile, 

 */


export const CurrentUser = React.createContext<User>({
  id:"", name:"", email:"",password:""
});


function App() {
  Axios.post("")
  // const [isLogged, setisLogged] = useState(false);
  const [authUser, setauthUser] = useState(ValidationStatus.UNDEFINED);
  const [regUser, setregUser] = useState(ValidationStatus.UNDEFINED);
  // const [curUser, setcurUser] = useState({id:"", name:"", email:"",password:""});
  const [createdId, setCreatedId] = useState("initial");
  // const reduxUsers:User[] = useSelector((state:any) => state.userReducer.users);
  // const curentUser:User = useSelector((state:any)=> state.userReducer.currentUser);
  const isAuth:User = useSelector((state:any)=> state.authReducer.isAuth );
  const currentUser:User = useSelector((state:any)=> state.authReducer.user);
  const dispatch = useDispatch();
  let reidrect = true;
  
  return (
    <BrowserRouter>
      {!isAuth ?

      <>
      <Route path='/'  component={Main}/> 
      <Switch>
        <Route exact path='/registration' component={()=><Registration registrate={registrate} cancel={cancel}  regUser={regUser}/>}/>
        <Route exact path='/login' component={()=><Auth login={login} cancel={cancel} regUser={regUser} authUser={authUser}/>} />
        <Route  path='/profile' component={()=> <Profile authUser={authUser} />} />
      </Switch></>
      :
      <CurrentUser.Provider value={{ id:"", name:"", email:"",password:""}}>
        <Sidebar logout={logout} />
        <div className={style.main} >
          <Switch>
            <Route path='/profile' component={()=><Profile authUser={authUser} /> }/>
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
    cancel();
    if(isValid(newUser)){
      const isExist = users.find((user)=>user.email===newUser.email);
      
      if(!isExist){
        setregUser((prev)=>(prev=ValidationStatus.NOTVALID));
        return
      }

      newUser.id = (users.length+1).toString();
      newUser.chats = [];
      newUser.groups = [];
      users.push(newUser);  
      setregUser((prev)=>(prev=ValidationStatus.VALID));
      return
    }
    setregUser((prev)=>(prev=ValidationStatus.NOTVALID));
  }
  
  async function login(user:User){
    cancel();
    if(isValid(user)){
      const isExist = users.find((u)=>u.email===user.email && u.password===user.password);
      if(isExist?.id){
        auth.me = isExist;
        setauthUser((prev)=>(prev=ValidationStatus.VALID));
        dispatch({type:ActionType.LOGUSER, user: isExist});
        return;
      }
    }
    setauthUser((prev)=>(prev=ValidationStatus.NOTVALID));
  }
  
  function isValid(user:User){
    user.email = user.email.trim();
    user.password = user.password.trim();
  
    if(user.email && user.password && user.email.includes('@') && user.email.includes('.com') && user.password.length>=8){
      
      return true;  
    }
    return false;
  }
  

  function logout(){
    // setisLogged((prev)=>(prev=false));
    setauthUser((prev)=>(prev=ValidationStatus.UNDEFINED));
    // setcurUser((prev)=>(prev={id:"", name:"", email:"",password:""}));
    // dispatch({type:ActionType.SETCURRENTUSER, user:{id:"", name:"", email:"",password:""}, });
    auth.me = {id:"", name:"", email:"", password:""};
    dispatch({type:ActionType.LOGOUT});
    setregUser((prev)=>(prev=ValidationStatus.UNDEFINED));
  }


  async function createGroup(newGroup:Group){
    if(isValidGroup(newGroup)){
        await addGroup(newGroup);
        dispatch({type:ActionType.SELECTGROUP, group: newGroup});
    }
    setCreatedId((prev)=>(prev="1"));
  }

  function isValidGroup(group:Group):boolean{
      return group.name.trim()? true : false;
  }

  function cancelCreateGroup(){
      setCreatedId((prev)=>(prev='initial'));
  }

}


export default App;
