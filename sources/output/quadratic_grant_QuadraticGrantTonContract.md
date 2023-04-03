# TACT Compilation Report
Contract: QuadraticGrantTonContract
BOC Size: 1948 bytes

# Types
Total Types: 12

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Project
TLB: `_ id:int257 pid:int257 area:int257 votes:int257 contribution:int257 voter_number:int257 voters:dict<address, int> = Project`
Signature: `Project{id:int257,pid:int257,area:int257,votes:int257,contribution:int257,voter_number:int257,voters:dict<address, int>}`

## Votes
TLB: `_ project_id:int257 votes:int257 = Votes`
Signature: `Votes{project_id:int257,votes:int257}`

## Round
TLB: `_ id:int257 tax_adjustment_multiplier:int257 voting_unit:int257 status:int257 fund:int257 project_number:int257 total_area:int257 contribution:int257 = Round`
Signature: `Round{id:int257,tax_adjustment_multiplier:int257,voting_unit:int257,status:int257,fund:int257,project_number:int257,total_area:int257,contribution:int257}`

## SetFund
TLB: `set_fund#80eb2836 fund:int257 = SetFund`
Signature: `SetFund{fund:int257}`

## BatchUploadProjects
TLB: `batch_upload_projects#7b416b9f count:int257 projects:dict<int, int> = BatchUploadProjects`
Signature: `BatchUploadProjects{count:int257,projects:dict<int, int>}`

## Vote
TLB: `vote#eb874c29 project_id:int257 votes:int257 = Vote`
Signature: `Vote{project_id:int257,votes:int257}`

# Get Methods
Total Get Methods: 3

## roundInfo

## project
Argument: project_id

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
14329: Voting amount not integer
15518: Amount is too small
26909: Round status is invalid
51754: Insufficient funds