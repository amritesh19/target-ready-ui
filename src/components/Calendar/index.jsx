import { styled } from "@mui/material/styles";
import { Tabs, Tab, Box } from "@mui/material";
import { useContext } from "react";
import React, { useState, useEffect } from "react";
import { UserContext } from "../UserContext";
import StudentWeeklyView from "../WeeklyView/StudentWeeklyView";
import AdminWeeklyView from "../WeeklyView/AdminWeeklyView";
import InstructorWeeklyView from "../WeeklyView/InstructorWeeklyView";

import InstructorDayView from "../DayView/InstructorDayView";
import StudentDayView from "../DayView/StudentDayView";
import AdminDayView from "../DayView/AdminDayView";
import { TabList } from "@mui/lab";
import axios from "axios";
import {
  FormControl,
}from "@mui/material";
import './index.css';


const CalendarContainer = styled(Box)({
  maxWidth: 600,
  margin: "auto",
  marginTop: "16px",
});



const Calendar = () => {
  const [data, setData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [className, setClassName] = useState('');
  const { user, login } = useContext(UserContext);
  // const alert = useAlert();
  const [selectedClass, setSelectedClass] = useState('');
  const [studentData, setStudentData] = useState();
  const [classId, setClassId] = useState();

  let role=localStorage.getItem('role');
  let id=localStorage.getItem('id');
  let classid=0;

  useEffect(() => {
    fetchData();
    if(role==='student' && classid ==0){
      fetchClassId(id);
    }
  }, []);


  const fetchClassId = (id) => {
    try{
      axios.get(`http://localhost:8087/students/${id}`)
      .then((response) => {
        const data = response.data; 
        setStudentData(response.data);
        localStorage.setItem('classid',data.classId);
        console.log("locals:"+localStorage.getItem('classid'));
        classid = localStorage.getItem('classid');
      })
    }catch(error) {
      console.log(error.response.data.error);
      alert.showAlertWithMessage(error.response.data.error, "error");
  };
  };

  const fetchData = () => {
    try{
        axios
        .get("http://localhost:8087/class")
        .then((response) => {
        console.log(response.data);
        setData(response.data);
        })
    }catch(error) {
        console.error("Error fetching class data:", error);
    };
  };

  
// console.log(selectedClass);
  const handleTabChange = (event, newValue) => {

    if( role==='admin' && selectedClass === "" ){
      alert("please select the class");
      // alert.showAlertWithMessage("Please select the class!", "error");
    }
    else{
      setSelectedTab(newValue);
    }
  };
const handleSelectedClass = (selected) => {
  setSelectedClass(selected);
  if(role==='admin' && selected !== ""){
    const breakpoint = "- "
    const splitted = selected.split(breakpoint);
    const a=parseInt(splitted[0]);
    const b=splitted[1].toString();
      // console.log(a);
      // console.log(b);


      const filtered=data.filter(obj =>{
        return obj.className===a && obj.classSection===b;
      })
    

    setClassId(filtered);
    console.log(filtered[0].classId)
    localStorage.setItem('classid',filtered[0].classId);
    localStorage.setItem('changed',true);
  }
  else if(selected === ""){
    localStorage.setItem('classid',"");
  }
}




return (
    <CalendarContainer>      
            {(role==='admin')?(
                <FormControl className="form-control">
                <select value={selectedClass} 
                      onChange={(e) => handleSelectedClass(e.target.value)}
                    PaperProps={{className: 'select-style' }}>
                    <option value="">Select Class</option>
                    {data.map(item => (
                    <option key={item.classId}>
                        {item.className + ' - ' + item.classSection}
                    </option>
                    ))}
                </select>
                </FormControl>
            ):null}
        
     
      
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {/* <TabList> */}
        <Tab label="Day View" />
        <Tab label="Week View" />
        {/* </TabList> */}
      </Tabs>
      {selectedTab === 0 && role==='admin' && <AdminDayView />}
      {selectedTab === 1 && role==='admin' && <AdminWeeklyView />}
      {selectedTab === 0 && role==='instructor' && <InstructorDayView />}
      {selectedTab === 1 && role==='instructor' && <InstructorWeeklyView />}
      {selectedTab === 0 && role==='student' && <StudentDayView />}
      {selectedTab === 1 && role==='student' && <StudentWeeklyView />}
    </CalendarContainer>
  );
}

export default Calendar;

