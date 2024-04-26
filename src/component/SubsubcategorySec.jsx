import Advantages from '@/component/AdvantagesSec';
import CareerpathSec from '@/component/CareerpathSec';
import CategoryblogSec from '@/component/CategoryblogSec';
import PowerStrip from '@/component/PowerStrip';
import CatDetail from '@/component/layouts/CatDetail';
import ElectroType from '@/component/layouts/ElectroType';
import FutureBlog from '@/component/layouts/FutureBlog';
import UsappSec from './UsappSec';
import SectionTitle from './layouts/SectionTitle';

const SubsubcategorySec = () => {

    return (
        <>
            <div className='subsubcate'>
                <CatDetail />
                <CareerpathSec />
                <ElectroType />
                <FutureBlog />
                <UsappSec />
                <SectionTitle sectionHeading="WhY Choose elcom" heading="Enabling efficient  energy control" description="With decades of experience in research-based solutions, Elcom International is a leading manufacturer of rotary switches in Mumbai, India." />
                <CategoryblogSec />
                <PowerStrip title="New" heading="Introducing the new Power Strip" description="Functionality. Style. Everyday Convenience." backgroundColor="blue" />
                <Advantages sectionHeading="advantages" heading="The Elcom Advantage" />
            </div>

        </>
    )
}


export default SubsubcategorySec;