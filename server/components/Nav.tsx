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
              <button
                className="btn-yellow mx-2"
               
              >
                Sign Up
              </button>
            </li>
          </>
      </ul>
      
    </nav>
  )
}