import React from "react";

export default function usePersistedState(initialValue, key) {         
  const [value, setValue] = React.useState(JSON.parse(window.localStorage.getItem(key)) ? JSON.parse(window.localStorage.getItem(key)) : initialValue); 

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));     
  }, [value, key]);

  return  [value, setValue];
}

