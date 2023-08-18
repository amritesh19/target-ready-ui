import React, { createContext,useContext,useState } from "react";
const SelectedClassContext = createContext();


const SelectedClassProvider = ({ children })  => {
  let [selectedClass, setSelectedClass] = useState("");
  setSelectedClass(0);

  return (
    <SelectedClassContext.Provider value={{ selectedClass, setSelectedClass }}>
      {children}
    </SelectedClassContext.Provider>
  );
};

export { SelectedClassContext, SelectedClassProvider };
