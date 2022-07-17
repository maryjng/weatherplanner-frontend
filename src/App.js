import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode"
import NewApptForm from "./NewApptForm"
// import { BrowserRouter } from "react-router-dom";
// import UserContext from "./UserContext"
// import useLocalStorageState from "./hooks/useLocalStorageState"
import jwt from "jsonwebtoken";
import axios from "axios"


function App() {
  var client;

  // function handleCallbackResponse(response){ 
  //   console.log("JWT token: " + response.credential);
  //   var userObject = jwt_decode(response.credential)
  //   console.log(userObject)
  //   console.log(response)
  // }

  
  useEffect(() => { 
  }, []);

  return (
    <div className="App">
      <div id="signIn"></div>
    </div>
  );
}

export default App;