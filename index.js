const core = require("@actions/core");
const github = require("@actions/github");


async function run() {
	try {
		const octokit = github.getOctokit(core.getInput("token"));
		const issueNumber = github.context.payload.issue.number;


		const { data: comment } = await octokit.rest.issues.createComment({
			owner: github.payload.repository.owner.login,
			repo: github.payload.repository.name,
			issue_number: issueNumber,
			body: "test",
		});

	core.setOutput("comment-id", comment.id);

	}catch (error){
		core.setFailed(error.message);
	}
}

run();