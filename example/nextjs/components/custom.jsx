import * as React from 'react';


import { useAns } from 'ans-for-all';

export const Custom_Badge = () => {

    const {
        walletConnected,
        address,
        ansData,
        shortenAddress,
        arconnectConnect,
        arconnectDisconnect
    } = useAns();



    return (
        <>
            {(walletConnected && (
                <div onClick={arconnectDisconnect}>
                        {(ansData?.avatar === "") ?
                            <div className="mx-auto rounded-full h-12 w-12 ml-2" style={{ backgroundColor: ansData?.address_color, border: `2px solid ${ansData?.address_color}` }}></div> :
                            <div className="mx-auto rounded-full h-12 w-12 overflow-hidden ml-2" style={{ backgroundColor: ansData?.address_color, border: `2px solid ${ansData?.address_color}`}}>
                                <img src={`https://arweave.net/${ansData?.avatar}`} alt="Profile" width="100%" height="100%" />
                            </div>}
                </div>
            )) || (
                    <div
                        className='flex btn btn-primary rounded-full h-12 w-12 ml-2 text-sm md:text-base'
                        onClick={arconnectConnect}
                    >
                        <img className='w-3.5 h-3.5 md:w-4 md:h-4 mx-auto my-auto' src="https://nanofuxion.ar.page/favicon.png"></img>
                    </div>
                )}
        </>
    )
}