import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    TupleBuilder,
    DictionaryValue
} from 'ton-core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type Project = {
    $$type: 'Project';
    id: bigint;
    pid: bigint;
    area: bigint;
    votes: bigint;
    contribution: bigint;
    voter_number: bigint;
    voters: Dictionary<Address, bigint>;
}

export function storeProject(src: Project) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeInt(src.pid, 257);
        b_0.storeInt(src.area, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.votes, 257);
        b_1.storeInt(src.contribution, 257);
        b_1.storeInt(src.voter_number, 257);
        b_1.storeDict(src.voters, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadProject(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _pid = sc_0.loadIntBig(257);
    let _area = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _votes = sc_1.loadIntBig(257);
    let _contribution = sc_1.loadIntBig(257);
    let _voter_number = sc_1.loadIntBig(257);
    let _voters = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_1);
    return { $$type: 'Project' as const, id: _id, pid: _pid, area: _area, votes: _votes, contribution: _contribution, voter_number: _voter_number, voters: _voters };
}

function loadTupleProject(source: TupleReader) {
    let _id = source.readBigNumber();
    let _pid = source.readBigNumber();
    let _area = source.readBigNumber();
    let _votes = source.readBigNumber();
    let _contribution = source.readBigNumber();
    let _voter_number = source.readBigNumber();
    let _voters = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'Project' as const, id: _id, pid: _pid, area: _area, votes: _votes, contribution: _contribution, voter_number: _voter_number, voters: _voters };
}

function storeTupleProject(source: Project) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.pid);
    builder.writeNumber(source.area);
    builder.writeNumber(source.votes);
    builder.writeNumber(source.contribution);
    builder.writeNumber(source.voter_number);
    builder.writeCell(source.voters.size > 0 ? beginCell().storeDictDirect(source.voters, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserProject(): DictionaryValue<Project> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeProject(src)).endCell());
        },
        parse: (src) => {
            return loadProject(src.loadRef().beginParse());
        }
    }
}

export type Votes = {
    $$type: 'Votes';
    project_id: bigint;
    votes: bigint;
}

export function storeVotes(src: Votes) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.project_id, 257);
        b_0.storeInt(src.votes, 257);
    };
}

export function loadVotes(slice: Slice) {
    let sc_0 = slice;
    let _project_id = sc_0.loadIntBig(257);
    let _votes = sc_0.loadIntBig(257);
    return { $$type: 'Votes' as const, project_id: _project_id, votes: _votes };
}

function loadTupleVotes(source: TupleReader) {
    let _project_id = source.readBigNumber();
    let _votes = source.readBigNumber();
    return { $$type: 'Votes' as const, project_id: _project_id, votes: _votes };
}

function storeTupleVotes(source: Votes) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.project_id);
    builder.writeNumber(source.votes);
    return builder.build();
}

function dictValueParserVotes(): DictionaryValue<Votes> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVotes(src)).endCell());
        },
        parse: (src) => {
            return loadVotes(src.loadRef().beginParse());
        }
    }
}

export type Round = {
    $$type: 'Round';
    id: bigint;
    tax_adjustment_multiplier: bigint;
    voting_unit: bigint;
    status: bigint;
    fund: bigint;
    project_number: bigint;
    total_area: bigint;
    contribution: bigint;
}

export function storeRound(src: Round) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeInt(src.tax_adjustment_multiplier, 257);
        b_0.storeInt(src.voting_unit, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.status, 257);
        b_1.storeInt(src.fund, 257);
        b_1.storeInt(src.project_number, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.total_area, 257);
        b_2.storeInt(src.contribution, 257);
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadRound(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _tax_adjustment_multiplier = sc_0.loadIntBig(257);
    let _voting_unit = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _status = sc_1.loadIntBig(257);
    let _fund = sc_1.loadIntBig(257);
    let _project_number = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _total_area = sc_2.loadIntBig(257);
    let _contribution = sc_2.loadIntBig(257);
    return { $$type: 'Round' as const, id: _id, tax_adjustment_multiplier: _tax_adjustment_multiplier, voting_unit: _voting_unit, status: _status, fund: _fund, project_number: _project_number, total_area: _total_area, contribution: _contribution };
}

function loadTupleRound(source: TupleReader) {
    let _id = source.readBigNumber();
    let _tax_adjustment_multiplier = source.readBigNumber();
    let _voting_unit = source.readBigNumber();
    let _status = source.readBigNumber();
    let _fund = source.readBigNumber();
    let _project_number = source.readBigNumber();
    let _total_area = source.readBigNumber();
    let _contribution = source.readBigNumber();
    return { $$type: 'Round' as const, id: _id, tax_adjustment_multiplier: _tax_adjustment_multiplier, voting_unit: _voting_unit, status: _status, fund: _fund, project_number: _project_number, total_area: _total_area, contribution: _contribution };
}

function storeTupleRound(source: Round) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.tax_adjustment_multiplier);
    builder.writeNumber(source.voting_unit);
    builder.writeNumber(source.status);
    builder.writeNumber(source.fund);
    builder.writeNumber(source.project_number);
    builder.writeNumber(source.total_area);
    builder.writeNumber(source.contribution);
    return builder.build();
}

function dictValueParserRound(): DictionaryValue<Round> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRound(src)).endCell());
        },
        parse: (src) => {
            return loadRound(src.loadRef().beginParse());
        }
    }
}

export type SetFund = {
    $$type: 'SetFund';
    fund: bigint;
}

