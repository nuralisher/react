import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import './navBar.css';

interface Props {}

export default function NavBar({}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bar">
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/hoc">
          <li>HOC</li>
        </Link>
        <Link to="/hook">
          <li>Hook</li>
        </Link>
        <Link to="/memo">
          <li>Memo</li>
        </Link>
        <button className='btn' onClick={()=>setIsOpen(true)} >Profile</button>
      </ul>
      <Modal open={isOpen} close={()=>{setIsOpen(false)}} />
    </div>
  );
}
