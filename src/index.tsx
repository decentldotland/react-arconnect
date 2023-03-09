import React, { useState, useEffect, useContext, createContext } from 'react';
import { AppInfo, GatewayConfig, PermissionType } from 'arconnect';

export type AlgorithmInterface =
  | AlgorithmIdentifier
  | RsaPssParams
  | EcdsaParams;

export interface options {
  algorithm: string;
  hash: string;
  salt?: string;
}

export interface ANS {
  address_color: string;
  currentLabel: string;
  avatar: string;
}

export type createSignatureInterface = (
  data: Uint8Array,
  signatureParams: AlgorithmInterface
) => Promise<Uint8Array | undefined>;

export type encryptInterface = (
  options: {
    name: string;
    hash?: string;
    salt?: string;
  },
  data: BufferSource
) => Promise<Uint8Array>;

export type decryptInterface = (
  data: Uint8Array,
  algorithm: options
) => Promise<string>;

export type arconnectConnectInterface = (
  permissions: PermissionType[],
  appInfo?: AppInfo,
  gatewayConfig?: GatewayConfig
) => Promise<void>;

export interface ArconnectContextInterface {
  walletPermissions: PermissionType[];
  walletConnected: boolean;
  address: string;
  ANS: ANS | undefined;
  arconnectConnect: arconnectConnectInterface;
  arconnectDisconnect: () => Promise<void>;
  getPublicKey: () => Promise<string>;
  createSignature: createSignatureInterface;
  encrypt: encryptInterface;
  decrypt: decryptInterface;
  shortenAddress: (address: string) => string;
}

export const defaultSignatureParams = { name: 'RSA-PSS', saltLength: 32 };
export const defaultAlgorithmParams = {
  name: 'RSA-PSS',
  hash: 'sha256',
  saltLength: 32,
};

export const ANS_URL = 'https://ans-resolver.herokuapp.com/resolve-as-arpage/';

export const ArConnectAllPermissions: PermissionType[] = [
  'ACCESS_ADDRESS',
  'ACCESS_PUBLIC_KEY',
  'ACCESS_ALL_ADDRESSES',
  'SIGN_TRANSACTION',
  'ENCRYPT',
  'DECRYPT',
  'SIGNATURE',
  'ACCESS_ARWEAVE_CONFIG',
  'DISPATCH',
];

export const ArconnectContext = createContext<
  Partial<ArconnectContextInterface>
>({} as ArconnectContextInterface);

export function useArconnect(): Partial<ArconnectContextInterface> {
  const useArconnectContext: Partial<ArconnectContextInterface> = useContext(
    ArconnectContext
  );

  if (useArconnectContext === null) {
    throw new Error(
      'useArconnect() can only be used inside of <ArconnectProvider />, ' +
        'please declare it at a higher level.'
    );
  }

  return useArconnectContext;
}

type Props = {
  children: any;
};

