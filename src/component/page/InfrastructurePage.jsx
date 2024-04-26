import InnerBanner from '@/component/InnerBanner';
import KeyHighlight from '@/component/KeyhighlightSec';
import OperationSec from '@/component/OperationSec';
import VideoSec from '@/component/VideoSec';
import SectionTitle from '../layouts/SectionTitle';
import SeoData from '../SeoData';
import SectiontitleFull from '../layouts/SectiontitleFull';

const InfrastructurePage = ({ data, pageTitle, seodata }) => {
    const {
        bannerHeading,
        introSectionHeading, introHeading, introDescription, introVideoUrl, introVideoImage,
        infrastructureHeading, infrastructureSectionHeading, infrastructureInfo,
        advantagesSectionHeading, advantagesHeading, advantagesInfo
    } = data;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            {bannerHeading && <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />}

            <div className="infrastructureWrapper">
                {introDescription ?
                    <SectionTitle
                        sectionHeading={introSectionHeading}
                        heading={introHeading}
                        description={introDescription}
                        buttonInfo=''
                    />
                    :
                    <SectiontitleFull sectionHeading={introSectionHeading} heading={introHeading} />
                }
                <VideoSec
                    videoImage={introVideoImage}
                    videoURL={introVideoUrl}
                />
                <OperationSec
                    sectionHeading={infrastructureSectionHeading}
                    heading={infrastructureHeading}
                    info={infrastructureInfo}
                />
                <KeyHighlight
                    sectionHeading={advantagesSectionHeading}
                    heading={advantagesHeading}
                    info={advantagesInfo}
                />
            </div>

        </>
    )
}

export default InfrastructurePage