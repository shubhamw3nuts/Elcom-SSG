import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const SplitText = (props) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
  });

  const [addClass, setAddClass] = useState(false);

  useEffect(() => {
    if (inView && !addClass) {
      // Add a delay of 1000 milliseconds (1 second) before adding the class
      const delayTimeout = setTimeout(() => {
        setAddClass(true);
      }, 50);

      // Clear the timeout if the component goes out of view before the delay
      return () => clearTimeout(delayTimeout);
    }
  }, [inView, addClass]);

  if (props.copy) {

    // Update the state when the component comes into view
    // if (inView && !addClass) {
    //   setAddClass(true);
    // }

    return (
      <div className={`wordwrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
        {props.copy.split(" ").map(function (char, index) {
          // console.log('index', index);
          let style = { "animationDelay": (0.2 + index / 10) + "s" }
          let customeVal = char
          const totalLength = props.copy.split(" ").length
          if (index !== (totalLength - 1)) {
            customeVal = char
          }

          return (
            <React.Fragment key={index}>
              <div
                className="word"
                // aria-hidden="true"
                style={style}
                dangerouslySetInnerHTML={{ __html: customeVal }}
              >
              </div>
              <span className="whitespace"> </span>
            </React.Fragment>
          );
        })}
      </div>
    );
  }
  return ''
}


export default SplitText;