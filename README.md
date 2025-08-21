# T-Sender UI

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Wagmi](https://img.shields.io/badge/Wagmi-black?style=for-the-badge&logo=wagmi)](https://wagmi.sh/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)

T-Sender UI is the official frontend for the **T-Sender Smart Contract**, a tool designed for efficiently sending ERC20 tokens to multiple addresses in a single transaction (airdrop). This application provides a user-friendly interface to connect to a Web3 wallet and interact with the smart contract deployed on the **Sepolia testnet**.

The project is built with a modern tech stack, including Next.js, RainbowKit for wallet connectivity, and Wagmi for smart contract interactions.

## ✨ Features

-   **Wallet Connectivity**: Easily connect with your favorite wallet using RainbowKit.
-   **Airdrop Form**: A dedicated form to input recipient addresses and token amounts for the airdrop.
-   **Transaction Calculation**: Automatically calculates the total amount of tokens to be sent.
-   **Dark/Light Mode**: Switch between themes for your visual comfort.
-   **Responsive Design**: Fully responsive interface built with Tailwind CSS and Shadcn/UI.
-   **Local Development Environment**: Integrated with Foundry Anvil for easy local testing and development.

## 🛠️ Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [Shadcn/UI](https://ui.shadcn.com/)
-   **Web3**:
    -   [Wagmi](https://wagmi.sh/) & [Viem](https://viem.sh/) for blockchain interaction.
    -   [RainbowKit](https://www.rainbowkit.com/) for wallet connection UI.
-   **Testing**:
    -   [Vitest](https://vitest.dev/) for unit and component testing.
    -   [Playwright](https://playwright.dev/) & [Synpress](https://github.com/Synthetixio/synpress) for End-to-End testing.
-   **Local Blockchain**: [Foundry Anvil](https://book.getfoundry.sh/anvil/)

## 🚀 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/) (v20.x or higher)
-   [Bun](https://bun.sh/) or NPM / Yarn
-   [Foundry](https://getfoundry.sh/) installed for using `anvil`.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/viktorhugo/t-sender-ui.git
    cd t-sender-ui
    ```

2.  Install dependencies:
    ```bash
    bun install
    # or
    npm install
    ```

### Local Development

1.  **Start the local blockchain**:
    Open a terminal and run the following command to start a local Anvil node. This will load the deployed contract state from `tsender-deployed.json`.
    ```bash
    npm run anvil
    ```

2.  **Run the development server**:
    In a second terminal, run the frontend application.
    ```bash
    npm run dev
    ```

3.  Open your browser and navigate to `http://localhost:3000`.

### Environment Variables

Create a `.env.local` file in the root of the project and add the necessary environment variables. You will need a WalletConnect Project ID.

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="YOUR_WALLETCONNECT_PROJECT_ID"
```

You can get a `PROJECT_ID` from [WalletConnect Cloud](https://cloud.walletconnect.com/).

## 📝 Smart Contract

The T-Sender smart contract is deployed on the **Sepolia Testnet**.

For local development, the application uses a state snapshot in `tsender-deployed.json` which contains the deployed contract addresses on the local Anvil node. The primary contracts are:
-   **T-Sender Contract**: `0x5FbDB2315678afecb367f032d93F642f64180aa3`
-   **Mock Token Contract**: `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`

## ✅ Testing

This project includes both unit and end-to-end tests.

### Unit & Component Tests

To run the Vitest tests:
```bash
npm run test
```
To run the tests in UI mode:
```bash
npm run test:ui
```

### End-to-End Tests

The E2E tests use Playwright and Synpress to simulate user interactions in a real browser.

To run the Playwright tests:
```bash
npx playwright test
```
To open the Playwright UI:
```bash
npx playwright test --ui
```

## 📜 Available Scripts

| Script      | Description                                                               |
|-------------|---------------------------------------------------------------------------|
| `anvil`     | Starts a local Anvil node with the state from `tsender-deployed.json`.    |
| `dev`       | Starts the Next.js development server with Turbopack.                     |
| `build`     | Builds the application for production.                                    |
| `start`     | Starts a production server.                                               |
| `lint`      | Lints the codebase using Next.js's built-in ESLint configuration.         |
| `test`      | Runs Vitest tests.                                                        |
| `test:ui`   | Runs Vitest tests in UI mode.                                             |
| `test:run`  | Runs Vitest tests once and exits.                                         |

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).