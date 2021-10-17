import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import abi from 'contract/presale.json';

export async function ContractTrustWallet() {
  const contractAddress = '0x1f1c4e7408C1A1cF2583eD155C7b88274Cf6Ab22';

  const provider = new WalletConnectProvider({
    rpc: {
      56: "https://bsc-dataseed.binance.org"
    },
  });

  await provider.enable();

  const web3Provider = new providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();

  const Contract = new ethers.Contract(
    contractAddress,
    abi,
    signer
  )

  return Contract;
}