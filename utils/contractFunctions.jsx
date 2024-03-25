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
} from "@wagmi/core";
import { useSelector } from "react-redux";
import { parseEther } from "viem";
import { switchChain } from "@wagmi/core";
import {
  arbitrumSepolia,
  baseSepolia,
  bscTestnet,
  optimismSepolia,
  polygonMumbai,
  sepolia,
} from "viem/chains";

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

  async function getEstimatedFee(tokens) {
    try {
      const data = await readContract(config, {
        abi:
          fromChain.name == "Polygon"
            ? polygonProxyAbi
            : getAbi(fromChain.chainId),
        address:
          fromChain.name == "Polygon"
            ? process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS
            : getContractAddress(fromChain.chainId),
        chainId: getChainId(fromChain.chainId),
        functionName: "estimateSendFee",
        args: [toChain.chainId, walletAddress, tokens, true, "0x"],
      });
      console.log(data);
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
      const data = await readContract(config, {
        ...wagmiContractConfig,
        functionName: "balanceOf",
        args: [walletAddress],
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async function bridge(tokens) {
    // Estimate fee func
    try {
      const data = await getEstimatedFee(tokens);

      const formattedGas = BigInt(Math.floor(Number(data[0]) * 1.5));

      const { connector } = getAccount(config);
      const currentChain = await connector.getChainId();

      if (currentChain != getChainId(fromChain.chainId)) {
        await switchChain(config, { chainId: getChainId(fromChain.chainId) });
      }
      const transferData = await transferTokens(tokens, formattedGas);

      console.log(transferData);
      const dhoom = await waitForTransactionReceipt(config, {
        hash: transferData,
        confirmations: 5,
      });

      console.log(dhoom);

      return dhoom;
    } catch (error) {
      if (
        error.details &&
        error.details.includes("insufficient funds for gas")
      ) {
        const customError = new Error("Not enough funds for gas");
        customError.errorMessage = "Not enough funds for gas";
        customError.name = "notSufficientGas";
        throw customError;
      } else if (
        error.shortMessage &&
        error.shortMessage.includes("burn amount exceeds balance")
      ) {
        const customError = new Error("Not enough floyx tokens");
        customError.errorMessage = "Not enough floyx tokens";
        customError.name = "notEnoughFloyxTokens";
        throw customError;
      }
      throw error;
    }
  }

  async function transferTokens(_tokens, _gasFee) {
    try {
      const result = await writeContract(config, {
        abi:
          fromChain.name == "Polygon"
            ? polygonProxyAbi
            : getAbi(fromChain.chainId),
        address:
          fromChain.name == "Polygon"
            ? process.env.NEXT_PUBLIC_PROXY_POLYGON_ADDRESS
            : getContractAddress(fromChain.chainId),
        chainId: getChainId(fromChain.chainId),
        functionName: "sendFrom",
        args: [
          walletAddress,
          toChain.chainId,
          walletAddress,
          parseEther(_tokens),
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
