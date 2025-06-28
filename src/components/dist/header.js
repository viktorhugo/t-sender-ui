"use strict";
exports.__esModule = true;
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var react_1 = require("react");
var Header = function () {
    return (react_1["default"].createElement("header", { className: "bg-gray-800 border-b border-gray-700 px-6 py-4" },
        react_1["default"].createElement("div", { className: "flex items-center justify-between max-w-7xl mx-auto" },
            react_1["default"].createElement("div", { className: "flex items-center gap-4" },
                react_1["default"].createElement("div", { className: "flex items-center gap-2" },
                    react_1["default"].createElement("div", { className: "w-8 h-8 bg-orange-500 rounded flex items-center justify-center" },
                        react_1["default"].createElement("span", { className: "text-white font-bold text-sm" }, "TS")),
                    react_1["default"].createElement("span", { className: "font-bold text-xl text-white" }, "TSender")),
                react_1["default"].createElement("span", { className: "text-gray-300 italic" }, "The most gas efficient airdrop contract on earth, built in huff \uD83C\uDFF4\u200D\u2620\uFE0F")),
            react_1["default"].createElement("div", { className: "flex items-center gap-4" },
                react_1["default"].createElement(rainbowkit_1.ConnectButton, null)))));
};
exports["default"] = Header;
