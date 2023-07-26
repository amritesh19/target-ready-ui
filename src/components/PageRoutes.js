import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import Calendar from "./Calendar";
import Class from "./Class/index";
import Instructor from "./Instructor/index";
import ViewTimeTable from "./ViewTimeTable";

const PageRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/calendar" element={<Calendar />} />
      <Route exact path="/class" element={<Class />} />
      <Route exact path="/instructor" element={<Instructor />} />
      <Route exact path="/viewtimetable" element={<ViewTimeTable />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default PageRoutes;
