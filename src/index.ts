import path from "node:path";
import type { Hooks, PluginInput } from "@opencode-ai/plugin";

type BunShell = PluginInput["$"];

interface ExtendedHooks extends Hooks {
	"tui.prompt.append"?: () => Promise<string>;
}

type ExtendedPlugin = (input: PluginInput) => Promise<ExtendedHooks>;

async function getProjectName($: BunShell, worktree: string): Promise<string> {
	try {
		const remoteUrl = (
			await $`git -C ${worktree} remote get-url origin`.text()
		).trim();
		const match = remoteUrl.match(/\/([^/]+?)(?:\.git)?$/);
		if (match) {
			return match[1];
		}
	} catch {}
	return path.basename(worktree);
}

export const GitBranchPlugin: ExtendedPlugin = async (context) => {
	const { $, worktree } = context;

	return {
		"tui.prompt.append": async () => {
			try {
				const branch = (
					await $`git -C ${worktree} branch --show-current`.text()
				).trim();
				if (!branch) {
					return "";
				}

				const status = (
					await $`git -C ${worktree} status --porcelain`.text()
				).trim();
				const dirtyMark = status.length > 0 ? "*" : "";

				const projectName = await getProjectName($, worktree);

				return ` [${projectName}:${branch}${dirtyMark}]`;
			} catch {
				return "";
			}
		},
	};
};

export default GitBranchPlugin;
