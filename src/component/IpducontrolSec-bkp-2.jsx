import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Image from 'next/image';
import SplitText from '@/component/layouts/SplitText';

const IpducontrolSec = ({ info }) => {

    const { heading, tabInfo } = info;
    if (tabInfo) {
        return (
            <>
                <div className="ipduwrapper">
                    <div className="ipdudtlwrap">
                        <div className='container'>
                            {heading && <div className='ipduheading'>
                                <h2><SplitText copy={heading} role="heading" /></h2>
                            </div>}
                            <div className='ipdudtl'>
                                <Tabs
                                    defaultActiveKey={tabInfo[0].tabHeading}
                                    id="uncontrolled-tab-example"
                                    className="idpu-1">
                                    {tabInfo.map((tab, index) => {
                                        const { tabHeading, heading, description, image } = tab;
                                        return (
                                            <Tab eventKey={tabHeading} key={index} title={tabHeading}>
                                                <div className='ipdubox'>
                                                    <div className='row'>
                                                        <div className={`col-lg-${image ? '6' : '12'}`}>
                                                            <div className='ipduboxdtl'>
                                                                <div className='ipduttl'>
                                                                    {heading && <h4>{heading}</h4>}
                                                                    {description && <p className='fadeInUp'>{description}</p>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {image && <div className='col-lg-6'>
                                                            <div className='idpuimg'>
                                                                <Image src={image.sourceUrl} width={634} height={482} alt='ipduimg1' />
                                                            </div>
                                                        </div>}
                                                    </div>
                                                </div>
                                            </Tab>
                                        )
                                    })}
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return ''
}

export default IpducontrolSec;