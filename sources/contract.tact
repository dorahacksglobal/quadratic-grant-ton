import "@stdlib/deploy";
import "@stdlib/ownable";

// CONST
const POW_10_DECIMALS: Int = 1000000000;

const ROUND_STATUS__OK: Int = 0;
const ROUND_STATUS__ENDED: Int  = 1;

// STRUCT
struct Project {
    id: Int;
    pid: Int;
    area: Int;
    votes: Int;
    contribution: Int;
    voter_number: Int;
    voters: map<Address, Int>;
}
struct Votes {
    project_id: Int;
    votes: Int;
}
struct Round {
    id: Int;
    tax_adjustment_multiplier: Int;
    voting_unit: Int;
    status: Int;
    fund: Int;
    project_number: Int;
    total_area: Int;
    contribution: Int;
}

// MESSAGE
message SetFund {
    fund: Int;
}
message BatchUploadProjects {
    count: Int;
    projects: map<Int, Int>;
}
message Vote {
    project_id: Int;
    votes: Int;
}

fun sqrt(x: Int): Int {
    if( x == 0 ) {return 0;}
    if( x < 4 ) {return 1;}
    let r: Int = x;
    let t: Int = x / 2 + 1;
    while( t < r ) {
        r = t;
        t = (x/t + t)/2;
    }
    return r;
}

contract QuadraticGrantTonContract with Deployable, Ownable {
    owner: Address;
    id: Int as uint32;
    contribution: Int;
    tax_adjustment_multiplier: Int;
    voting_unit: Int;
    status: Int;
    fund: Int;
    project_number: Int;
    total_area: Int;
    projects: map<Int, Project>;

    init(owner: Address, id: Int, tax_adjustment_multiplier: Int, voting_unit: Int, fund: Int) {
        self.owner = owner;
        self.id = id;
        self.tax_adjustment_multiplier = tax_adjustment_multiplier;
        self.voting_unit = voting_unit;
        self.fund =fund;

        self.contribution = 0;
        self.project_number = 0;
        self.total_area = 0;
        self.projects = null;
        self.status = ROUND_STATUS__OK;
    }

    receive(msg: SetFund) {
        self.requireOwner();
        self.fund = msg.fund;
    }

    receive(msg: BatchUploadProjects) {
        self.requireOwner();
        require(self.status==ROUND_STATUS__OK, "Round status is invalid");
        let project_number: Int = self.project_number;
        let i: Int = 1;
        repeat(msg.count) {
            project_number = project_number + 1;
            let project: Project = Project {
                id: project_number,
                pid: msg.projects.get(i)!!,
                area: 0,
                contribution: 0,
                votes: 0,
                voter_number: 0,
                voters: null
            };
            self.projects.set(project_number, project);
            i = i + 1;
        }
        self.project_number = project_number;
        send(SendParameters{
            to: sender(), 
            value: 0, 
            mode: SendRemainingValue
        });
    }

    receive(msg: Vote) {
        let ctx: Context = context();
        require(self.status==ROUND_STATUS__OK, "Round status is invalid");
        let project: Project = self.projects.get(msg.project_id)!!;
        let amount: Int = msg.votes;
        require(amount >= POW_10_DECIMALS / self.voting_unit, "Amount is too small");
        let votes: Int = amount * self.voting_unit / POW_10_DECIMALS;
        require(votes * POW_10_DECIMALS == amount * self.voting_unit, "Voting amount not integer");
        project.votes = project.votes + votes;
        project.contribution = project.contribution + amount;

        // Compute area difference and update project/round area
        let old_votes: Int = 0;
        let _old_votes: Int? = project.voters.get(sender());
        if(_old_votes != null) {
            old_votes = _old_votes!!;
        } else {
            project.voter_number = project.voter_number + 1;
        }
        let new_votes: Int = old_votes + votes;
        project.voters.set(sender(), new_votes);
        let old_area: Int = sqrt((old_votes * 100));
        let new_area: Int = sqrt((new_votes * 100));

        let area_diff: Int = new_area - old_area;

        project.area = project.area + area_diff;
        self.total_area = self.total_area + area_diff;

        self.projects.set(msg.project_id, project);

        require(ctx.value - amount >= 0 , "Insufficient funds");
        self.contribution = self.contribution + amount;
    }

    receive("EndRound") {
        self.requireOwner();
        self.status = ROUND_STATUS__ENDED;
        self.contribution = 0;
        send(SendParameters{to: sender(), value: 0, mode: SendRemainingBalance});
    }

    get fun roundInfo(): Round {
        return Round {
            id: self.id,
            tax_adjustment_multiplier: self.tax_adjustment_multiplier,
            voting_unit: self.voting_unit,
            status: self.status,
            fund: self.fund,
            project_number: self.project_number,
            total_area: self.total_area,
            contribution: self.contribution
        };
    }

    get fun project(project_id: Int): Project? {
        return self.projects.get(project_id);
    }
}
