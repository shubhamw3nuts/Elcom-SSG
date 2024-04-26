import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import linkedinwhite from "@/asset/images/linkedinwhite.svg";
import cross from "@/asset/images/cross.svg";

const ShowModal = ({change,memberData}) => {
    const {title,featuredImage,teamPost} = memberData;
    return (
        <>
        <div className='modalWrap'>
            <div className='modalDtl'>
                {featuredImage && 
                <div className='modalImg flex-shrink-0'>
                    <Image src={featuredImage?.node?.sourceUrl} width={304} height={304} alt='Teamimg'/>
                </div>
                }
                <div className='modalText'>
                    {title && 
                    <div className='modalTtl'>
                        <h6>{title}</h6>
                    </div>
                    }
                    <div className='teamPost'>
                        {(teamPost?.teamAuther) && <p>{teamPost?.teamAuther}</p>}
                        {(teamPost?.linkedinUrl) && 
                            <Link href={teamPost?.linkedinUrl} target="_blank"><Image src={linkedinwhite} alt='linkedinwhite' rel="noopener noreferrer"/></Link>
                        }
                    </div>
                    {(teamPost?.managementDescription) && 
                    <div className='teamBrief'>
                        <p>{teamPost?.managementDescription}</p>
                    </div>
                    }
                </div>
                <div className="closebtn">
                    <Link href="javascript:void(0)" onClick = {() => change()}><Image src={cross} alt="cross"/></Link>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default ShowModal;