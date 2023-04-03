// yarn blueprint run contract.uploadprojects EQAdqGep-5m0Y8GJ_ad0SpOXRwiptuN-yB3yIlXbtAJSM4yU --testnet --tonconnect
import { Address, Dictionary, toNano } from "ton-core";
import { QuadraticGrantTonContract } from "../sources/output/quadratic_grant_QuadraticGrantTonContract";
import { NetworkProvider } from "@ton-community/blueprint";

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input("QuadraticGrant address:"));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }
    const quadraticGrant = provider.open(QuadraticGrantTonContract.fromAddress(address));

    const round = await quadraticGrant.send(
        provider.sender(),
        {
            value: toNano("0.05"),
        },
        {
            $$type: "BatchUploadProjects",
            count: 2n,
            projects: Dictionary.empty<bigint, bigint>().set(1n, 411n).set(2n, 412n),
        }
    );
    (BigInt.prototype as any).toJSON = function () {
        return this.toString();
    };
    ui.write(`Round: ${JSON.stringify(round)}`);
    ui.clearActionPrompt();
}

// 