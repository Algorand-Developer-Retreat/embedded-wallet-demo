// components/WalletQR.tsx
import QRCode from "react-qr-code";
import { useQuery } from "@tanstack/react-query";
import { AlgorandClient } from "@algorandfoundation/algokit-utils";

// Create an AlgorandClient pointing to TestNet
const algorand = AlgorandClient.testNet();
const algodClient = algorand.client.algod;

// Format Algo amount (1 Algo = 1,000,000 microAlgos)
const formatAlgoAmount = (microAlgos: number) => {
  const algos = microAlgos / 1_000_000;
  return algos.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  });
};

interface WalletQRProps {
  address: string | null;
}

export const WalletQR = ({ address }: WalletQRProps) => {
  const getBalance = async () => {
    if (!address) return 0;
    try {
      const bal = (await algodClient.accountInformation(address).do()).amount;
      return bal;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0;
    }
  };

  const balQuery = useQuery({
    queryKey: ["embeddedWalletBalance", address],
    queryFn: getBalance,
    refetchInterval: 2800,
    enabled: !!address,
  });

  if (!address) {
    return (
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
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-gray-600 dark:text-gray-400 text-sm font-medium">Scan with Pera or Defly Wallet</div>

      {/* Balance Display */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-4 w-full text-center">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current Balance</div>
        <div className="flex items-center justify-center">
          {balQuery.isLoading ? (
            <div className="animate-pulse h-6 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
          ) : (
            <div className="flex items-center">
              <span className="text-xl font-semibold text-blue-600 dark:text-blue-400">{formatAlgoAmount(Number(balQuery.data) || 0)}</span>
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">ALGO</span>
            </div>
          )}
        </div>
        {balQuery.data === 0 && !balQuery.isLoading && (
          <div className="mt-1 text-xs text-orange-500 dark:text-orange-400">No funds detected. Use the dispenser to get test ALGO.</div>
        )}
      </div>

      <div className="p-2 bg-white rounded-lg mb-4">
        <QRCode value={`algorand://${address}`} size={200} className="mx-auto" bgColor={"#FFFFFF"} fgColor={"#000000"} level={"H"} />
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

      {/* Last refresh indicator */}
      <div className="w-full text-center mt-2">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {balQuery.isRefetching ? "Refreshing balance..." : `Last updated: ${new Date().toLocaleTimeString()}`}
        </span>
      </div>
    </div>
  );
};
