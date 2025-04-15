// App.tsx
import { NetworkId, WalletId, WalletManager, WalletProvider } from "@txnlab/use-wallet-react";
import { WalletUIProvider } from "@txnlab/use-wallet-ui-react";
import { useEffect, useRef, useState } from "react";
import Wallet from "embedded-algo-wallet";

import { Header } from "./components/Header.tsx";
import { MainContent } from "./components/MainContent.tsx";
import { Footer } from "./components/Footer.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    WalletId.EXODUS,
    {
      id: WalletId.WALLETCONNECT,
      options: { projectId: "fcfde0713d43baa0d23be0773c80a72b" },
    },
  ],
  defaultNetwork: NetworkId.TESTNET,
});

function App() {
  const embeddedWalletRef = useRef<Wallet | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    const startupWallet = async (wallet: Wallet) => {
      await wallet.startup();
      await wallet.createAcct("pswd");
      console.log(wallet.acctInfo.address);
      setAddress(wallet.acctInfo.address);
    };
    if (embeddedWalletRef.current === null) {
      const wallet = new Wallet("testnet");
      startupWallet(wallet);
      embeddedWalletRef.current = wallet;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider manager={walletManager}>
        <WalletUIProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#001324] dark:to-[#002548] text-gray-900 dark:text-gray-100">
            <Header />
            <MainContent address={address} />
            <Footer />
          </div>
        </WalletUIProvider>
      </WalletProvider>
    </QueryClientProvider>
  );
}

export default App;
