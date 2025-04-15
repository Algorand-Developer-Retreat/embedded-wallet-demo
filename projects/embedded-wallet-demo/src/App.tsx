import { NetworkId, WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { WalletButton, WalletUIProvider } from '@txnlab/use-wallet-ui-react'

// Configure the wallets you want to use
const walletManager = new WalletManager({
  wallets: [
    WalletId.PERA,
    WalletId.DEFLY,
    WalletId.LUTE,
    // Add more wallets as needed
  ],
  defaultNetwork: NetworkId.MAINNET,
})

function App() {
  return (
    <WalletProvider manager={walletManager}>
      <WalletUIProvider>
        <div>
          <WalletButton />
        </div>
      </WalletUIProvider>
    </WalletProvider>
  )
}

export default App
