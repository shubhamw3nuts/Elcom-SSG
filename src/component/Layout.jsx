import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import AppContext from '@/context/AppContext';
import { useContext, useEffect, useState } from "react";

const Layout = ({ children, headerClass,themeSettings }) => {
    const app = useContext(AppContext);
    // let { loading, error, data } = useQuery(GET_THEME_SETTINGS);
    // if (loading) return <LoadingCompo />;
    // if (error) return <p>Error: {error.message}</p>;
    // let theme_settings = data?.themeGeneralSettings?.theme_settings;
    // let HeaderMenu = data?.menuItems?.edges;

    let theme_settings = themeSettings?.themeGeneralSettings?.theme_settings;
    let HeaderMenu = themeSettings?.menuItems?.edges;
    // let  theme_settings = ''
    // let HeaderMenu = ''
    return (
        <>
            <AppContext.Provider value={{ theme_settings, HeaderMenu }}>
                <Header headerClass={headerClass} />
                {/* <h1>Header</h1> */}
                {children}
                {/* <h1>Footer</h1> */}
                <Footer/>
            </AppContext.Provider>
        </>
    )
}
export default Layout;