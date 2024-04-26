import Advantages from '@/component/AdvantagesSec';
import CareerpathSec from '@/component/CareerpathSec';
import CategoryblogSec from '@/component/CategoryblogSec';
import PowerStrip from '@/component/PowerStrip';
import CatDetail from '@/component/layouts/CatDetail';
import ComponentType from '@/component/layouts/ComponentType';
import ElectroType from '@/component/layouts/ElectroType';
import FutureBlog from '@/component/layouts/FutureBlog';
import PduSection from '@/component/layouts/PduSection';

const SubcategorySec = () => {
    return (
        <>
            <div className='subcategory'>
                <CatDetail />
                <CareerpathSec />
                <ElectroType />
                <FutureBlog />
                <ComponentType />
                <PduSection />
                <CategoryblogSec />
                <PowerStrip title="New" heading="Introducing the new Power Strip" description="Functionality. Style. Everyday Convenience." backgroundColor="blue" />
                <Advantages sectionHeading="advantages" heading="The Elcom Advantage" />
            </div>

        </>
    )
}


export default SubcategorySec;