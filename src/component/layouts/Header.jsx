import Image from "next/image";
import Link from "next/link";
import React, { useState, useContext, useEffect } from "react";
import Logo from "../Svgs/Logo";
import Search from "../Svgs/Search";
import InnerMenu from "../InnerMenu";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import mobilearrow from '@/asset/images/mobilearrow.svg';
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const Header = ({ headerClass, loader }) => {
  useEffect(() => {
    gsap.set(".fadeInUp", { y: "30%", opacity: 0, });
    ScrollTrigger.batch(".fadeInUp", {
      onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.3, stagger: 0.2, y: 0 }),
    });
    gsap.set(".fadeInUp-btn", { y: "30%", opacity: 0, });
    ScrollTrigger.batch(".fadeInUp-btn", {
      onEnter: batch => gsap.to(batch, { opacity: 1, duration: .8, delay: 0.6, stagger: 0.2, y: 0 }),
    });
  }, [])

  // console.log("FROM HEADER")
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const [isHovered, setIsHovered] = useState(false);

  const [menuBtn, setMenuBtn] = useState(false);
  const [megamenuBtn, setmegaMenuBtn] = useState(null);
  const [submenuClass, setsubmenuClass] = useState(null);
  const [isMobile, setIsMobile] = useState(false);



  const menuHandler = () => {
    setMenuBtn(!menuBtn);
    setmegaMenuBtn(null);
    setsubmenuClass(null);
  }

  const megamenuHandler = (e, indexnum, url,isSubMenu) => {
    e.preventDefault();
    if (!isMobile) {
      if (url && url != '#') {
        router.push({
          pathname: url,
        });
      }
    }else{
      if(!isSubMenu){
        if (url && url != '#') {
          router.push({
            pathname: url,
          });
        }
      }
    }
    setmegaMenuBtn(indexnum);
  }

  const backBtnHander = (e) => {
    e.preventDefault();
    setmegaMenuBtn(null);
  }

  const submenuHandler = (e, cls, url) => {
    e.preventDefault();
    if (!isMobile) {
      if (url) {
        router.push({
          pathname: url,
        });
      }
    }
    setsubmenuClass(cls);
  }

  const searchBoxHandler = (e) => {
    e.preventDefault()

    if (searchValue.trim() != '') {
      router.push({
        pathname: '/search', // Replace '/search' with your actual search page route
        query: { s: searchValue },
      });
      // setSearchValue("");
    }
    // Redirect to the search page with the query parameter
  }

  const searchChangeHandler = (e) => {
    setSearchValue(e.target.value);
  }

  const searchHandler = () => {
    if (isMobile) {
      setSearchActive(true);
    } else {
      setSearchActive(!searchActive);
    }
  };

  const closeSearchHandler = () => {
    setSearchActive(false);
  }

  const headerClassAdding = () => { }

  const app = useContext(AppContext);
  let HeaderMenu = app?.HeaderMenu;

  const three_column_submenu = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
  let three_column_menu_title = '';
  let three_column_menu_uri = '';
  let sub_column_one_data = [];
  let sub_column_two_data = [];
  let sub_column_three_data = [];
  let second_column_data = [];
  let third_column_data = [];
  let fourth_column_data = [];

  if (headerClass == '') {
    headerClass = 'header';
  }

  const [scrolled, setScrolled] = useState(false)
  const [hoverClass, setHoverClass] = useState("")
  useEffect(() => {
    const handleScroll = e => {
      setScrolled(window.scrollY > 1)
    }
    window.addEventListener("scroll", handleScroll)
  }, [])

  const addHoverClassHandler = () => {
    setHoverClass("hoverActive");
  }
  const removeHoverClassHandler = () => {
    setHoverClass("");
  }

  // to remove class when any page chage of to close dropdown menu in header
  useEffect(() => {
    if (menuBtn) {
      document.body.classList.add("openWin");
    } else {
      document.body.classList.remove("openWin");
    }
  }, [menuBtn])


  useEffect(() => {
    const handleRouteChange = (url) => {
      setMenuBtn(false);
      setHoverClass("");
      // setmegaMenuBtn(null);
    };
    // Listen for route changes
    router.events.on('routeChangeStart', handleRouteChange);

    // Clean up the event listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);


  // Check if user in mobile screen or not 991 and below is mobile above 991 is desktop
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 991px)');

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    setIsMobile(mediaQuery.matches); // Set initial value

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <div className={`header-wraper ${headerClass}`} >
      <header className={`headerBar ${scrolled ? 'active' : ''} ${hoverClass} ${menuBtn ? 'openNav' : ''}`} id="header">
        <div className="navBar">
          <div className="container">
            <div className="navigationBar">
              <div className={`headLogo ${menuBtn ? 'bluelogo' : ' '}`}>
                <Link href="/">
                  <Logo logo_svg={app?.theme_settings?.headerLogo} />
                </Link>
              </div>
              <div className={`menu-toggler ${menuBtn ? 'active' : ' '}`} onClick={menuHandler}>
                <div className="menu-toggler-icon"></div>
              </div>
              <div className='navWrapper'>
                {HeaderMenu?.length ? (
                  <div className={`navWrap ${menuBtn ? 'slide' : ' '}`}>
                    <ul>
                      {HeaderMenu?.map((menuItem, mainIndex) => {
                        let itemSubmenu = menuItem?.node?.childItems?.edges;
                        let itemHasSubmenu = itemSubmenu?.length;
                        let title = menuItem?.node?.label;
                        let uri = menuItem?.node?.uri;
                        let mainClass = menuItem?.node?.cssClasses;
                        return (
                          <li className={itemHasSubmenu ? "submenu" : null} key={mainIndex} onMouseEnter={addHoverClassHandler} onMouseLeave={removeHoverClassHandler}>
                            <Link href={uri || "#"} onMouseEnter={addHoverClassHandler} onMouseLeave={removeHoverClassHandler} onClick={(e) => megamenuHandler(e, mainIndex, uri,itemHasSubmenu ? true : false)}>{title} </Link>
                            {itemHasSubmenu ? <Link href={"#"} onClick={(e) => megamenuHandler(e, mainIndex,"",itemHasSubmenu ? true : false)} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link> : ""}
                            {itemHasSubmenu && mainClass == 'megamenu' ? (
                              <div className={`megaMenu ${megamenuBtn == mainIndex ? 'megaslide' : ' '}`} onMouseEnter={addHoverClassHandler} onMouseLeave={removeHoverClassHandler}>
                                <div className="container">
                                  <span className="backbtn"><Link href={"#"} onClick={(e) => backBtnHander(e)}>Back</Link></span>
                                  <div className="megaMenu_inner">
                                    {itemSubmenu.map((submenu) => {
                                      let mainCatClasses = submenu.node.cssClasses;
                                      let mainCatLabel = submenu.node.label;
                                      let mainCatUri = submenu.node.uri;

                                      let isThreeColumnLayout = false;
                                      let isSecondColumn = false;
                                      let isthirdColumn = false;
                                      let isFourthColumn = false;

                                      if (mainCatClasses.includes("three_columns")) {
                                        isThreeColumnLayout = true;
                                      } else if (mainCatClasses.includes("second_column")) {
                                        isSecondColumn = true;
                                      } else if (mainCatClasses.includes("third_column")) {
                                        isthirdColumn = true;
                                      } else if (mainCatClasses.includes("fourth_column")) {
                                        isFourthColumn = true;
                                      }

                                      let itemSubCat = submenu?.node?.childItems?.edges;
                                      let itemHasSubCat = itemSubCat?.length;

                                      if (isThreeColumnLayout) {
                                        three_column_menu_title = mainCatLabel;
                                        three_column_menu_uri = mainCatUri;
                                        itemSubCat.map(subcat => {
                                          let subCatClasses = subcat.node.cssClasses;
                                          if (subCatClasses.includes("sub_column_1")) {
                                            sub_column_one_data.push(subcat);
                                          } else if (subCatClasses.includes("sub_column_2")) {
                                            sub_column_two_data.push(subcat);
                                          } else if (subCatClasses.includes("sub_column_3")) {
                                            sub_column_three_data.push(subcat);
                                          }
                                        })
                                      } else if (isSecondColumn) {
                                        second_column_data.push(submenu);
                                      } else if (isthirdColumn) {
                                        third_column_data.push(submenu);
                                      } else if (isFourthColumn) {
                                        fourth_column_data.push(submenu);
                                      }
                                    })}
                                    {
                                      (three_column_menu_title != '' || sub_column_one_data || sub_column_two_data || sub_column_three_data) &&
                                      <div className={`megacol f1 ${submenuClass == '3column' ? 'megasubslide' : ''}`}  >
                                        {
                                          three_column_menu_title &&
                                          <div className="menutitlewithbtn" onClick={(e) => submenuHandler(e, "3column", three_column_menu_uri || "#")}>
                                            <Link href={three_column_menu_uri || "#"} >
                                              {three_column_menu_title}
                                            </Link>
                                            {(sub_column_one_data || sub_column_two_data || sub_column_three_data) && <Link href={"#"} onClick={(e) => submenuHandler(e, "3column")} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link>}
                                          </div>
                                        }
                                        {(sub_column_one_data || sub_column_two_data || sub_column_three_data) &&
                                          <div className="innersubmenu">
                                            {
                                              sub_column_one_data &&
                                              <div className="innersub">
                                                {sub_column_one_data.map((subcolone, index) => (
                                                  <InnerMenu data={subcolone} key={index} />
                                                ))}
                                              </div>
                                            }
                                            {
                                              sub_column_two_data &&
                                              <div className="innersub">
                                                {sub_column_two_data.map((subcolone, index) => (
                                                  <InnerMenu data={subcolone} key={index} />
                                                ))}
                                              </div>
                                            }
                                            {
                                              sub_column_three_data &&
                                              <div className="innersub">
                                                {sub_column_three_data.map((subcolone, index) => (
                                                  <InnerMenu data={subcolone} key={index} />
                                                ))}
                                              </div>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                    {
                                      second_column_data
                                      &&
                                      <div className={`megacol f2 ${submenuClass == 'secondColumn' ? 'megasubslide' : ''}`}>
                                        {second_column_data.map((secondColumn, index) => {
                                          let secondColumnLable = secondColumn.node.label;
                                          let secondColumnUri = secondColumn.node.uri;
                                          let secondColumnData = secondColumn.node?.childItems.edges;
                                          return <React.Fragment key={index}>
                                            <div className="menutitlewithbtn" onClick={(e) => submenuHandler(e, "secondColumn", secondColumnUri || "#")}>
                                              <Link href={secondColumnUri || "#"} >
                                                {secondColumnLable}
                                              </Link>
                                              {secondColumnData && <Link href={"#"} onClick={(e) => submenuHandler(e, "secondColumn")} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link>}
                                            </div>
                                            {secondColumnData &&
                                              secondColumnData.map((secondColumnData, index) => {
                                                return <InnerMenu data={secondColumnData} key={index} />
                                              })
                                            }
                                          </React.Fragment>
                                        })}
                                      </div>
                                    }
                                    {third_column_data
                                      &&
                                      <div className="megacoleb">
                                        {third_column_data.map((thirdColumn, index) => {
                                          let thirdColumnLable = thirdColumn.node.label;
                                          let thirdColumnUri = thirdColumn.node.uri;
                                          let thirdColumnClasses = thirdColumn.node.cssClasses;
                                          let thirdColumbnData = thirdColumn.node?.childItems.edges;
                                          if (thirdColumnClasses.includes("remove_bold")) {
                                            return (
                                              <div className={`megacol ${submenuClass == `thirdColumn_${index}` ? 'megasubslide' : ''}`} key={index}>
                                                <Link href={thirdColumnUri || "#"}>{thirdColumnLable}</Link>
                                                {thirdColumbnData.length > 0 &&
                                                  <>
                                                    <Link href={"#"} onClick={(e) => submenuHandler(e, `thirdColumn_${index}`, thirdColumnUri || "#")} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link>
                                                    <div className="innerMenu">
                                                      <ul>
                                                        {
                                                          thirdColumbnData.map((thirdColumbnData, index) => {
                                                            let thirdColumnLable = thirdColumbnData.node.label;
                                                            let thirdColumnUri = thirdColumbnData.node.uri;
                                                            return <li key={index}><Link href={thirdColumnUri}>{thirdColumnLable}</Link></li>
                                                          })
                                                        }
                                                      </ul>
                                                    </div>
                                                  </>
                                                }
                                              </div>
                                            )
                                          } else {
                                            return (
                                              <div className={`megacol ${submenuClass == `thirdColumn_${index}` ? 'megasubslide' : ''}`} key={index}>
                                                <Link href={thirdColumnUri || "#"}>{thirdColumnLable}</Link>
                                                {thirdColumbnData.length > 0 &&
                                                  <>
                                                    <Link href={"#"} onClick={(e) => submenuHandler(e, `thirdColumn_${index}`, thirdColumnUri || "#")} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link>
                                                    {thirdColumbnData.map((thirdColumbnData, index) => {
                                                      return <InnerMenu data={thirdColumbnData} key={index} />
                                                    })}
                                                  </>
                                                }
                                              </div>
                                            )
                                          }
                                        })}
                                      </div>
                                    }
                                    {fourth_column_data
                                      &&
                                      <div className="rem-menu">
                                        {fourth_column_data.map((fourthColumn, index) => {
                                          let fourthColumnLable = fourthColumn.node.label;
                                          let fourthColumnUri = fourthColumn.node.uri;
                                          let fourthColumbnData = fourthColumn.node?.childItems.edges;
                                          return (
                                            <div className={`megacol ${submenuClass == `fourthColumn_${index}` ? 'megasubslide' : ''}`} key={index}>
                                              <Link href={fourthColumnUri || "#"}>{fourthColumnLable}</Link>
                                              {fourthColumbnData.length > 0 &&
                                                <>
                                                  <Link href={"#"} onClick={(e) => submenuHandler(e, `fourthColumn_${index}`, fourthColumnUri || "#")} className="mobilearr"><Image src={mobilearrow} alt="mobilearrow" /></Link>
                                                  {fourthColumbnData.map((fourthColumbnData, index) => {
                                                    return <InnerMenu data={fourthColumbnData} key={index} />
                                                  })}
                                                </>
                                              }
                                            </div>
                                          )
                                        })}
                                      </div>
                                    }
                                  </div>
                                </div>
                              </div>
                            ) : null}
                            {(itemHasSubmenu && mainClass != 'megamenu') ? (
                              <div className={`smallmenu ${megamenuBtn == mainIndex ? 'megaslide' : ' '}`} onMouseEnter={addHoverClassHandler} onMouseLeave={removeHoverClassHandler}>
                                <span className="backbtn"><Link href={"#"} onClick={(e) => backBtnHander(e)}>Back</Link></span>
                                <ul>
                                  {itemSubmenu.map((submenu, index) => {
                                    let mainCatClasses = submenu.node.cssClasses;
                                    let mainCatLabel = submenu.node.label;
                                    let mainCatUri = submenu.node.uri;
                                    return <li key={index} onClick={(e) => megamenuHandler(e, mainIndex)}><Link href={mainCatUri.trim() || 'javscript:void(0)'}>{mainCatLabel}</Link></li>
                                  })}
                                </ul>
                              </div>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                    {app?.theme_settings.inventoryButtonInfo && <div className="btnbox">
                      <Link href={app?.theme_settings.inventoryButtonInfo.url} target={app?.theme_settings.inventoryButtonInfo.target} className="elcom-btn secondary-btn">{app?.theme_settings.inventoryButtonInfo.title}</Link>
                    </div>}
                  </div>
                ) : null}

                <div className={`serchGrp ${searchActive ? "searchMainactive" : ""} `}>
                  <div
                    className={`searchBar ${searchActive ? "active" : ""} `}
                    onClick={searchHandler}
                  >
                    <form action="" onSubmit={searchBoxHandler}>
                      <div className="search">
                        <input
                          type="text"
                          value={searchValue}
                          placeholder={app?.theme_settings.searchBoxText}
                          onChange={searchChangeHandler}
                        />
                        <button>
                          <Search />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="serch_close-btn" onClick={closeSearchHandler}>
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L25 25"
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                      <path
                        d="M25 1L1 25"
                        stroke="#FFF"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>  
  );
};

export default Header;
