import React, { createContext, useState } from 'react'

export const Context = createContext(undefined)

export const Provider = ({ children }) => {
    const [bracket, setBracket] = useState({})

    return (
        <Context.Provider value={{ bracket, setBracket }}>
            {children}
        </Context.Provider>
    )
}