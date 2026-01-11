import React from "react";
import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import ApplicationForm from "./Components/ApplicationForm.jsx";


export default function Layout(){
    return(
        <>
            <Header/>
            <ApplicationForm/>
            <Footer/>
        </>
    );
}
