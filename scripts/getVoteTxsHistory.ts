import { Cell } from "ton-core";
import { loadVote } from "../sources/output/quadratic_grant_QuadraticGrantTonContract";
import TonWeb from "tonweb";

const tonweb = new TonWeb(
    new TonWeb.HttpProvider(
        "https://testnet.toncenter.com/api/v2/jsonRPC?api_key=15870941a8a961348db217262bd208ba86d9a84946269e69ecffc834c6f4b04d"
    )
);
const contractAddress = "EQDxazdcaT5T-XVdz2uIQzCeznPa-cokj-d88t2DLf3RLYHj";

async function main() {
    const round = await tonweb.provider.call2(contractAddress, "roundInfo", []);
    const [id, tax_adjustment_multiplier, voting_unit, status, fund, project_number, total_area, contribution] =
        round.map((e: BigInt) => e.toString());
    console.log([id, tax_adjustment_multiplier, voting_unit, status, fund, project_number, total_area, contribution]);

    let i = 10;
    let lt = NaN;
    let hash = undefined;
    while (i--) {
        const history: any[] = await tonweb.getTransactions(contractAddress, 25, lt, hash);
        const voteTxs = history.filter((h: any) => h?.in_msg?.message?.startsWith("64dMKQ")); // VOTE
        if (!voteTxs || voteTxs.length === 1) {
            break;
        }
        // console.log(voteTxs);
        let result: any[] = [];
        for (const tx of voteTxs) {
            const sender = tx.in_msg.source;
            const cellBase64 = tx.in_msg.msg_data.body;
            const cellBuffer = Buffer.from(cellBase64, "base64");
            const cell = Cell.fromBoc(cellBuffer)[0];
            const votes = loadVote(cell.asSlice());
            console.log(tx.utime, tx.transaction_id.lt, tx.transaction_id.hash, sender, votes.project_id, votes.votes);
            const event = {
                sender,
                utime: tx.utime,
                lt: tx.transaction_id.lt,
                hash: tx.transaction_id.hash,
                project_id: votes.project_id.toString(),
                votes: votes.votes.toString(),
            };
            result = [...result, event];
        }
        result.sort((a, b) => a.lt - b.lt);
        lt = result[0].lt;
        hash = result[0].hash;
        console.log({ lt, hash });
    }

    for (let i = 1; i <= project_number; i++) {
        const [id, pid, area, votes, contribution, voter_number, voters] = await tonweb.provider.call2(
            contractAddress,
            "project",
            [["num", i.toString()]]
        );
        console.log(id, pid, area, votes, contribution, voter_number);
    }
}
main();

const tx = {
    "@type": "raw.transaction",
    utime: 1680442018,
    data: "te6cckECCAEAAd4AA7d/FrN1xpPlP5dV3Pa4hDMJ7Oc9r5yiSP53zy3YMt/dEtAAAJUCKRlYPZutaD8WQkbvPtRwo3fhJDLJTq0txejmDCPDI2Pt8CFAAACVAbaoeDZCmCogABSAINAIqAECAwEBoAQAgnKBczwbOuVV8M6Z6obGip2cD4LdnfSB3TyOy7sj40eQvCcVMoER5MOKOaj/OjctqUadHzBMgg1zqNqVSr9ToSEqAhsEgENJAX14QBiAIM/nEQYHAbFoANB3u+W/5mgZ1jVZxp8YxTrBKv03cLgitocrJL0dNRrZADxazdcaT5T+XVdz2uIQzCeznPa+cokj+d88t2DLf3RLUBfXhAAGIXz8AAASoEUjKwTIUwVEwAUAieuHTCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfXhAIACeSGZsBhqAAAAAAAAAAAHaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbwAAAAAAAAAAAAAAAAS1FLaRJ5QuM990nhh8UYSKv4bVGu4tw/IIW8MYUE5+OBLyPIMg=",
    transaction_id: {
        "@type": "internal.transactionId",
        lt: "10239782000003",
        hash: "vNIqXtx22Iwk8NU5j5pKThBpveopoDFO2NkF3vEEW0Y=",
    },
    fee: "17203269",
    storage_fee: "269",
    other_fee: "17203000",
    in_msg: {
        "@type": "raw.message",
        source: "EQBoO93y3_M0DOsarONPjGKdYJV-m7hcEVtDlZJejpqNbKrA",
        destination: "EQDxazdcaT5T-XVdz2uIQzCeznPa-cokj-d88t2DLf3RLYHj",
        value: "100000000",
        fwd_fee: "1097342",
        ihr_fee: "0",
        created_lt: "10239782000002",
        body_hash: "7crv74XeEODeDdhmT79WIS9gwspTZVqR2xEi6wg8p04=",
        msg_data: {
            "@type": "msg.dataRaw",
            body: "te6cckEBAQEARwAAieuHTCkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABfXhAIDW3KrI=",
            init_state: "",
        },
        message: "64dMKQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAA\nAAAAAAAAAAF9eEAA\n",
    },
    out_msgs: [],
};