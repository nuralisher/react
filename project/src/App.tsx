import React, { Suspense, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch,} from 'react-router-dom';
import { Group, User } from './local/interfaces';
import { auth, users } from './local/localdb';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from './local/actionType';
import style from './components/css/app.module.css';
import { addGroup} from './api/api';
import Axios from 'axios';
import Loading from './components/Loading';
import { ValidationStatus } from './local/validationStatus';
import ErrorBoundary from './components/ErrorBoundary';

const Profile = React.lazy(()=>import('./components/Profile'));
const Auth = React.lazy(()=>import('./components/Auth'));
const Main = React.lazy(()=>import('./components/Main'));
const Sidebar = React.lazy(()=>import('./components/Sidebar'));
const Chats = React.lazy(()=>import('./components/Chats'));
const Users = React.lazy(()=>import('./components/Users'));
const Groups = React.lazy(()=>import('./components/Groups'));
const GroupItem = React.lazy(()=>import('./components/GroupItem'));
const SubscibedGroups = React.lazy(()=>import('./components/SubscibedGroups'));
const Registration = React.lazy(()=>import('./components/Registration'));
const GroupCreate = React.lazy(()=>import('./components/GroupCreate'));

// npx json-server --watch db.json

function App() {
  Axios.post("")
  const [authUser, setauthUser] = useState(ValidationStatus.UNDEFINED);
  const [regUser, setregUser] = useState(ValidationStatus.UNDEFINED);
  const [createdId, setCreatedId] = useState("initial");
  const isAuth:User = useSelector((state:any)=> state.authReducer.isAuth );
  const dispatch = useDispatch();
  
  return (
    <BrowserRouter>
    <Suspense fallback={<Loading/> }>
      {!isAuth ?

      <>
      <Route path='/'  component={Main}/> 
      <Switch>
        <Route exact path='/registration' component={()=><Registration registrate={registrate} cancel={cancel}  regUser={regUser}/>}/>
        <Route exact path='/login' component={()=><Auth login={login} cancel={cancel} regUser={regUser} authUser={authUser}/>} />
        <Route  path='/profile' component={()=> <Profile authUser={authUser} />} />
      </Switch></>
      :
      <>
        <Sidebar logout={logout} />
        <div className={style.main} >
          <Switch>
            <Route path='/profile' component={()=>  <Profile authUser={authUser} /> }/>
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
      </>

      
      }

      {
        createdId!='initial' && (
            !createdId?
            <Redirect to='/groups/createNew' />
            :
            <Redirect to={`/groups/${createdId}`} />
      )}
</Suspense>
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
      
      if(isExist){
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
    setauthUser((prev)=>(prev=ValidationStatus.UNDEFINED));
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