export const ArconnectProvider = (props: Props) => {
  const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [ANS, setANS] = useState<ANS | undefined>();
  const [walletPermissions, setWalletPermissions] = useState<PermissionType[]>(
    []
  );

  const arconnectConnect: arconnectConnectInterface = async (
    permissions,
    appInfo,
    gatewayConfig
  ) => {
    try {
      if (!window.arweaveWallet)
        throw new Error('No ArConnect wallet detected');
      if (permissions.length === 0 || !permissions?.includes('ACCESS_ADDRESS'))
        throw new Error(
          'ArConnect requires ACCESS_ADDRESS permission to connect'
        );
      let currentPerms = await window.arweaveWallet.getPermissions();
      if (currentPerms.length === 0)
        await window.arweaveWallet.connect(permissions, appInfo, gatewayConfig);
      currentPerms = await window.arweaveWallet.getPermissions();
      const correctPerms =
        permissions.sort().toString() === currentPerms.sort().toString();

      if (!correctPerms) {
        await window.arweaveWallet.disconnect();
        if (currentPerms.length !== 0)
          throw new Error('Re-connect with correct permissions');
        return;
      }
      setWalletPermissions(permissions);
      setAddress(await _getAddress());
      setWalletConnected(true);
    } catch (Error) {
      console.error(Error);
    }
  };

  const arconnectDisconnect = async () => {
    try {
      await window.arweaveWallet.disconnect();
      setWalletConnected(false);
      setAddress(undefined);
      setWalletPermissions([]);
    } catch (Error) {
      console.error(Error);
    }
  };

  const getPublicKey = async () => {
    try {
      return await window.arweaveWallet.getActivePublicKey();
    } catch (Error) {
      console.error(Error);
      return '';
    }
  };

  // example of params for signature generation:
  // data: new TextEncoder().encode("Hello world!");
  // signatureParams: defaultSignatureParams

  const createSignature: createSignatureInterface = async (
    data,
    signatureParams
  ) => {
    try {
      const signature = await window.arweaveWallet.signature(
        data,
        signatureParams
      );
      if (!signature) throw new Error('ArConnect signature generation failed');

      return signature;
    } catch (Error) {
      console.error(Error);
      return undefined;
    }
  };

  // TODO: NEEDS FURTHER IMPROVEMENT
  const encrypt: encryptInterface = async (options, data) => {
    // @ts-ignore
    const encryptedData = await window.arweaveWallet.encrypt(data, options);
    return encryptedData;
  };

  // TODO: NEEDS FURTHER IMPROVEMENT
  const decrypt: decryptInterface = async (data, options) => {
    const decryptedData = await window.arweaveWallet.decrypt(data, options);
    return decryptedData;
  };

  const shortenAddress = (address: string, maxLength = 20) => {
    // to avoid trimming small names by default
    if (address.length < maxLength) return address;

    return (
      address.substring(0, maxLength / 2) +
      '...' +
      address.substring(address.length - maxLength / 2, address.length)
    );
  };

  // wallet address change event
  // when the user switches wallets
  const _walletSwitchEvent = async (e: any) => {
    setAddress(e.detail.address);
  };

  const _walletLoadedEvent = async () => {
    try {
      const addr = await _getAddress();
      setAddress(addr);
      // @ts-ignore
      setANS(res);
      setWalletConnected(true);
    } catch {
      setAddress(undefined);
      setWalletConnected(false);
    }
  };

  const _getAddress = () => window.arweaveWallet.getActiveAddress();

  const _fetchANS = async (address: string) => {
    try {
      if (!address) throw new Error('No address detected');
      const response = await fetch(ANS_URL + address);
      let ans: ANS | undefined;
      try {
        ans = await response.json();
      } catch {
        console.warn(`address ${address} not found`);
        ans = undefined;
      }

      return {
        address_color: ans?.address_color,
        currentLabel: ans?.currentLabel,
        avatar: ans?.avatar,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  useEffect(() => {
    // add ArConnect event listeners
    window.addEventListener('arweaveWalletLoaded', _walletLoadedEvent);
    window.addEventListener('walletSwitch', _walletSwitchEvent);
    return () => {
      // remove ArConnect event listeners
      window.removeEventListener('arweaveWalletLoaded', _walletLoadedEvent);
      window.removeEventListener('walletSwitch', _walletSwitchEvent);
    };
  });

  useEffect(() => {
    const fetchANSData = async () => {
      if (!address) return;
      const data = await _fetchANS(address);
      if (data) setANS({ ...data });
    };

    fetchANSData();
  }, [address]);

  useEffect(() => {
    let apiInjected = false;

    const loadedEvent = async () => {
      if (address) return;
      apiInjected = true;

      try {
        const currentPerms = await window.arweaveWallet.getPermissions();
        const correctPerms =
          walletPermissions.sort().toString() == currentPerms.sort().toString();
        if (!correctPerms) {
          await window.arweaveWallet.disconnect();
          if (currentPerms.length !== 0)
            throw new Error('Re-connect with correct permissions.');
          return;
        } else {
          setWalletPermissions(currentPerms);
        }
        const addr = await window.arweaveWallet.getActiveAddress();
        setAddress(addr);
        _fetchANS(addr).then(setANS);
      } catch {}
    };

    window.addEventListener('arweaveWalletLoaded', loadedEvent);

    // double check if arconnect was added
    setTimeout(() => {
      if (apiInjected || !window.arweaveWallet) return;
      loadedEvent();
    }, 1000);

    return () => window.removeEventListener('arweaveWalletLoaded', loadedEvent);
  }, []);

  return (
    <ArconnectContext.Provider
      value={{
        walletPermissions,
        walletConnected,
        address,
        ANS,
        arconnectConnect,
        arconnectDisconnect,
        getPublicKey,
        createSignature,
        decrypt,
        encrypt,
        shortenAddress,
      }}
    >
      {props.children}
    </ArconnectContext.Provider>
  );
};
