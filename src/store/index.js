import loginStore from "./Login-store"
import userStore from "./UserStore"
import React from 'react'

class RootStore {
  constructor() {
    this.loginStore = loginStore
    this.userStore = userStore
  }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }