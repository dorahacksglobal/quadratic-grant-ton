import * as fs from 'fs';
import * as path from 'path';
import { Address, contractAddress } from "ton";
import { QuadraticGrantTonContract } from "./output/quadratic_grant_QuadraticGrantTonContract";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {

    // Parameters
    let testnet = true;
    let packageName = 'quadratic_grant_QuadraticGrantTonContract.pkg';
    let owner = Address.parse('kQBoO93y3_M0DOsarONPjGKdYJV-m7hcEVtDlZJejpqNbBFK');
    let init = await QuadraticGrantTonContract.init(owner, 3n, 10n, 10n, 4000n);

    // Load required data
    let address = contractAddress(0, init);
    let data = init.data.toBoc();
    let pkg = fs.readFileSync(path.resolve(__dirname, 'output', packageName));

    // Prepareing
    console.log('Uploading package...');
    let prepare = await prepareTactDeployment({ pkg, data, testnet });

    // Deploying
    console.log("============================================================================================");
    console.log('Contract Address')
    console.log("============================================================================================");
    console.log();
    console.log(address.toString({ testOnly: testnet }));
    console.log();
    console.log("============================================================================================");
    console.log('Please, follow deployment link')
    console.log("============================================================================================");
    console.log();
    console.log(prepare);
    console.log();
    console.log("============================================================================================");
})();