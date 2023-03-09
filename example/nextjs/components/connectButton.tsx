import { FC } from "react";
import { PermissionType } from "arconnect";
import { useArconnect } from "react-arconnect";


interface ConnectButtonInterface {
  permissions:      PermissionType[];
  ArConnectAppName: string;
  ArConnectAppLogo: string;
};

export const ConnectButton:FC<ConnectButtonInterface> = ({ permissions, ArConnectAppName, ArConnectAppLogo }) => {

  const {
    arconnectConnect,
  } = useArconnect();

  return (
    <button
      onClick={() => 
        arconnectConnect(permissions, { name: ArConnectAppName, logo: '' })
      }
      className="bg-[#434343] px-2.5 py-1.5 rounded-full flex items-center gap-x-1.5"
    >
      <img
        width={16}
        height={16}
        src={ArConnectAppLogo}
        alt="decent.land logo"
      ></img>{' '}
      Connect to {ArConnectAppName}
    </button>
  )
};

export const DisconnectButton: FC<{}> = ({ }) => {

  const {
    address,
    ANS,
    arconnectDisconnect,
    shortenAddress
  } = useArconnect();

  return (
    <button className="flex bg-[#434442] px-2.5 py-1 rounded-full text-xl items-center" onClick={arconnectDisconnect}>
      <span>
        {ANS && ANS.currentLabel
          ? `${ANS?.currentLabel}.ar`
          : (address && shortenAddress(address))
        }
      </span>
      {ANS?.avatar === '' ? (
        <div
          className="mx-auto rounded-full h-6 w-6 ml-2 btn-secondary border-[1px]" 
          style={{ backgroundColor: ANS?.address_color }}
        ></div>
      ) : (
        <div
          style={{
            backgroundColor: ANS?.address_color,
            width: '24px',
            height: '24px',
          }}
        >
          <img
            src={`https://arweave.net/${ANS?.avatar}`}
            alt="Profile"
            width="100%"
            height="100%"
          />
        </div>
      )}
    </button>
  )
};