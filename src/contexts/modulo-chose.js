import React, { createContext, useState } from "react";

const Context = React.createContext({modulo_id: 0});

export const ContextProvider: React.FC = ({children}) => {

    const [ modulo, setModulo ] = useState({ id: 0 });

    function SetModuloChoose(id) {
        setModulo(id)
    }

    return (
        <Context.Provider value={{ modulo_choose: modulo, SetModuloChoose }}>
            {children}
        </Context.Provider>
    )
}


export default Context;