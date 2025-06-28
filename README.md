
# T-Sender UI

## Overview

T-Sender UI is a Web3 application built with Next.js, utilizing various libraries and frameworks such as RainbowKit, Wagmi, and Tailwind CSS. This repository contains the source code for the application.

## Features

* Wallet setup and management using Synpress and MetaMask
* Support for multiple blockchain networks (Anvil, Zksync, and Mainnet)
* Integration with RainbowKit for wallet connectivity
* Utilizes Wagmi for blockchain interactions
* Customizable theme using Next Themes

## Getting Started

1. Clone the repository: `git clone https://github.com/viktorhugo/t-sender-ui.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the development server: `npm run dev` or `yarn dev`
4. Open your browser and navigate to `http://localhost:3000`

## Testing

This repository uses Vitest for testing. To run tests, use the following command:

* `npm run test` or `yarn test`

## E2E Testing

This repository also use Synpress and Playwright for end-to-end for testing. To run tests, use the following command:

* `npm playwright test --ui` or `yarn playwright test --ui`

## Configuration

The application uses environment variables for configuration. You can find the configuration options in the [src/rainbowKitConfig.tsx](cci:7://file:///Users/victormosquera/proyects/victor/DeFi/t-sender-ui/src/rainbowKitConfig.tsx:0:0-0:0) file.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Acknowledgments

This project uses various open-source libraries and frameworks. We'd like to thank the maintainers and contributors of these projects for their hard work and dedication.
