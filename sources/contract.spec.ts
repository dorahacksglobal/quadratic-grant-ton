import { Dictionary, toNano, SendMode } from "ton";
import { ContractSystem } from "@tact-lang/emulator";
import { QuadraticGrantTonContract, Votes } from "./output/quadratic_grant_QuadraticGrantTonContract";

describe("contract", () => {
    it("should process correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();

        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await QuadraticGrantTonContract.fromInit(owner.address, 1n, 10n, 10n, 4000n));
        system.name(contract.address, "contract");

        // This object would track all transactions in this contract
        let track = system.track(contract);
        // This object would track all logs
        let logger = system.log(contract.address);

        // ============ STEP 1: Deploy contract ============
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.collect()).toMatchSnapshot(); // 1
        expect(await contract.getBalance()).toMatchInlineSnapshot(`0n`); // 2

        // ================== STEP 3: Upload projects ==================
        await contract.send(
            owner,
            {
                value: toNano("0.1"),
            },
            {
                $$type: "BatchUploadProjects",
                count: 2n,
                projects: Dictionary.empty<bigint, bigint>().set(1n, 1n).set(2n, 2n),
            }
        );
        await contract.send(
            owner,
            {
                value: toNano("0.1"),
            },
            {
                $$type: "BatchUploadProjects",
                count: 1n,
                projects: Dictionary.empty<bigint, bigint>().set(1n, 3n),
            }
        );
        await system.run();
        expect(track.collect()).toMatchSnapshot(); // 3
        expect(await contract.getRoundInfo()).toMatchSnapshot(); // 4
        expect(await contract.getBalance()).toMatchInlineSnapshot(`0n`); // 5

        // ================== STEP 4: Vote ==================
        await contract.send(
            nonOwner,
            { value: toNano("1.6") }, // 1.600000000
            {
                $$type: "Vote",
                project_id: 1n,
                votes: toNano("1.6"),
            }
        );
        await contract.send(
            nonOwner,
            { value: toNano("0.9") },
            {
                $$type: "Vote",
                project_id: 1n,
                votes: toNano("0.9"),
            }
        );
        await contract.send(
            nonOwner,
            { value: toNano("1.6") },
            {
                $$type: "Vote",
                project_id: 2n,
                votes: toNano("1.6"),
            }
        );
        await contract.send(
            owner,
            { value: toNano("0.9") },
            {
                $$type: "Vote",
                project_id: 1n,
                votes: toNano("0.9"),
            }
        );
        // logger.reset();
        await system.run();
        // console.log(logger.collect());
        expect(track.collect()).toMatchSnapshot(); // 6
        expect(await contract.getRoundInfo()).toMatchSnapshot(); // 7
        expect(await contract.getBalance()).toMatchInlineSnapshot(`4925526000n`); // 8

        // ================== STEP 5: Upload More Projects==================
        await contract.send(
            owner,
            {
                value: toNano("0.1"),
            },
            {
                $$type: "BatchUploadProjects",
                count: 1n,
                projects: Dictionary.empty<bigint, bigint>().set(1n, 3n),
            }
        );

        await system.run();
        expect(track.collect()).toMatchSnapshot(); // 9
        expect(await contract.getBalance()).toMatchInlineSnapshot(`4925526000n`); // 10
        expect(await contract.getProject(1n)).toMatchSnapshot(); // 11
        expect(await contract.getProject(2n)).toMatchSnapshot(); // 12
        expect(await contract.getProject(3n)).toMatchSnapshot(); // 13

        // ================== STEP 5: End Round ==================
        await contract.send(owner, { value: toNano("1") }, "EndRound");
        await system.run();
        expect(track.collect()).toMatchSnapshot(); // 14
        expect(await contract.getBalance()).toEqual(0n);
    });
});
