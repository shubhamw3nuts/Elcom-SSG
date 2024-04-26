import React from 'react';
import CountUp from 'react-countup';

const CounterSec = ({ counterInfo }) => {
    return (
        <>
            {counterInfo &&
                <div className="counterWrap">
                    <div className="container">
                        <div className="counterwrapper">
                            <div className="row">
                                {counterInfo.map((counter, index) => {
                                    const { counterStartValue, counterEndValue, counterDuration, heading } = counter;
                                    return (
                                        <React.Fragment key={index}>
                                            {(counterStartValue || counterEndValue || counterDuration || heading) &&
                                                <div className="col-lg-4 col-md-4" >
                                                    <div className="countWord">
                                                        <CountUp className='h1'
                                                            // delay={3}
                                                            start={counterStartValue}
                                                            end={counterEndValue}
                                                            duration={counterDuration}
                                                            enableScrollSpy={true}
                                                            scrollSpyDelay={300}
                                                            scrollSpyOnce={true}
                                                        />+
                                                        {heading && <p>{heading}</p>}
                                                    </div>
                                                </div>
                                            }
                                        </React.Fragment>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CounterSec;