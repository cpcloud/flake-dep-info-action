import * as core from "@actions/core";
import * as fs from "fs";

interface Locked {
  lastModified: number;
  narHash: string;
  owner: string;
  repo: string;
  rev: string;
  type: string;
}

interface Original {
  owner: string;
  ref?: string;
  repo: string;
  type: string;
}

interface Inputs {
  [key: string]: string;
}

interface Node {
  locked: Locked;
  original: Original;
  inputs?: Inputs;
}

interface Lock {
  nodes: { [key: string]: Node };
  root: string;
  version: number;
}

(async function (): Promise<void> {
  try {
    const input = core.getInput("input", { required: true });
    const lockfile = core.getInput("lockfile", { required: true });
    const shortRevLength = JSON.parse(
      core.getInput("short-rev-length", { required: true }),
    );
    const fileContents = fs.readFileSync(lockfile, { encoding: "utf8" });
    const lock: Lock = JSON.parse(fileContents);
    const inputs = lock.nodes.root.inputs;
    const rawName = inputs !== undefined ? inputs[input] : input;
    const dep = lock.nodes[rawName].locked;

    // see https://github.com/actions/toolkit/issues/777
    // for why each call prints a newline
    core.setOutput("owner", dep.owner);
    core.setOutput("repo", dep.repo);
    core.setOutput("rev", dep.rev);
    core.setOutput("short-rev", dep.rev.slice(0, shortRevLength));
  } catch (error) {
    core.setFailed(`Action failed with error: ${error}`); // eslint-disable-line i18n-text/no-en
  }
})();
