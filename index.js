const core = require("@actions/core");
const github = require("@actions/github");
const integratedadrees = require("integraddr");


async function run() {
	try {
		const octokit = github.getOctokit(core.getInput("token"));
		const issueNumber = github.context.payload.issue.number;




		const comments = await octokit.paginate(
			octokit.rest.issues.listComments,
			{
				owner: github.context.payload.repository.owner.login,
				repo: github.context.payload.repository.name,
				issue_number: issueNumber,
			}
			);


		  for (var cmt in comments){
			if (comments[cmt].user.login === "github-actions[bot]")
				return;
		  }









		  var addr = generateIntegratedAddress("46QfCnPVvSk3yZVxNtUGhPKpTkxAZuVQgAtEhu4Act724UGvkii8Y87KpS92i4pmbA3ozd8UE9XCqSPstYvPLuKrLdBXab1", issueNumber);


		const { data: comment } = await octokit.rest.issues.createComment({
			owner: github.context.payload.repository.owner.login,
			repo: github.context.payload.repository.name,
			issue_number: issueNumber,
			body: "test" + addr,
		});

	core.setOutput("comment-id", comment.id);

	}catch (error){
		core.setFailed(error.message);
	}
}

run();