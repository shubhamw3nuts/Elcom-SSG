
import Link from "next/link";
import downerrow from "@/asset/images/downerrow.svg";
import Image from "next/image";

const DropdownSec = () => {
    return(
        <>
            <div className="dmenu">
            <div className="dropdown">
                <div className="dropdown-btn">
                    <Link href={"javascript:void(0)"}>Sort by: Most recent</Link>
                    <i><Image src={downerrow} alt="downerrow" /></i>
                </div>
                <div className="dropdown-content">
                    <div className="ditem">
                        <Link href={"javascript:void(0)"}><span className="text">one</span></Link>
                        <Link href={"javascript:void(0)"}><span className="text">one</span></Link>
                        <Link href={"javascript:void(0)"}><span className="text">one</span></Link>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }

export default DropdownSec;