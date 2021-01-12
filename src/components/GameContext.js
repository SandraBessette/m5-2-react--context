
import React from "react";
import usePersistedState from "../hooks/use-persistedState.hook";
import items from '../data';

export const GameContext = React.createContext(null);

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState(1000, "num-cookies");
    const [purchasedItems, setPurchasedItems] = usePersistedState({
        cursor: 0,
        grandma: 0,
        farm: 0,
        }, 'purchasedItems'); 

    const calculateCookiesPerSecond = (purchasedItems) => {
        return Object.keys(purchasedItems).reduce((acc, itemId) => {
            const numOwned = purchasedItems[itemId];
            const item = items.find((item) => item.id === itemId);
            const value = item.value;
              
            return acc + value * numOwned;
        }, 0);
    };

    React.useEffect(() => {
        const handleUnload = () => {              
          window.localStorage.setItem('time', JSON.stringify(Date.now())); 
        };
      
        window.addEventListener("unload", handleUnload);
    
        return () => {
          window.removeEventListener("unload", handleUnload);
        };
      }, []);    
    
      React.useEffect(() => {
        const cookieSeconde = calculateCookiesPerSecond(purchasedItems);
        if (cookieSeconde === 0)
            return;
        const storedTime = JSON.parse(window.localStorage.getItem('time')); 
        const timeDiffSeconds = Math.round((Date.now() - storedTime)/1000);         

        if (storedTime && timeDiffSeconds) {              
           setNumCookies((c) => c + cookieSeconde * timeDiffSeconds); 
        } 
        window.localStorage.setItem('time', null);        
           
    }, [setNumCookies, purchasedItems]); 
    

    return (    
     <GameContext.Provider 
        value={{
            numCookies,
            setNumCookies,
            purchasedItems,
            setPurchasedItems,
            cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
        }}
        >
        {children}
    </GameContext.Provider>);
  };