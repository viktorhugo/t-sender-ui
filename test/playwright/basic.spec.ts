import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures, MetaMask } from '@synthetixio/synpress/playwright';

import basicSetup from '../wallet-setup/basic.setup'; // Import the basic Metamask wallet setup

const metamaskTestWallet = metaMaskFixtures(basicSetup);
const test = testWithSynpress(metamaskTestWallet);
const { expect } = test;

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/TSender/);
});

test('should show the airdrop from when connected, otherwise, not', async ({ page, metamaskPage, context, extensionId }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page.getByText('Connect Wallet')).toBeVisible(); // Encontrar cualquier parte de la pagina por texto
  const metamask = new MetaMask(context, metamaskPage,basicSetup.walletPassword, extensionId );
  // make click on the connect button
  await page.getByTestId('rk-connect-button').click();
  // wait for the modal buttons to appear
  await page.getByTestId('rk-wallet-option-io.metamask').waitFor({ state: 'visible', timeout: 30000 });
  // make click on the connect button
  await page.getByTestId('rk-wallet-option-io.metamask').click();
  // connect metamask
  await metamask.connectToDapp(); // creara una metamask for us

  // add custom network 
  const customNetwork = {
    name: 'Anvil',
    rpcUrl: 'http://127.0.1:8545', // Localhost RPC URL
    chainId: 31337, 
    symbol: 'ETH'
  }
  await metamask.addNetwork(customNetwork);

  // esperamos ver un cuadro de texto
  await expect(page.getByText('Token Address')).toBeVisible();
});

