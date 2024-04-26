import React from 'react'
import InnerBanner from '@/component/InnerBanner';
import MissionVision from '@/component/MissionVission';
import Purpose from '@/component/PurposeSec';
import IntroductionSec from '@/component/IntroductionSec';
import Advantages from '@/component/AdvantagesSec';
import ExploreSec from '@/component/ExploreSec';
import CounterSec from '@/component/CounterSec';
import TeamSec from '@/component/TeamSec';
import GloblemapSec from '@/component/GloblemapSec';
import SeoData from '../SeoData';

const AboutPage = ({ data, teamMembers, seodata, pageTitle }) => {
    const {
        bannerHeading,
        introSectionHeading, introHeading, introDescription, introImage, introButtonOne, introButtonTwo,
        counterInfo,
        halfWidhtBoxInfo, fullWidhtBoxInfo,
        advantageSectionHeading, advantageHeading, advantagesInfo,
        mapSectionHeading, mapHeading, mapDescription, mapImage, mapMarkerInfo, mapDistributorPageLink,
        exploreSectionHeading, exploreHeading, exploreImage, exploreButtonInfo,
        teamHeading, teamSectionHeading
    } = data;
    return (
        <>
            <SeoData seodata={seodata} pageTitle={pageTitle} />
            {bannerHeading && <InnerBanner heading={bannerHeading.trim() != '' ? bannerHeading : pageTitle} />}
            <div className="aboutWrapper">
                <IntroductionSec
                    sectionHeading={introSectionHeading}
                    heading={introHeading}
                    description={introDescription}
                    image={introImage}
                    buttonOne={introButtonOne}
                    buttonTwo={introButtonTwo}
                />
                {counterInfo && <CounterSec counterInfo={counterInfo} />}
                {halfWidhtBoxInfo &&
                    <MissionVision info={halfWidhtBoxInfo} />
                }
                {fullWidhtBoxInfo &&
                    <>
                        {fullWidhtBoxInfo.map((info, index) => {
                            const { heading, description } = info;
                            if (heading || description) {
                                return <Purpose info={info} key={index} />
                            }
                        })}
                    </>
                }
                <Advantages
                    sectionHeading={advantageSectionHeading}
                    heading={advantageHeading}
                    info={advantagesInfo}
                />
                <GloblemapSec
                    sectionHeading={mapSectionHeading}
                    heading={mapHeading}
                    description={mapDescription}
                    mapImage={mapImage}
                    markerInfo={mapMarkerInfo}
                    markerInfoLink={mapDistributorPageLink}
                />
                <ExploreSec
                    sectionHeading={exploreSectionHeading}
                    heading={exploreHeading}
                    image={exploreImage}
                    buttonInfo={exploreButtonInfo}
                />
                {(teamMembers?.nodes?.length > 0) &&
                    <TeamSec
                        sectionHeading={teamSectionHeading}
                        heading={teamHeading}
                        teamMembers={teamMembers}
                    />
                }
            </div>
        </>
    )
}

export default AboutPage