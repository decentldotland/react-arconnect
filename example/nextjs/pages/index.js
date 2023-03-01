import React from 'react';
import { AnsProvider, Badge, useAns } from 'ans-for-all';
import { Custom_Badge } from '../components/custom'

export default function Home() {

  return (
    <AnsProvider>
      <div className="mb-2">
        <Name />
      </div>

      <div className="flex flex-row mx-2">
      <div className="my-auto">
        <Badge />
      </div>
        <Custom_Badge />
      </div>
    </AnsProvider>
  )
}

export function Name() {

  const {
    address,
    walletConnected,
    ansData,

  } = useAns();

  return (
    walletConnected ?
      <>
        <h1 className="text-3xl font-bold underline" style={{ color: ansData?.address_color }}>
          Welcome {ansData?.currentLabel}
        </h1>
        <br />
        <h1 className="text-xl font-bold" style={{ color: ansData?.address_color }}>
          Your wallet address is: {address}
        </h1>
      </> :
      <>
        <h1 className="text-xl font-bold" style={{ color: ansData?.address_color }}>
          Please Login using an Arweave Wallet
        </h1>
      </>
  )
}