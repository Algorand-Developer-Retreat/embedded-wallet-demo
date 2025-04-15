import { NetworkId, WalletId, WalletManager, WalletProvider } from "@txnlab/use-wallet-react";
import { WalletUIProvider, WalletButton } from "@txnlab/use-wallet-ui-react";
import { useEffect, useRef, useState } from "react";
import Wallet from "embedded-algo-wallet";

import QRCode from "react-qr-code";

import { WalletInfo } from "./components/WalletInfo";

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
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-[#001324] dark:to-[#002548] text-gray-900 dark:text-gray-100">
          {/* Header */}
          <header className="w-full bg-white dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700/50 sticky top-0 z-10 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex-shrink-0 flex items-center">
                  <svg className="h-8 w-8 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white">Embedded Algo Wallet Demo</span>
                </div>
                <div>
                  <WalletButton />
                </div>
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Embedded Algo Wallet Demo</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Connect your Pera or Defly wallet by scanning the QR code to send test ALGO to the generated wallet
              </p>
            </div>

            {/* Wallet card with QR code */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
              {address ? (
                <div className="flex flex-col items-center">
                  <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">Scan with Pera or Defly Wallet</div>
                  <div className="p-2 bg-white rounded-lg mb-4">
                    <QRCode
                      value={`algorand://${address}`}
                      size={200}
                      className="mx-auto"
                      bgColor={"#FFFFFF"}
                      fgColor={"#000000"}
                      level={"H"}
                    />
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-2 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Your wallet address:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(address);
                          // Show toast notification here
                        }}
                        className="text-blue-500 text-xs hover:text-blue-600"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm font-mono truncate">{address}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-8">
                  <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mb-4">
                    <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No Wallet Connected</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Click the button above to connect your wallet</p>
                </div>
              )}
            </div>

            {/* Wallet Info with improved styling */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wallet Information</h2>
              <WalletInfo />

              {address && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Need test ALGO?</h3>
                  <div className="flex space-x-4">
                    <a
                      href={`https://bank.testnet.algorand.network/?account=${address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300 text-sm rounded-lg px-4 py-2 text-center transition-colors"
                    >
                      Get from Testnet Dispenser
                    </a>
                  </div>
                </div>
              )}
            </div>
          </main>

          {/* Footer */}
          <footer className="w-full bg-white dark:bg-gray-800/30 border-t border-gray-200 dark:border-gray-700/50 py-6">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500 dark:text-gray-400">
              This is a demo application. Do not use with real funds.
            </div>
          </footer>
        </div>
      </WalletUIProvider>
    </WalletProvider>
  );
}

export default App;
