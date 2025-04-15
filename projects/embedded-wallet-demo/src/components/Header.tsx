// components/Header.tsx
import { WalletButton } from "@txnlab/use-wallet-ui-react";

export const Header = () => {
  return (
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
  );
};
