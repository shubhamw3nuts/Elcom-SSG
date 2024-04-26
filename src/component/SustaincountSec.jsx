import Image from 'next/image';
import CountUp from 'react-countup';

const SustaincountSec = ({ backgroundImage, counterInfo }) => {
    return (
        <>
            <div className="sustainimgWrap">
                <div className="sustainimg">
                    {backgroundImage &&
                        <div className='sustainimgbox'>
                            <Image src={backgroundImage.sourceUrl} width={1440} height={456} alt='TowardImg' />
                        </div>
                    }
                    {counterInfo &&
                        <div className='sustaincounter'>
                            <div className='container'>
                                <div className='sustaincountergrp'>
                                    <div className='row'>
                                        {counterInfo.map((counter,index) => {
                                            if (counter.counterValue || counter.afterCounterText || counter.description) {
                                                return (
                                                    <div className='col-lg-4' key={index}>
                                                        <div className='scount'>
                                                            <CountUp className='h1'
                                                                start={0}
                                                                enableScrollSpy={true}
                                                                scrollSpyDelay={300}
                                                                scrollSpyOnce={true}
                                                                end={counter.counterValue}
                                                            /> {counter.afterCounterText}
                                                            <p>{counter.description}</p>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default SustaincountSec;


