// TitleBar.js
import React from 'react';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <nav className="title-bar glass-effect">
      <div className="logo">
       <div><h5>KIRA (Kickout Intelligence & Resolution Assistant)</h5></div> 
      </div>
      <ul className="nav-links">
        <li><a href="/">John</a></li>
        <li><a href="/about">Notifications</a></li>
        <li><a href="/contact">Logout</a></li>
      </ul>
    </nav>
  );
};

export default TitleBar;