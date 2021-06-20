import core from '@actions/core';
import github from '@actions/github';

try {
  const token = core.getInput('token');
  const octokit = github.getOctokit(token);

  switch (github.context.eventName) {
    case "issues": {
      handleIssues(octokit, github.context.payload).catch(error => {
        core.setFailed(error.message);
      })
    }
  }
} catch (error) {
  core.setFailed(error.message);
}

/**
 * 
 * @param {ReturnType<typeof github.getOctokit>} octokit 
 * @param {import("@octokit/webhooks").EventPayloads.WebhookPayloadIssues} payload 
 */
async function handleIssues(octokit, payload) {
  if (payload.action !== "opened") return;

  const message = core.getInput('message');
  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    ...github.context.repo,
    issue_number: payload.issue.number,
    body: message
  })
}