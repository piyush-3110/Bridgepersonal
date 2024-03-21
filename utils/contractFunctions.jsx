import { useAccount } from "wagmi";
import optimismAbi from "./abi/tokenOptimism.json";
import polygonAbi from "./abi/tokenPolygon.json";
import arbitrumAbi from "./abi/tokenArbitrum.json";
import sepoliaAbi from "./abi/tokenSepolia.json";
import bscAbi from "./abi/tokenBSC.json";
import baseAbi from "./abi/tokenBase.json";
import polygonProxyAbi from "./abi/proxyPolygon.json";
import { config } from "@/config";
import { readContract, writeContract } from "@wagmi/core";
import { useSelector } from "react-redux";
import { parseEther } from "viem";
import {
  arbitrumSepolia,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
  polygonMumbai,
  sepolia,
} from "viem/chains";

// interface WagmiContractConfigType {
//   abi: any[];
//   address: string | undefined;
// }

function getAbi(chainId) {
  switch (chainId) {
    case 10109:
      return polygonAbi;
    case 10231:
      return arbitrumAbi;
    case 10245:
      return baseAbi;
    case 10102:
      return bscAbi;
    case 10232:
      return optimismAbi;
    case 10161:
      return sepoliaAbi;
    default:
      return polygonProxyAbi; // Fallback to Polygon ABI
  }
}
function getContractAddress(chainId) {
  switch (chainId) {
    case 10109:
      return process.env.NEXT_PUBLIC_TOKEN_POLYGON_ADDRESS;
    case 10231:
      return process.env.NEXT_PUBLIC_TOKEN_ARBITRUM_ADDRESS;
    case 10245:
      return process.env.NEXT_PUBLIC_TOKEN_BASE_ADDRESS;
    case 10102:
      return process.env.NEXT_PUBLIC_TOKEN_BSC_ADDRESS;
    case 10232:
      return process.env.NEXT_PUBLIC_TOKEN_OPTIMISM_ADDRESS;
    case 10161:
      return process.env.NEXT_PUBLIC_TOKEN_SEPOLIA_ADDRESS;
    default:
      return process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS; // Fallback to Polygon ABI
  }
}
function getChainId(chainId) {
  switch (chainId) {
    case 10109:
      return polygonMumbai.id;
    case 10231:
      return arbitrumSepolia.id;
    case 10245:
      return baseSepolia.id;
    case 10102:
      return bscTestnet.id;
    case 10232:
      return optimismSepolia.id;
    case 10161:
      return sepolia.id;
    default:
      return polygonMumbai.id; // Fallback to Polygon ABI
  }
}

export function useWebThreeFuncs() {
  const fromChain = useSelector((state) => state.chain.fromChain);
  const toChain = useSelector((state) => state.chain.toChain);

  const { address: walletAddress } = useAccount();

  async function balance() {
    console.log(fromChain);
    const wagmiContractConfig = {
      abi: getAbi(fromChain.chainId),
      address: getContractAddress(fromChain.chainId),
      chainId: getChainId(fromChain.chainId),
    };
    const data = await readContract(config, {
      ...wagmiContractConfig,
      functionName: "balanceOf",
      args: [walletAddress],
    });
    return data;
  }

  async function bridge(tokens) {
    const wagmiContractConfig = {
      abi: baseAbi,
      address: process.env.NEXT_PUBLIC_TOKEN_BASE_ADDRESS,
      // chainId: baseSepolia.id,
    };

    const data = await readContract(config, {
      abi: polygonProxyAbi,
      address: process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS,
      chainId: polygonMumbai.id,
      functionName: "estimateSendFee",
      args: [toChain.chainId, walletAddress, parseEther(tokens), true, "0x"],
    });

    const transferData = await transferTokens(tokens, data[0]);

    console.log(transferData);

    return data;
  }

  async function transferTokens(tokens, gasFee) {
    const fromChain = useSelector((state) => state.fromChain);

    const result = await writeContract(config, {
      abi: getAbi(fromChain.chainId),
      address: getContractAddress(fromChain.chainId),
      chainId: getChainId(fromChain.chainId),
      functionName: "sendFrom",
      args: [
        gasFee * 1.5,
        walletAddress,
        toChain.chainId,
        walletAddress,
        parseEther(tokens),
        walletAddress,
        walletAddress,
        "0x",
      ],
    });
    console.log(result);
    // return result
  }

  return { balance, transferTokens, bridge };
}
