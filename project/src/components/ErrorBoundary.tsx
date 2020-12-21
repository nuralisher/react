import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import img from '../images/sad.svg';
import style from './css/error.module.css';

interface Props {   
    children:ReactNode,
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State>  {
    state = {hasError:false}

    static getDerivedStateFromError(error:Error){
        return {hasError:true};
    }

    static componentDidCatch(error:Error, errorInfo:ErrorInfo){
        console.log(error);
        console.log(errorInfo);
    }

    render() { 
        console.log("RENDER ERRPR" + this.state.hasError);

        if (this.state.hasError) {
            return(
                <div className={style.container}>
                    <div className={style.inner}>
                        <div className={style.header}> 
                            <img src={img} alt="error img" className={style.errorImg} />
                            <div className={style.ohps}>Ohps, Something went wrong!</div>
                        </div>
                        <button onClick={()=>this.setState({hasError:false})} >Try Again</button>
                        <div className={style.message}>No such user with this email</div>
                    </div>
                </div>
            )
        }else{
            return this.props.children;
        }
    }
}
