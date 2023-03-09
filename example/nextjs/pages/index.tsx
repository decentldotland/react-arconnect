import React from 'react';
import { PermissionType } from 'arconnect';
import { useArconnect } from 'react-arconnect';
import { ConnectButton, DisconnectButton } from '../components/connectButton';
import { ArconnectConnector } from '../components/exampleConnector';


const allPermissions: PermissionType[] = ["ACCESS_ADDRESS", "ACCESS_PUBLIC_KEY", "ACCESS_ALL_ADDRESSES", "SIGN_TRANSACTION", "ENCRYPT", "DECRYPT", "SIGNATURE", "ACCESS_ARWEAVE_CONFIG", "DISPATCH"];

const availablePermissions: PermissionType[] = ["ACCESS_ADDRESS", "ACCESS_ALL_ADDRESSES", "ACCESS_PUBLIC_KEY", "SIGNATURE", "ENCRYPT", "DECRYPT"];

const ArConnectAppName = "ArConnect Example Website";

const ArConnectAppLogo = "/favicon.ico";


export default function Home() {

  return (
    <main className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center">
      <Name />
    </main>
  )
};

export function Name() {

  const {
    address,
    walletConnected,
    ANS,
  } = useArconnect();

  return (
    <div>
      {walletConnected ?
        <>
          <h1 className="text-3xl font-bold flex gap-x-2 mb-4">
            Welcome <DisconnectButton />
          </h1>
          <h2 className="text-3xl font-mono font-bold mb-4">
            Your wallet address is: <p style={{ color: ANS?.address_color }}>{address}</p>
          </h2>
          <ArconnectConnector 
            allPermissions={allPermissions} 
            availablePermissions={availablePermissions}
          />
        </> :
        <>
          <h1 className="text-xl font-bold mb-4">
            Please Login using an Arweave Wallet
          </h1>
          <ConnectButton
            permissions={availablePermissions}
            ArConnectAppName={ArConnectAppName}
            ArConnectAppLogo={ArConnectAppLogo}
          />
        </>
      }
    </div>
  )
}