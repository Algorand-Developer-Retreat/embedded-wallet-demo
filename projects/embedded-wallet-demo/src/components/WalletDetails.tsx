// components/WalletDetails.tsx
import { WalletInfo } from "./WalletInfo";
import { useWallet } from "@txnlab/use-wallet-react";

export const WalletDetails = ({}) => {
  const { activeAddress } = useWallet();
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Wallet Information</h2>
      <WalletInfo />

      {activeAddress && (
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Need test ALGO?</h3>
          <div className="flex space-x-4">
            <a
              href={`https://bank.testnet.algorand.network/?account=${activeAddress}`}
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
  );
};
