import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'

const Header = () => {
    return (
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
            <div className="flex items-center justify-between max-w-7xl mx-auto">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                        <span className="text-white font-bold text-sm">TS</span>
                    </div>
                    <span className="font-bold text-xl text-white">TSender</span>
                    </div>
                    <span className="text-gray-300 italic">
                    The most gas efficient airdrop contract on earth, built in huff 🏴‍☠️
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <ConnectButton/>
                </div>
                {/* <div className="flex items-center gap-4">
                    <ModeToggle />
                </div> */}
            </div>
        </header>
    )
}

export default Header
