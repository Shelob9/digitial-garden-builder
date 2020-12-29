import { useState } from 'react'


export default function Nav() {
  return (
    <nav className="container mx-auto">
      <ul className="flex justify-end items-center p-8">
          <>
            <li>
              <button
                className="font-bold mx-2"
              >
                Log In
              </button>
            </li>
            <li>
              <a
className="font-bold mx-2"              href={'https://docs.google.com/forms/d/e/1FAIpQLSceXRwG_NQ-5sy1lcP613uS_BH2H1JqhuGOzOWbai7XClK3Cw/viewform'}
              >
                Sign Up
              </a>
            </li>
          </>
      </ul>
      
    </nav>
  )
}