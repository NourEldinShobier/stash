# stash

**Big outputs stay out of Claude's context. Claude pulls back only what it needs. Install in 1 minute.**

An MCP server, packaged as a Claude Code plugin. Works on macOS, Linux and Windows.

## Install (1 minute)

1. Run:

   ```bash
   claude plugin marketplace add NourEldinShobier/stash
   claude plugin install stash@stash
   ```

2. Restart Claude Code.

Done. Claude sees six new `stash_*` tools.

## You need

| What | Required? | Get it |
|---|---|---|
| [Bun](https://bun.sh) | Yes | `curl -fsSL https://bun.sh/install \| bash` (Windows: `powershell -c "irm bun.sh/install.ps1 \| iex"`) |
| `TYPESAFE_API_KEY` | Optional | [Jev](https://typesafe.ai) reranks search results |
| `JINA_API_KEY` | Optional | Cleaner web pages in `stash_index` ([free key](https://jina.ai/?sui=apikey)) |

## What it does

1. Claude runs a command, a code snippet, a file or a URL through stash.
2. stash stores the full output in a local SQLite search index and returns a short preview.
3. Claude searches that output and gets back only the matching parts.

## Tools

| Tool | Does |
|---|---|
| `stash_run` | Runs shell commands, stores the output, returns previews and search hits |
| `stash_code` | Runs a TypeScript, JavaScript, Python or shell snippet; returns only what it prints |
| `stash_index` | Stores a file or a web page |
| `stash_search` | Finds passages in anything stored (BM25, reranked by Jev) |
| `stash_get` | Returns one stored chunk or source in full, page by page |
| `stash_stats` | Bytes stored vs bytes returned |

## Results

| Test | Stored | Returned |
|---|---:|---:|
| `git log -p --stat -30` plus one search | 91 KB | 9.7 KB (**89% less**) |

## Where data lives

| Variable | Default | Does |
|---|---|---|
| `STASH_DIR` | `~/.cache/stash` | Location of the SQLite index |

- Each project gets its own index, keyed by the folder Claude Code runs in.
- Sources older than 7 days are pruned.
- Nothing leaves your machine except Jev reranking and Jina page loading, and only when those keys are set.

## Remove it

```bash
claude plugin uninstall stash@stash
```

## Develop

```bash
bun install
bun test
bun run typecheck
```

## Part of claude-tuning

stash is one piece of [claude-tuning](https://github.com/NourEldinShobier/claude-tuning), a full token-saving setup for Claude Code. Install stash alone if that's all you want.

## Licence

[MIT](LICENSE)
