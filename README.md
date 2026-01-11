# opencode-branch-name

OpenCode plugin that displays Git project name and branch in the TUI prompt.

## Installation

Add the plugin to your `opencode.json` or `opencode.jsonc`:

```json
{
  "plugin": ["opencode-branch-name@latest"]
}
```

Restart OpenCode. The plugin will be automatically installed and loaded.

## What it does

The plugin appends Git repository information to the prompt:

```
Before: >
After:  > [project-name:branch-name]
```

If there are uncommitted changes, a `*` is shown:

```
> [project-name:main*]
```

## Features

- Displays current Git branch name
- Shows project name (from remote URL or directory name)
- Indicates dirty working directory with `*`
- Gracefully handles non-Git directories

## Development

```bash
# Install dependencies
bun install

# Run linter
bun run lint

# Fix lint issues
bun run lint:fix

# Format code
bun run format

# Type check
bun run typecheck

# Build
bun run build
```

## License

MIT
