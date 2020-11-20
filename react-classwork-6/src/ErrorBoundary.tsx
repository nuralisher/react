import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './error.css';
import img from './images/sad.svg'

interface Props {
    children:ReactNode,
}
interface State {
    hasError:boolean,
}

export default class ErrorBoundary extends Component<Props, State> {
    state = {hasError:false}

    static getDerivedStateFromError(error:Error){
        return {hasError:true};
    }

    static componentDidCatch(error:Error, errorInfo:ErrorInfo){
        console.error(error);
        console.log(errorInfo);
    }

    render() {
        if(this.state.hasError){
            return(
                <div className="containe">
                    <div className="inner">
                        <div className="header"> 
                            <img src={img} alt="error img" className="errorImg"/>
                            <div className="ohps">Ohps, Something went wrong!</div>
                        </div>
                        <div className="message">Some error was catched, try to do something</div>
                        <div className="backBtn">
                            <NavLink className="backBtn" to=""> <div className="backBtn" > Back to Home Page</div></NavLink>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            this.props.children
        )
    }
}
