import Link from "next/link";
import { formatFileSize, getFileExtensionFromMimeType } from "@/utils/utils";

const DownloadSec = ({ donwloadInfo }) => {
    if (donwloadInfo?.selectFile?.mediaItemUrl) {
        const { fileName, selectFile } = donwloadInfo;
        return (
            <>
                <div className="col-lg-6">
                    <div className="downloadpres">
                        <div className="downloadlabal">
                            <h6 className="very-small-text">{getFileExtensionFromMimeType(selectFile.mimeType)}</h6>
                            <h5>{fileName ? fileName : selectFile.title}</h5>
                            <h6 className="label-text">{formatFileSize(selectFile.fileSize)}</h6>
                        </div>
                        <div className="btnbox">
                            <Link className="elcom-btn primary-black-btn" href={selectFile.mediaItemUrl} target="_blank" >download</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default DownloadSec;