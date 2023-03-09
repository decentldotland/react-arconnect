<p align="center">
  <a href="https://decent.land">
    <img src="./img/logo.png" height="124">
  </a>
  <h3 align="center"><code>@decentldotland/react-arconnect</code></h3>
  <p align="center">React Arconnect</p>
</p>


## Usage: 
Add it to your project:

```console
yarn add decentdotland/react-arconnect
```

### How to use react-arconnect in your React app:

```tsx 
//App.js | index.js

import React from 'react';
import { ArconnectProvider, ArconnectContext } from 'react-arconnect';

//wrap the root component with <ArconnectProvider />
export default function Home() {

  return (
    <ArconnectProvider>
      <Name />
    </ArconnectProvider>
  )
}


```

## API

### &lt;ArconnectProvider />

This is the provider component. It should be placed above all components using `useArconnect()`.

### useArconnect

This is the hook to be used throughout the app. It returns an object containing: 
  - [walletPermissions](#walletPermissions)
  - [walletConnected](#walletconnected)
  - [address](#address)
  - [ANS](#ANS)
  - [arconnectConnect](#arconnectconnect)
  - [arconnectDisconnect](#arconnectdisconnect)
  - [getPublicKey](#getPublicKey)
  - [createSignature](#createSignature)
  - [decrypt](#decrypt)
  - [encrypt](#encrypt)
  - [shortenAddress](#shortenaddress)

## walletPermissions
- `PermissionType[]`: Array of permissions granted to the site by the connected Arconnect wallet.

## walletConnected 
- `boolean`: ArConnect wallet connection state. 

## address 
- `string`: Wallet address of the currently connected Arconnect wallet.

## ANS 
  [Learn more about ANS (Arweave Name service)](https://ans.gg/)

  Returns:
  - `address_color`: The ANS profile color.
  - `currentLabel`:  The current ANS label in use.
  - `avatar`:        The TXID for the ANS Avatar Image.

## arconnectConnect
- Function used to request connecting site to ArConnect.

## arconnectDisconnect
- Function used to request disconnecting site from ArConnect.


## getPublicKey
- Function to get the public key of the connected wallet.

## createSignature
- Function to create a signature for a message.

## decrypt
- Function to decrypt a message.

## encrypt
- Function to encrypt a message.

## shortenAddress 
- Function to shorten the wallet address with ellipsis Ex: `lIg5..._3Qg`

## Examples

To run the examples, switch to the respective directories. Run `npm install` or `yarn install`, Then run `npm start dev` or `yarn dev`.

Check out our example [app](./example/nextjs) and [components](./example/nextjs/components) to see how to use `react-arconnect` in your app.

## License
This project is licensed under the [MIT license](./LICENSE)

