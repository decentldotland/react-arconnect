import "../styles/globals.css";
import { ArconnectProvider } from "react-arconnect";

function ExampleApp({ Component, pageProps }) {
  return (
    <ArconnectProvider>
      <Component {...pageProps} />
    </ArconnectProvider>

  ) 
}

export default ExampleApp;
