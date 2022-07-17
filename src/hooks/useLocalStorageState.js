import React, { useState, useEffect } from "react";

//use to store state in local storage
//state refers to the key's value in local storage
//whenever key or state changes, update local storage with key: state
//if the state has turned to null delete the key

const useLocalStorageState = (key, defaultValue=null) => {
  const [state, setState] = useState(() => {
    try {
      let value = JSON.parse(window.localStorage.getItem(key) || defaultValue);
      return value;
    } catch (e) {
        console.log("Error", e.stack)
      }
  })

  useEffect(() => {
    if (state === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, state);
    }
  }, [key, state]);


  return [state, setState];

}

export default useLocalStorageState;