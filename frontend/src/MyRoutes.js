import React from "react";
import {Routes, Route} from "react-router-dom";
import AirlineSearch from "./components/AirlineSearch";
import AirlineSearchResult from "./components/AirlineSearchResult";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AirlineSearch/>} />
            <Route path="/search" element={<AirlineSearchResult/>} />
        </Routes>
    );
}

export default MyRoutes;