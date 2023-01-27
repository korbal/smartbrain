import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ProfileIcon = ({ toggleModal, onRouteChange, direction, ...args }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div className="pa4 tc">

        {/* dropdown */}
        <div className="d-flex p-5">
      <Dropdown  isOpen={dropdownOpen} toggle={toggle} direction={direction} >
        <DropdownToggle caret> 
          <img src="https://pbs.twimg.com/profile_images/1584513883959689218/zemFlgoR_400x400.jpg" className="br-100 ba h3 w3 dib" alt="avatar"/>
        </DropdownToggle>
        <DropdownMenu right {...args}>
          <DropdownItem onClick={toggleModal} >View Profile</DropdownItem>
          <DropdownItem onClick={() => onRouteChange('signout')}>Sign out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
        
        
        {/* icon */}
        
         
        

    </div>
  )
}

export default ProfileIcon;

