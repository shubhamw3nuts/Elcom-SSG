import Image from "next/image"
import Logo from '../asset/images/loading-logo.svg'

const LoadingCompo = () => {
    return (
        <div className="loadingwrap">
            <div className="loadingsec">
                <Image src={Logo} alt="" />
            </div>
        </div>
    )
}

export default LoadingCompo;