
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
import Link from 'next/link';
import Teamimg from "@/asset/images/Teamimg.webp";
import ShowModal from "./ShowModal";
import { useInView } from 'react-intersection-observer';
import { useState , useEffect } from 'react';
import SplitText from '@/component/layouts/SplitText';

const TeamSec = ({sectionHeading,heading,teamMembers}) => {

    const [inViewRef, inView] = useInView({
        triggerOnce: true,
    });  

    const [addClass, setAddClass] = useState(false);

    useEffect(() => {
        if (inView && !addClass) {
          // Add a delay of 1000 milliseconds (1 second) before adding the class
          const delayTimeout = setTimeout(() => {
            setAddClass(true);
          }, 500);
    
          // Clear the timeout if the component goes out of view before the delay
          return () => clearTimeout(delayTimeout);
        }
      }, [inView, addClass]);

    const [show, setShow] = useState(false);
    const [memberData, setmemberData] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = (e,member) => {
        e.preventDefault();
        setShow(true)
        setmemberData(member)
    };
    return (
        <>
            <div className={`teamWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                <Modal show={show} onHide={handleClose} className={'teamsec'}>
                    <ShowModal change={handleClose} memberData={memberData} />
                </Modal>
                <div className="container">
                <div className="lineEl"></div>
                    {(sectionHeading || heading) && 
                    <div className="teamWrapper">
                        <div className="teamText">
                            {sectionHeading && <h6 className="label-text">{sectionHeading}</h6>}
                            {heading && <h3><SplitText copy={heading} role="heading" /></h3>}
                        </div>
                    </div>
                    }
                    <div className="teamDtl">
                        <div className="row">
                            {teamMembers?.nodes?.map((member,index) => {
                                const {title,featuredImage,teamPost} = member;
                                return (
                                    <div className="col-lg-3 col-md-6" key={index}>
                                        <div className="teamimgDtl">
                                            <Link href="#" className="Popup" onClick={(e) => handleShow(e,member)}>
                                                {featuredImage && 
                                                <div className="teamImg">
                                                    <Image src={featuredImage?.node?.sourceUrl} width={304} height={304} alt='Teamimg'></Image>
                                                </div>
                                                }
                                                <div className='teamName'>
                                                    {title && <h6>{title}</h6>}
                                                    {teamPost?.teamAuther && <span>{teamPost?.teamAuther}</span>}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamSec;