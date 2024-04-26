import LineList from './LineList';
import InnovationSuccess from './InnovationSuccess';
import SliderWithText from '../SliderWithText';

const ComponentType = ({ sectionHeading, heading, info, productSectionHeading, productHeading, productButtonInfo, products, sliderInfo }) => {
    return (
        <>
            <div className='componentWrap'>
                <LineList sectionHeading={sectionHeading} heading={heading} info={info} />
                <SliderWithText sliderInfo={sliderInfo} />
                <InnovationSuccess sectionHeading={productSectionHeading} heading={productHeading} buttonInfo={productButtonInfo} products={products} />
            </div>
        </>
    )
}

export default ComponentType;