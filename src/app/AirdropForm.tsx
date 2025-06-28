"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Info, Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { chainsToTSender, erc20Abi } from "./constants";
import { useAccount, useChainId, useConfig, useWriteContract } from 'wagmi'
import { readContract, waitForTransactionReceipt } from "@wagmi/core";
import { Address } from "viem";
import { calculateTotal } from "@/utils"

export default function AirdropForm() {

  const [tokenAddress, setTokenAddress] = useState("");
  const [recipients, setRecipients] = useState("");
  const [amounts, setAmounts] = useState("");
  const [mode, setMode] = useState("safe");
  const chainId = useChainId();
  const config = useConfig();
  const account = useAccount();
  const { isPending, writeContractAsync } = useWriteContract(); // data: hash, error
  // Calculate the total amount of tokens to send
  const total: number = useMemo( 
    () => calculateTotal(amounts),
    [amounts]
  );

  const getApproved = async (tSenderAddress: Address | undefined): Promise<number | undefined> => {
    if (!tSenderAddress) {
      console.error("TSender address not found");
      return undefined;
    }
    const response = await readContract( config, {
      abi: erc20Abi,
      address: tokenAddress as Address,
      functionName: "allowance",
      args: [ account.address, tSenderAddress ]
    })
    console.log("Allowance:", response);
    return response as number;
  }

  const handleSendToken = async () => {
    if (!chainId) {
      console.error("Chain ID not found, please connect your wallet");
      return;
    }
    console.log("Chain ID found:", chainId);
    // 1. Approve our tsender contract to send our tokens
    // 1a. If already approved, skip this step
    // 2. Call the airdrop function on the tsender contract
    // 3. Wait for the transaction to be mined
    const tSenderAddress = chainsToTSender[chainId].tsender;
    const approvedAmount = await getApproved(tSenderAddress as Address);
    console.log("approvedAmount:", approvedAmount);
    
    if (!approvedAmount) {
      console.error("Failed to get approved amount");
      // show error message to user

      return;
    }

    if (approvedAmount < total) {
      // Approve our tsender contract to send our tokens, and get hash of the approval transaction
      const approvalHash = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress as Address,
        functionName: "approve",
        args: [ tSenderAddress, BigInt(total) ]
      })
      console.log("approvalHash:", approvalHash); 
      // wait for the approval transaction to be mined
      const approvalReceipt = await waitForTransactionReceipt(config, {
        hash: approvalHash
      })
      console.log("approvalReceipt:", approvalReceipt);
      if (approvalReceipt.status !== "success") {
        console.error("Approval transaction failed");
        // show error message to user
        return;
      }
      // show success message to user
      console.log("Approval transaction successful");
      // call the airdrop function on the tsender contract
      await writeContractAsync({
        abi: erc20Abi,
        address: tSenderAddress as Address,
        functionName: "airdropERC20",
        args: [ 
          tokenAddress, 
          recipients.split(/[\s,]+/).map(addr => addr.trim() as Address),
          amounts.split(/[\s,]+/).map(amount => BigInt(amount.trim())),
          BigInt(total),
        ]
      })

    } else {
      // Call the airdrop function on the tsender contract
      await writeContractAsync({
        
        abi: erc20Abi,
        address: tSenderAddress as Address,
        functionName: "airdropERC20",
        args: [ 
          tokenAddress, 
          recipients.split(/[\s,]+/).map(addr => addr.trim() as Address),
          amounts.split(/[\s,]+/).map(amount => BigInt(amount.trim())),
          BigInt(total),
        ]
      })
    }

  }

  return (
    <div className="flex flex-col gap-4">
      <main className="p-6">
        <Card className="border-2 border-blue-500/30 bg-gray-800 relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardHeader className="text-2xl font-bold text-white">T-Sender</CardHeader>
                <CardContent className="text-gray-400">
                  Send tokens to multiple addresses in a single transaction
                </CardContent>
              </div>
              <Tabs defaultValue="unsafe" value={mode} onValueChange={setMode} className="w-[300px] h-[40px] border-2 border-none rounded-md flex items-center justify-center cursor-pointer animation-all duration-300">
                <TabsList className="grid w-full grid-cols-2 bg-gray-700">
                  <TabsTrigger value="safe" className="data-[state=active]:bg-gray-600">
                    Safe Mode
                  </TabsTrigger>
                  <TabsTrigger value="unsafe" className="data-[state=active]:bg-gray-900">
                    Unsafe Mode
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6 relative">
              {/* Play Button Overlay */}

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-200">Token Address</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 text-gray-200">
                        <p>Enter the contract address of the token you want to send</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Input
                  value={tokenAddress}
                  onChange={ (e) => setTokenAddress(e.target.value) }
                  className="font-mono text-sm bg-gray-700 border-gray-600 focus:outline-none placeholder:text-gray-400 placeholder:text-sm focus:ring-0 focus:border-blue-500"
                  placeholder="0x..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-200">Recipients</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 text-gray-200">
                        <p>Enter wallet addresses separated by commas or new lines</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  value={recipients}
                  onChange={(e) => setRecipients(e.target.value)}
                  className="font-mono text-sm min-h-[120px] bg-gray-700  border-gray-600 placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="0x..., 0x..., 0x..."
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-200">Amounts (wei)</label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent className="bg-gray-700 text-gray-200">
                        <p>Enter amounts in wei, separated by commas or new lines</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Textarea
                  value={amounts}
                  onChange={(e) => setAmounts(e.target.value)}
                  className="font-mono text-sm min-h-[120px] bg-gray-700 border-gray-600 placeholder:text-gray-400 placeholder:text-sm"
                  placeholder="100, 100, 100"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button size="lg" disabled={!tokenAddress || !recipients || !amounts} onClick={handleSendToken} className="bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer">
                <Send className="h-4 w-4 mr-2" />
                { 
                  isPending ? <Loader2 className="h-4 w-4 mr-2" /> : 'Send Tokens'
                }
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
