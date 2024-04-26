import { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Image from "next/image";
const ProductSecScrollAnimation = ({ certificationsList }) => {
    gsap.registerPlugin(ScrollTrigger);

    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    // const childTrigerRefs = certificationsList.map(() => useRef(null));
    useEffect(() => {
        setTimeout(function () {
            document.body.classList.add("class-for-animation");
        }, 1000)
    });

    useLayoutEffect(() => {


        let ctx = gsap.context(() => {
            const triggerHeight = sectionRef.current.offsetHeight;
            certificationsList.forEach((section, index) => {
                const q = gsap.utils.selector(childTrigerRefs[index].current)

                const ChildElAnime = gsap.fromTo(
                    q(".productinner"),
                    {
                        // maxHeight:0,
                    },
                    {
                        maxHeight: 350,
                        duration: 1,
                        scrollTrigger: {
                            trigger: childTrigerRefs[index].current,
                            start: "top center",
                            end: "bottom center",
                            markers: true,
                            scrub: 1,
                            onEnter: console.log('is enter'),
                            onLeave: console.log('is Leave'),
                            // onUpdate: self => console.log("progress", self.progress),
                            // onToggle: (self) => {
                            //     self.style.color('#000000');
                            // },
                            // toggleClass: "animation-class",
                        },
                    }
                );
            });

            const pin = gsap.fromTo(
                sectionRef.current,
                {},
                {
                    ease: "none",
                    duration: 1,
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        // end: 'center',
                        end: `+=${triggerHeight}`,
                        pin: true,
                        scrub: 2,
                        markers: false,
                    },
                }
            );

        }, sectionRef, triggerRef, childTrigerRefs, certificationsList);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {(certificationsList.length > 0) && (
                <div className="productwrap" ref={triggerRef}>
                    <div className="productdtl">
                        <div className="container">
                            <div className="productsec-scroll-anime" ref={sectionRef}>
                                {certificationsList.map((data, index) => {
                                    const { certificationTitle, certificationsDescriptions, certificationsImages } = data;
                                    return (
                                        <div className="producttext" key={index} ref={childTrigerRefs[index]}>
                                            {certificationTitle && (
                                                <div className="productttl">
                                                    <h6>{certificationTitle}</h6>
                                                </div>
                                            )}
                                            {(certificationsDescriptions || certificationsImages) && (
                                                <div className="productinner">
                                                    <div className="row">
                                                        {certificationsDescriptions && (
                                                            <div className="col-lg-7">
                                                                <div
                                                                    className="innerdtl custom_html"
                                                                    dangerouslySetInnerHTML={{ __html: certificationsDescriptions }}
                                                                ></div>
                                                            </div>
                                                        )}
                                                        {certificationsImages && (
                                                            <div className="col-lg-5">
                                                                <div className="productimg">
                                                                    {certificationsImages.map((img, index) => {
                                                                        const { certificationImage } = img;
                                                                        return (
                                                                            <Image
                                                                                src={certificationImage.sourceUrl}
                                                                                width={131}
                                                                                height={120}
                                                                                alt="productimg"
                                                                                key={index}
                                                                            ></Image>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductSecScrollAnimation;
