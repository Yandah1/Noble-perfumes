"use client"
import { persistStore } from 'redux-persist'
import { Provider } from "react-redux"
import { store } from "./store"
import React from "react"

export default function Providers({children}: {children: React.ReactNode}) {
    return <Provider store={store}>{children}</Provider>
}

export let persistor = persistStore(store);
