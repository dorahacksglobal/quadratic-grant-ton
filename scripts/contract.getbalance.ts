// yarn blueprint run contract.getbalance EQArTR69wM9aeQIWI1VllUXh_JIjYnWrtWZKWSpTUifs2YdI --testnet --tonconnect
import { Address, toNano } from 'ton-core';
import { QuadraticGrantTonContract } from "../sources/output/quadratic_grant_QuadraticGrantTonContract";
import { NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('QuadraticGrant address:'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }
    const quadraticGrant = provider.open(QuadraticGrantTonContract.fromAddress(address))

    const balance = await quadraticGrant.getBalance();
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
      };
    ui.write(`Balance: ${JSON.stringify(balance)}`);
    ui.clearActionPrompt();
}
