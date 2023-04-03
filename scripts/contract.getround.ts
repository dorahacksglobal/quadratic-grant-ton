// yarn blueprint run contract.getround EQCVVByXu_ZQmZOxlLG9djZj1aAqIv2YOx_coPQhNYO_HSkM --testnet --tonconnect
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

    const balanceBefore = await quadraticGrant.getRoundInfo();
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
      };
    ui.write(`Round: ${JSON.stringify(balanceBefore)}`);
    ui.clearActionPrompt();
}
