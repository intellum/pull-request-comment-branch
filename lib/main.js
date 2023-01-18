"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core_1 = require("@actions/core");
const PullRequests_1 = require("./PullRequests");
async function run() {
    try {
        const token = (0, core_1.getInput)("repo_token", { required: true });
        if (!(0, PullRequests_1.isPullRequest)(token)) {
            throw Error("Comment is not on a pull request");
        }
        const { base_ref, base_sha, head_ref, head_sha, } = await (0, PullRequests_1.pullRequestDetails)(token);
        (0, core_1.setOutput)("base_ref", base_ref);
        (0, core_1.setOutput)("base_sha", base_sha);
        (0, core_1.setOutput)("head_ref", head_ref);
        (0, core_1.setOutput)("head_sha", head_sha);
        // Deprecated
        (0, core_1.setOutput)("ref", head_ref);
        (0, core_1.setOutput)("sha", head_sha);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, core_1.setFailed)(error.message);
        }
        else {
            throw error;
        }
    }
}
exports.run = run;
run();
