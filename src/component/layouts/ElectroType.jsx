import Image from 'next/image';
import Link from 'next/link';
import electroImg from '@/asset/images/electroImg.png';
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import SplitText from '@/component/layouts/SplitText';

const ElectroType = ({ heading, categories, products }) => {
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

    let boxInfo = [];
    if (categories) {
        if (categories.nodes.length != 0) {
            boxInfo = categories.nodes.map((cat, index) => {
                return cat;
            })
        }
    }
    if (products) {
        if (products.nodes.length != 0 && categories.nodes.length == 0) {
            boxInfo = products.nodes.map((product, index) => {
                return product;
            })
        }
    }

    if (boxInfo.length != 0) {
        return (
            <>
                <div className={`electroWrap ${addClass ? 'visible' : ''}`} ref={inViewRef}>
                    <div className="container">
                        <div className="electroSec">
                            <div className="row">
                                {heading && <div className="col-lg-3">
                                    <div className="electrosecTitle">
                                        <h4><SplitText copy={heading} role="test" /></h4>
                                    </div>
                                </div>}
                                <div className="col-lg-9">
                                    <div className="row">
                                        {boxInfo.map((info, index) => {
                                            const { name, image, slug, uri } = info;
                                            return (
                                                <div className="col-xl-4 col-md-6" key={index}>
                                                    <div className='productbox'>
                                                        <Link href={uri}>
                                                            <div className="electroImg">
                                                                <Image src={image ? image.sourceUrl : electroImg} width={353} height={350} alt="electroImg" />
                                                            </div>
                                                            <div className='electroTtl'>
                                                                <span>{name}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}


export default ElectroType;