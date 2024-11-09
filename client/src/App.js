import logo from "./logo.svg";
import "./App.css";
import Navigation from "./navigations/Navigation";
import User from "./User";
import HomeContainer from "./containers/HomeContainer";
import { useState } from "react";

function App() {
  // const [user,setUser]=useState(null);
  // const getUser=async()=>{
  //   try{
  //     const url=``
  //   }
  // }
  return (
    <div>
      <Navigation />
      {/* <User data={{ name: "Abhay", age: "21" }} /> */}
      {/* <HomeContainer/> */}
      
    </div>
  );
}

export default App;
