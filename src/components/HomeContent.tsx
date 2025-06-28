'use client';

import { Wallet } from 'lucide-react';
import React from 'react'
import {  useAccount } from 'wagmi';
import AirdropForm from '../app/AirdropForm';

const HomeContent = () => {
    const { isConnected } = useAccount();

    return (
        <>
            {
                isConnected 
                    ? (
                        <div>
                            <AirdropForm  />
                        </div>
                    )
                    : (
                        <div>
                            <div className="flex flex-col items-center justify-center h-screen">
                                <Wallet className="mb-4 text-blue-300 text-5xl" size={64}/>
                                <h1 className="text-4xl font-bold mb-4">Welcome to the Airdrop App</h1>
                                <p className="text-lg text-gray-400">Start by connecting your wallet and filling out the form.</p>
                            </div>  
                        </div>
                    )
            }
        </>
    )
}

export default HomeContent;