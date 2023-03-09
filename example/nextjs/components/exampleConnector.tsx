import * as React from 'react';
import { PermissionType } from 'arconnect';
import { defaultAlgorithmParams, defaultSignatureParams, useArconnect } from 'react-arconnect';
import Permission from './permission';

export interface ArconnectConnectorInterface {
  allPermissions: PermissionType[];
  availablePermissions: PermissionType[];
};

export const ArconnectConnector: React.FC<ArconnectConnectorInterface> = ({ allPermissions, availablePermissions }) => {

  const {
    getPublicKey,
    createSignature,
    encrypt,
  } = useArconnect();

  const [signature, setSignature] = React.useState<string>('');
  const [publicKey, setPublicKey] = React.useState<string>('');

  const buttonClass = "border-2 rounded-lg border-white px-2 py-0.5";

  const SignatureForm = () => {
    const [message, setMessage] = React.useState<string>('');

    const sign = async (message: string) => {
      const data = new TextEncoder().encode(message);
      const signature = await createSignature(data, defaultSignatureParams);
      return signature;
    };

    return (
      <div className="flex items-center gap-x-2 mb-4">
        <input
          value={message}
          placeholder={"Signature Message"}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent border-2 border-white rounded-lg px-2.5 py-0.5"
        />
        <button className={buttonClass} onClick={() => {
          //@ts-ignore
          sign(message, true).then((result) => {console.log(result); setSignature(result)});
        }}>Create Signature</button>
        <div className="text-teal-50 max-w-[300px]">{signature && "Check console!"}</div>
      </div>
    )
  }

  const EncryptForm = () => {
    const [message, setMessage] = React.useState<string>('');
    const [encryption, setEncryption] = React.useState<string>('');

    const encryptFunc = async (message: string) => {
      const data = new TextEncoder().encode(message);
      const encryptedData = await encrypt(defaultAlgorithmParams, data);
      console.log(encryptedData)
      return encryptedData;
    };

    return (
      <div className="flex items-center gap-x-2 mb-4">
        <input
          value={message}
          placeholder={"Encryption Message"}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-transparent border-2 border-white rounded-lg px-2.5 py-0.5"
        />
        <button className={buttonClass} onClick={() => {
          //@ts-ignore
          encryptFunc(message, true).then(setEncryption);
        }}>Create Encrypted Text</button>
        <div className="text-teal-50 max-w-[300px]">{encryption && "Check console!"}</div>
      </div>
    )
  }



  return (
    <div className="">
      <div className="max-w-[300px] my-2">
        <h1 className="text-2xl font-bold mb-2">Permissions:</h1>
        {allPermissions.map((perm: PermissionType, idx: number) => <Permission walletPermissions={availablePermissions} permission={perm} key={idx} />)}
      </div>
      <SignatureForm />
      <EncryptForm />
      <div className="flex items-center gap-x-2">
        <button className={buttonClass} onClick={() => {
          getPublicKey().then(console.log)
        }}>Get Public Key</button>
        <div className="">{publicKey && "Check console!"}</div>
      </div>
    </div>
  );
};
