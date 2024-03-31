import { useAccount } from "wagmi";
import optimismAbi from "./abi/tokenOptimism.json";
import polygonAbi from "./abi/tokenPolygon.json";
import arbitrumAbi from "./abi/tokenArbitrum.json";
import sepoliaAbi from "./abi/tokenSepolia.json";
import bscAbi from "./abi/tokenBSC.json";
import baseAbi from "./abi/tokenBase.json";
import polygonProxyAbi from "./abi/proxyPolygon.json";
import { config } from "@/config";
import {
  readContract,
  writeContract,
  getAccount,
  waitForTransactionReceipt,
  switchChain,
} from "@wagmi/core";
import {
  arbitrumSepolia,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
  polygonMumbai,
  sepolia,
} from "viem/chains";
import { useAppSelector } from "@/hooks/reduxHooks";

function getAbi(chainId: Number) {
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
function getContractAddress(chainId: Number): `0x${string}` {
  switch (chainId) {
    case 10109:
      return process.env.NEXT_PUBLIC_TOKEN_POLYGON_ADDRESS as `0x${string}`;
    case 10231:
      return process.env.NEXT_PUBLIC_TOKEN_ARBITRUM_ADDRESS as `0x${string}`;
    case 10245:
      return process.env.NEXT_PUBLIC_TOKEN_BASE_ADDRESS as `0x${string}`;
    case 10102:
      return process.env.NEXT_PUBLIC_TOKEN_BSC_ADDRESS as `0x${string}`;
    case 10232:
      return process.env.NEXT_PUBLIC_TOKEN_OPTIMISM_ADDRESS as `0x${string}`;
    case 10161:
      return process.env.NEXT_PUBLIC_TOKEN_SEPOLIA_ADDRESS as `0x${string}`;
    default:
      return process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS as `0x${string}`; // Fallback to Polygon ABI
  }
}
function getChainId(chainId: Number): number {
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

class CustomError extends Error {
  errorMessage: string;
  name: string;

  constructor(message: string) {
    super(message);
    this.errorMessage = message;
    this.name = "notSufficientGas";
  }
}

export function useWebThreeFuncs() {
  const fromChain = useAppSelector((state) => state.chain.fromChain);
  const toChain = useAppSelector((state) => state.chain.toChain);
  const destAdd = useAppSelector((state) => state.destAdd.value);

  const { address: walletAddress } = useAccount();

  async function getEstimatedFee(tokens: bigint) {
    try {
      const data = (await readContract(config, {
        abi:
          fromChain.name == "Polygon"
            ? polygonProxyAbi
            : getAbi(fromChain.chainId),
        address:
          fromChain.name == "Polygon"
            ? (process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS as `0x${string}`)
            : getContractAddress(fromChain.chainId),
        chainId: getChainId(fromChain.chainId),
        functionName: "estimateSendFee",
        args: [toChain.chainId, walletAddress, tokens, true, "0x"],
      })) as [bigint, any];
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function balance() {
    try {
      const wagmiContractConfig = {
        abi: getAbi(fromChain.chainId),
        address: getContractAddress(fromChain.chainId),
        chainId: getChainId(fromChain.chainId),
      };
      const data = (await readContract(config, {
        ...wagmiContractConfig,
        functionName: "balanceOf",
        args: [walletAddress],
      })) as bigint;
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function bridge(tokens: bigint) {
    // Estimate fee func
    try {
      const data = (await getEstimatedFee(tokens)) as [bigint, number];

      const formattedGas = BigInt(Math.floor(Number(data[0]) * 1.5));

      const { connector } = getAccount(config);
      const currentChain = await connector?.getChainId();

      if (currentChain != getChainId(fromChain.chainId)) {
        await switchChain(config, { chainId: getChainId(fromChain.chainId) });
      }
      const transferData = await transferTokens(tokens, formattedGas);

      const receipt = await waitForTransactionReceipt(config, {
        hash: transferData,
        confirmations: 5,
      });

      return receipt;
    } catch (error: any) {
      if (
        error.details &&
        error.details.includes("insufficient funds for gas")
      ) {
        throw new CustomError("Not enough funds for gas");
      } else if (
        error.shortMessage &&
        error.shortMessage.includes("burn amount exceeds balance")
      ) {
        throw new CustomError("Not enough floyx tokens");
      }
      throw error;
    }
  }

  async function transferTokens(_tokens: bigint, _gasFee: bigint) {
    try {
      const result = await writeContract(config, {
        abi:
          fromChain.name == "Polygon"
            ? polygonProxyAbi
            : getAbi(fromChain.chainId),
        address:
          fromChain.name == "Polygon"
            ? (process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS as `0x${string}`)
            : getContractAddress(fromChain.chainId),
        chainId: getChainId(fromChain.chainId),
        functionName: "sendFrom",
        args: [
          walletAddress,
          toChain.chainId,
          destAdd || walletAddress,
          _tokens,
          walletAddress,
          walletAddress,
          "0x",
        ],
        value: _gasFee,
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  return { balance, transferTokens, bridge, getEstimatedFee };
}