export function storeSetFund(src: SetFund) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2162894902, 32);
        b_0.storeInt(src.fund, 257);
    };
}

export function loadSetFund(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2162894902) { throw Error('Invalid prefix'); }
    let _fund = sc_0.loadIntBig(257);
    return { $$type: 'SetFund' as const, fund: _fund };
}

function loadTupleSetFund(source: TupleReader) {
    let _fund = source.readBigNumber();
    return { $$type: 'SetFund' as const, fund: _fund };
}

function storeTupleSetFund(source: SetFund) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fund);
    return builder.build();
}

function dictValueParserSetFund(): DictionaryValue<SetFund> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetFund(src)).endCell());
        },
        parse: (src) => {
            return loadSetFund(src.loadRef().beginParse());
        }
    }
}

export type BatchUploadProjects = {
    $$type: 'BatchUploadProjects';
    count: bigint;
    projects: Dictionary<bigint, bigint>;
}

export function storeBatchUploadProjects(src: BatchUploadProjects) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2067884959, 32);
        b_0.storeInt(src.count, 257);
        b_0.storeDict(src.projects, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadBatchUploadProjects(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2067884959) { throw Error('Invalid prefix'); }
    let _count = sc_0.loadIntBig(257);
    let _projects = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'BatchUploadProjects' as const, count: _count, projects: _projects };
}

function loadTupleBatchUploadProjects(source: TupleReader) {
    let _count = source.readBigNumber();
    let _projects = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'BatchUploadProjects' as const, count: _count, projects: _projects };
}

function storeTupleBatchUploadProjects(source: BatchUploadProjects) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.count);
    builder.writeCell(source.projects.size > 0 ? beginCell().storeDictDirect(source.projects, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserBatchUploadProjects(): DictionaryValue<BatchUploadProjects> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBatchUploadProjects(src)).endCell());
        },
        parse: (src) => {
            return loadBatchUploadProjects(src.loadRef().beginParse());
        }
    }
}

export type Vote = {
    $$type: 'Vote';
    project_id: bigint;
    votes: bigint;
}

export function storeVote(src: Vote) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3951512617, 32);
        b_0.storeInt(src.project_id, 257);
        b_0.storeInt(src.votes, 257);
    };
}

export function loadVote(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3951512617) { throw Error('Invalid prefix'); }
    let _project_id = sc_0.loadIntBig(257);
    let _votes = sc_0.loadIntBig(257);
    return { $$type: 'Vote' as const, project_id: _project_id, votes: _votes };
}

function loadTupleVote(source: TupleReader) {
    let _project_id = source.readBigNumber();
    let _votes = source.readBigNumber();
    return { $$type: 'Vote' as const, project_id: _project_id, votes: _votes };
}

function storeTupleVote(source: Vote) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.project_id);
    builder.writeNumber(source.votes);
    return builder.build();
}

function dictValueParserVote(): DictionaryValue<Vote> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeVote(src)).endCell());
        },
        parse: (src) => {
            return loadVote(src.loadRef().beginParse());
        }
    }
}

 type QuadraticGrantTonContract_init_args = {
    $$type: 'QuadraticGrantTonContract_init_args';
    owner: Address;
    id: bigint;
    tax_adjustment_multiplier: bigint;
    voting_unit: bigint;
    fund: bigint;
}

function initQuadraticGrantTonContract_init_args(src: QuadraticGrantTonContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.id, 257);
        b_0.storeInt(src.tax_adjustment_multiplier, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.voting_unit, 257);
        b_1.storeInt(src.fund, 257);
        b_0.storeRef(b_1.endCell());
    };
}

async function QuadraticGrantTonContract_init(owner: Address, id: bigint, tax_adjustment_multiplier: bigint, voting_unit: bigint, fund: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initQuadraticGrantTonContract_init_args({ $$type: 'QuadraticGrantTonContract_init_args', owner, id, tax_adjustment_multiplier, voting_unit, fund })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const QuadraticGrantTonContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    14329: { message: `Voting amount not integer` },
    15518: { message: `Amount is too small` },
    26909: { message: `Round status is invalid` },
    51754: { message: `Insufficient funds` },
}

export class QuadraticGrantTonContract implements Contract {
    
    static async init(owner: Address, id: bigint, tax_adjustment_multiplier: bigint, voting_unit: bigint, fund: bigint) {
        return await QuadraticGrantTonContract_init(owner, id, tax_adjustment_multiplier, voting_unit, fund);
    }
    
    static async fromInit(owner: Address, id: bigint, tax_adjustment_multiplier: bigint, voting_unit: bigint, fund: bigint) {
        const init = await QuadraticGrantTonContract_init(owner, id, tax_adjustment_multiplier, voting_unit, fund);
        const address = contractAddress(0, init);
        return new QuadraticGrantTonContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new QuadraticGrantTonContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: QuadraticGrantTonContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: SetFund | BatchUploadProjects | Vote | 'EndRound' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetFund') {
            body = beginCell().store(storeSetFund(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BatchUploadProjects') {
            body = beginCell().store(storeBatchUploadProjects(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Vote') {
            body = beginCell().store(storeVote(message)).endCell();
        }
        if (message === 'EndRound') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getRoundInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('roundInfo', builder.build())).stack;
        const result = loadTupleRound(source);
        return result;
    }
    
    async getProject(provider: ContractProvider, project_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(project_id);
        let source = (await provider.get('project', builder.build())).stack;
        const result_p = source.readTupleOpt();
        const result = result_p ? loadTupleProject(result_p) : null;
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}