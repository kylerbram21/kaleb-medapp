import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./home/Home";
import Goals from "./goals/Goals"
import Workout from "./workout/Workout";
import Rest from "./rest/Rest";
import Health from "./health/Health";


const Pages = () => {

    return(
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/workout" element={<Workout />} />
          <Route path="/rest" element={<Rest />} />
          <Route path="/health" element={<Health />} />
        </Routes>
    )
}

export default Pages;