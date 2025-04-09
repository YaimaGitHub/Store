"use client"

import { CartAnimationProvider as Provider } from "./cart-animation-provider"

export function CartAnimationProvider({ children }) {
  return <Provider>{children}</Provider>
}

export default CartAnimationProvider
