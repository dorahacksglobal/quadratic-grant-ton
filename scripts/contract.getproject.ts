// yarn blueprint run contract.getproject EQAdqGep-5m0Y8GJ_ad0SpOXRwiptuN-yB3yIlXbtAJSM4yU --testnet --tonconnect
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
    
    const project = await ui.input('Project:');

    const balanceBefore = await quadraticGrant.getProject(BigInt(project));
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
      };
    ui.write(`Project: ${JSON.stringify(balanceBefore)}`);
    ui.clearActionPrompt();
}

// yarn blueprint run contract.getproject EQAl-b6dQm8ctSWhH4fY5vw79SmuqchS3Ts0WKJgN1Lyjm9f --testnet --tonconnect
