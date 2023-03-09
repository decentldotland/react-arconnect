import React from 'react';
import { AppInfo, GatewayConfig, PermissionType } from 'arconnect';
export declare type AlgorithmInterface = AlgorithmIdentifier | RsaPssParams | EcdsaParams;
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
export declare type createSignatureInterface = (data: Uint8Array, signatureParams: AlgorithmInterface) => Promise<Uint8Array | undefined>;
export declare type encryptInterface = (options: {
    name: string;
    hash?: string;
    salt?: string;
}, data: BufferSource) => Promise<Uint8Array>;
export declare type decryptInterface = (data: Uint8Array, algorithm: options) => Promise<string>;
export declare type arconnectConnectInterface = (permissions: PermissionType[], appInfo?: AppInfo, gatewayConfig?: GatewayConfig) => Promise<void>;
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
export declare const defaultSignatureParams: {
    name: string;
    saltLength: number;
};
export declare const defaultAlgorithmParams: {
    name: string;
    hash: string;
    saltLength: number;
};
export declare const ANS_URL = "https://ans-resolver.herokuapp.com/resolve-as-arpage/";
export declare const ArconnectContext: React.Context<Partial<ArconnectContextInterface>>;
export declare function useArconnect(): Partial<ArconnectContextInterface>;
declare type Props = {
    children: any;
};
export declare const ArconnectProvider: (props: Props) => JSX.Element;
export {};
