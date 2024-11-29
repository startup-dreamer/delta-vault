import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { ApolloProvider } from '@apollo/client';
import Head from "next/head";
import client from '../const/apollo-client';

const ethenaTestnet = {
  chainId: 52085143,
  rpc: ["https://testnet.rpc.ethena.fi"],
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  shortName: "ethena",
  slug: "ethena",
  testnet: true,
  chain: "Ethena Testnet",
  name: "Ethena Testnet"
};

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>DeltaVault</title>
                <meta name="DeltaVault" content="Get the most secured transactions with Delta Vault." />
            </Head>
            <ThirdwebProvider
                clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
                supportedChains={[ethenaTestnet]}
                activeChain={ethenaTestnet}
            >
                <ChakraProvider>
                    <ApolloProvider client={client}>
                        <Navbar />
                        <Component {...pageProps} />
                    </ApolloProvider>
                </ChakraProvider>
            </ThirdwebProvider>
        </>
    );
}

export default MyApp;
