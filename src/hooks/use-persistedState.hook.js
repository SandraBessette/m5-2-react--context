import React from "react";

export default function usePersistedState(initialValue, key) {        
 
 const [value, setValue] = React.useState(()=>{
   const storeValue = JSON.parse(window.localStorage.getItem(key));
   return storeValue ? storeValue : initialValue; 
 });

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));     
  }, [value, key]);

  return  [value, setValue];
}

