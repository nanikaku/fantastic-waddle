const core = require("@actions/core");
const github = require("@actions/github");


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
			console.log(`Inputs: ${comments[cmt].user.login}`);
			if (comments[cmt].user.login === "github-actions[bot]")
				return;
		  }












		const { data: comment } = await octokit.rest.issues.createComment({
			owner: github.context.payload.repository.owner.login,
			repo: github.context.payload.repository.name,
			issue_number: issueNumber,
			body: "test",
		});

	core.setOutput("comment-id", comment.id);

	}catch (error){
		core.setFailed(error.message);
	}
}

run();