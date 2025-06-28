"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var button_1 = require("@/components/ui/button");
var card_1 = require("@/components/ui/card");
var tooltip_1 = require("@/components/ui/tooltip");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var lucide_react_1 = require("lucide-react");
var react_1 = require("react");
var tabs_1 = require("@/components/ui/tabs");
var constants_1 = require("./constants");
var wagmi_1 = require("wagmi");
var core_1 = require("@wagmi/core");
var utils_1 = require("@/utils");
function AirdropForm() {
    var _this = this;
    var _a = react_1.useState(""), tokenAddress = _a[0], setTokenAddress = _a[1];
    var _b = react_1.useState(""), recipients = _b[0], setRecipients = _b[1];
    var _c = react_1.useState(""), amounts = _c[0], setAmounts = _c[1];
    var _d = react_1.useState("safe"), mode = _d[0], setMode = _d[1];
    var chainId = wagmi_1.useChainId();
    var config = wagmi_1.useConfig();
    var account = wagmi_1.useAccount();
    var _e = wagmi_1.useWriteContract(), isPending = _e.isPending, writeContractAsync = _e.writeContractAsync; // data: hash, error
    // Calculate the total amount of tokens to send
    var total = react_1.useMemo(function () { return utils_1.calculateTotal(amounts); }, [amounts]);
    var getApproved = function (tSenderAddress) { return __awaiter(_this, void 0, Promise, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tSenderAddress) {
                        console.error("TSender address not found");
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, core_1.readContract(config, {
                            abi: constants_1.erc20Abi,
                            address: tokenAddress,
                            functionName: "allowance",
                            args: [account.address, tSenderAddress]
                        })];
                case 1:
                    response = _a.sent();
                    console.log("Allowance:", response);
                    return [2 /*return*/, response];
            }
        });
    }); };
    var handleSendToken = function () { return __awaiter(_this, void 0, void 0, function () {
        var tSenderAddress, approvedAmount, approvalHash, approvalReceipt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!chainId) {
                        console.error("Chain ID not found, please connect your wallet");
                        return [2 /*return*/];
                    }
                    console.log("Chain ID found:", chainId);
                    tSenderAddress = constants_1.chainsToTSender[chainId].tsender;
                    return [4 /*yield*/, getApproved(tSenderAddress)];
                case 1:
                    approvedAmount = _a.sent();
                    console.log("approvedAmount:", approvedAmount);
                    if (!approvedAmount) {
                        console.error("Failed to get approved amount");
                        // show error message to user
                        return [2 /*return*/];
                    }
                    if (!(approvedAmount < total)) return [3 /*break*/, 5];
                    return [4 /*yield*/, writeContractAsync({
                            abi: constants_1.erc20Abi,
                            address: tokenAddress,
                            functionName: "approve",
                            args: [tSenderAddress, BigInt(total)]
                        })];
                case 2:
                    approvalHash = _a.sent();
                    console.log("approvalHash:", approvalHash);
                    return [4 /*yield*/, core_1.waitForTransactionReceipt(config, {
                            hash: approvalHash
                        })];
                case 3:
                    approvalReceipt = _a.sent();
                    console.log("approvalReceipt:", approvalReceipt);
                    if (approvalReceipt.status !== "success") {
                        console.error("Approval transaction failed");
                        // show error message to user
                        return [2 /*return*/];
                    }
                    // show success message to user
                    console.log("Approval transaction successful");
                    // call the airdrop function on the tsender contract
                    return [4 /*yield*/, writeContractAsync({
                            abi: constants_1.erc20Abi,
                            address: tSenderAddress,
                            functionName: "airdropERC20",
                            args: [
                                tokenAddress,
                                recipients.split(/[\s,]+/).map(function (addr) { return addr.trim(); }),
                                amounts.split(/[\s,]+/).map(function (amount) { return BigInt(amount.trim()); }),
                                BigInt(total),
                            ]
                        })];
                case 4:
                    // call the airdrop function on the tsender contract
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: 
                // Call the airdrop function on the tsender contract
                return [4 /*yield*/, writeContractAsync({
                        abi: constants_1.erc20Abi,
                        address: tSenderAddress,
                        functionName: "airdropERC20",
                        args: [
                            tokenAddress,
                            recipients.split(/[\s,]+/).map(function (addr) { return addr.trim(); }),
                            amounts.split(/[\s,]+/).map(function (amount) { return BigInt(amount.trim()); }),
                            BigInt(total),
                        ]
                    })];
                case 6:
                    // Call the airdrop function on the tsender contract
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("div", { className: "flex flex-col gap-4" },
        React.createElement("main", { className: "p-6" },
            React.createElement(card_1.Card, { className: "border-2 border-blue-500/30 bg-gray-800 relative overflow-hidden" },
                React.createElement(card_1.CardHeader, null,
                    React.createElement("div", { className: "flex items-center justify-between" },
                        React.createElement("div", null,
                            React.createElement(card_1.CardHeader, { className: "text-2xl font-bold text-white" }, "T-Sender"),
                            React.createElement(card_1.CardContent, { className: "text-gray-400" }, "Send tokens to multiple addresses in a single transaction")),
                        React.createElement(tabs_1.Tabs, { defaultValue: "unsafe", value: mode, onValueChange: setMode, className: "w-[300px] h-[40px] border-2 border-none rounded-md flex items-center justify-center cursor-pointer animation-all duration-300" },
                            React.createElement(tabs_1.TabsList, { className: "grid w-full grid-cols-2 bg-gray-700" },
                                React.createElement(tabs_1.TabsTrigger, { value: "safe", className: "data-[state=active]:bg-gray-600" }, "Safe Mode"),
                                React.createElement(tabs_1.TabsTrigger, { value: "unsafe", className: "data-[state=active]:bg-gray-900" }, "Unsafe Mode"))))),
                React.createElement(card_1.CardContent, { className: "p-8" },
                    React.createElement("div", { className: "space-y-6 relative" },
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("label", { className: "text-sm font-medium text-gray-200" }, "Token Address"),
                                React.createElement(tooltip_1.TooltipProvider, null,
                                    React.createElement(tooltip_1.Tooltip, null,
                                        React.createElement(tooltip_1.TooltipTrigger, { asChild: true },
                                            React.createElement(lucide_react_1.Info, { className: "h-4 w-4 text-gray-400" })),
                                        React.createElement(tooltip_1.TooltipContent, { className: "bg-gray-700 text-gray-200" },
                                            React.createElement("p", null, "Enter the contract address of the token you want to send"))))),
                            React.createElement(input_1.Input, { value: tokenAddress, onChange: function (e) { return setTokenAddress(e.target.value); }, className: "font-mono text-sm bg-gray-700 border-gray-600 focus:outline-none placeholder:text-gray-400 placeholder:text-sm focus:ring-0 focus:border-blue-500", placeholder: "0x..." })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("label", { className: "text-sm font-medium text-gray-200" }, "Recipients"),
                                React.createElement(tooltip_1.TooltipProvider, null,
                                    React.createElement(tooltip_1.Tooltip, null,
                                        React.createElement(tooltip_1.TooltipTrigger, { asChild: true },
                                            React.createElement(lucide_react_1.Info, { className: "h-4 w-4 text-gray-400" })),
                                        React.createElement(tooltip_1.TooltipContent, { className: "bg-gray-700 text-gray-200" },
                                            React.createElement("p", null, "Enter wallet addresses separated by commas or new lines"))))),
                            React.createElement(textarea_1.Textarea, { value: recipients, onChange: function (e) { return setRecipients(e.target.value); }, className: "font-mono text-sm min-h-[120px] bg-gray-700  border-gray-600 placeholder:text-gray-400 placeholder:text-sm", placeholder: "0x..., 0x..., 0x..." })),
                        React.createElement("div", { className: "space-y-2" },
                            React.createElement("div", { className: "flex items-center gap-2" },
                                React.createElement("label", { className: "text-sm font-medium text-gray-200" }, "Amounts (wei)"),
                                React.createElement(tooltip_1.TooltipProvider, null,
                                    React.createElement(tooltip_1.Tooltip, null,
                                        React.createElement(tooltip_1.TooltipTrigger, { asChild: true },
                                            React.createElement(lucide_react_1.Info, { className: "h-4 w-4 text-gray-400" })),
                                        React.createElement(tooltip_1.TooltipContent, { className: "bg-gray-700 text-gray-200" },
                                            React.createElement("p", null, "Enter amounts in wei, separated by commas or new lines"))))),
                            React.createElement(textarea_1.Textarea, { value: amounts, onChange: function (e) { return setAmounts(e.target.value); }, className: "font-mono text-sm min-h-[120px] bg-gray-700 border-gray-600 placeholder:text-gray-400 placeholder:text-sm", placeholder: "100, 100, 100" }))),
                    React.createElement("div", { className: "mt-8 flex justify-center" },
                        React.createElement(button_1.Button, { size: "lg", disabled: !tokenAddress || !recipients || !amounts, onClick: handleSendToken, className: "bg-blue-600 hover:bg-blue-700 text-white px-8 cursor-pointer" },
                            React.createElement(lucide_react_1.Send, { className: "h-4 w-4 mr-2" }),
                            isPending ? React.createElement(lucide_react_1.Loader2, { className: "h-4 w-4 mr-2" }) : 'Send Tokens')))))));
}
exports["default"] = AirdropForm;
