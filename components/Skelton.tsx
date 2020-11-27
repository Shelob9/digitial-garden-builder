import { FC, ReactNode } from "react";
import React from 'react';
/**
 * Loading Skelton
 * 
 * Based on: https://tailwindcss.com/docs/animation#pulse
 */
const Skelton: FC<{ children?: ReactNode }> = ({ children }) => {
    
    return (
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
                {children ? children : (
                    <>
                        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                        <div className="flex-1 space-y-4 py-1">
                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-400 rounded"></div>
                                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                            </div>
                        </div>
                    </>
                    
                )}
            </div>
        </div>
    )
}

export default Skelton;