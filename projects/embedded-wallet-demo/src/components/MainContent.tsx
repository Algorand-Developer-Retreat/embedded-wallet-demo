// components/MainContent.tsx
import { WalletQR } from "./WalletQR";
import { WalletDetails } from "./WalletDetails";
import { useQuery } from "@tanstack/react-query";

interface MainContentProps {
  address: string | null;
}

export const MainContent = ({ address }: MainContentProps) => {
  // const getBalance =
  //  const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Embedded Algo Wallet Demo</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Connect your Pera or Defly wallet by scanning the QR code to send test ALGO to the generated wallet
        </p>
      </div>

      {/* Wallet card with QR code */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 max-w-md mx-auto">
        <WalletQR address={address} />
      </div>

      {/* Wallet Info with improved styling */}
      <WalletDetails />
    </main>
  );
};
