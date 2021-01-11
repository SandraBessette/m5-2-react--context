import React from "react";

export default function usePersistedState(initialValue, key) {
  const [value, setValue] = React.useState(initialValue); 

  React.useEffect(() => {
    const storedValue = JSON.parse(window.localStorage.getItem(key));   
    if (storedValue)
        setValue(storedValue);  
   
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));     
  }, [value, key]);

  return  [value, setValue];
}

