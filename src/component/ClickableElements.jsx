import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const ClickableElements = ({ targetSection , textProps }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const headerHeight = document.querySelector('#header').clientHeight;
    const getintouch  = document.querySelector('.getintouch').clientHeight;
    // Scroll to the specified section when the element is clicked
    if (targetSection) {
      const element = document.getElementById(targetSection);
      console.log('Header height:', headerHeight);
      // const offset = element.getBoundingClientRect().top + window.scrollY - headerHeight;
      // const offset = (element.getBoundingClientRect().top + headerHeight);
      const offset = (element.offsetTop - headerHeight - getintouch);
      if (element) {
        // element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'start' });
        window.scrollTo({
            top: offset,
            behavior: 'smooth', // Optional: Use smooth scrolling
        });
      }
    }
  };


  return (
    <div>
      {/* Clickable element */}
      <a onClick={(e) => handleClick(e)} href='#'>{textProps}</a>
      {/* ScrollLink for smooth scrolling */}
      <ScrollLink
        to={targetSection}
        onClick={handleClick}
        spy={true}
        smooth={true}
         // Adjust the offset based on your layout
        duration={150}
        offset={-200}
      >
        {/* {textProps} */}
      </ScrollLink>
    </div>
  );
};

export default ClickableElements;
