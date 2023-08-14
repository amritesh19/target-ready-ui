import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import NotFound from "./NotFound";
import Calendar from "./Calendar";
import ClassInstance from "./Class/index";
import Instructor from "./Instructor/index";
import Student from "./Student/index";
import Course from "./Course";

const PageRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/calendar" element={<Calendar />} />
      <Route exact path="/class" element={<ClassInstance />} />
      <Route exact path="/course" element={<Course />} />
      <Route exact path="/instructor" element={<Instructor />} />
      <Route exact path="/student" element={<Student />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default PageRoutes;
