import * as React from 'react';
import './index.css';
declare type Props = {
    children: any;
};
interface IANSContext {
    walletConnected: boolean;
    address: string;
    ansData: {
        address_color: string;
        currentLabel: string;
        avatar: string;
    };
    shortenAddress: (addr: any) => any;
    arconnectConnect: () => Promise<void>;
    arconnectDisconnect: () => Promise<void>;
}
export declare const ANSContext: React.Context<Partial<IANSContext>>;
export declare function useAns(): Partial<IANSContext>;
export declare const Badge: any;
export declare const AnsProvider: (props: Props) => JSX.Element;
export {};
