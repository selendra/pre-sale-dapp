import { providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

export async function SignerTrustWallet() {
  const provider = new WalletConnectProvider({
    rpc: {
      56: "https://bsc-dataseed.binance.org"
    },
  });

  //  Enable session (triggers QR Code modal)
  await provider.enable();

  const web3Provider = new providers.Web3Provider(provider);

  const signer = web3Provider.getSigner();

  return signer;
}