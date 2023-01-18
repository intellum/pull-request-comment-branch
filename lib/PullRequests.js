"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullRequestDetails = exports.isPullRequest = void 0;
const github_1 = require("@actions/github");
async function isPullRequest(token) {
    const client = (0, github_1.getOctokit)(token);
    const { data: { pull_request } } = await client.rest.issues.get({
        ...github_1.context.repo,
        issue_number: github_1.context.issue.number,
    });
    return !!pull_request;
}
exports.isPullRequest = isPullRequest;
async function pullRequestDetails(token) {
    const client = (0, github_1.getOctokit)(token);
    const { repository: { pullRequest: { baseRef, headRef, }, }, } = await client.graphql(`
      query pullRequestDetails($repo:String!, $owner:String!, $number:Int!) {
        repository(name: $repo, owner: $owner) {
          pullRequest(number: $number) {
            baseRef {
              name
              target {
                oid
              }
            }
            headRef {
              name
              target {
                oid
              }
            }
          }
        }
      }
    `, {
        ...github_1.context.repo,
        number: github_1.context.issue.number
    });
    return {
        base_ref: baseRef.name,
        base_sha: baseRef.target.oid,
        head_ref: headRef.name,
        head_sha: headRef.target.oid,
    };
}
exports.pullRequestDetails = pullRequestDetails;
