# AGENTS.md

This repository holds a collection of skills for two harnesses:

- Claude
- OpenAI Codex

Every skill must support both harnesses. Each skill lives in its own directory
under `skills/`.

## Developer Setup

After cloning, run `bun install` to install project dependencies.

Then run `bun run config` to configure Vite+ and enable Git hooks.

## Writing Style

Write all content in this repository in Simplified Technical English (STE).
Follow these rules:

- Write short sentences. Use no more than 20 words per sentence.
- Write one instruction per sentence.
- Use active voice, not passive voice.
- Use the same term for the same concept every time.
- Use simple, common words.
- Use "must" for requirements. Do not use "should" for a requirement.

## Writing Skills

Put each skill in its own directory: `skills/<skill-name>/SKILL.md`. Keep the
frontmatter `name` value stable, lowercase, and hyphenated. State any
environment need, such as browser access or a custom MCP server, in the skill's
own instructions.

Write a `description` property in each skill's front matter. Include these three
parts:

- What the skill does
- When to use the skill
- The skill's key capabilities

Keep the `description` property up to date.

Use `agents/openai.yaml` for user-facing skill labels in Codex:

```yaml
interface:
  display_name: "Readable Skill Name"
  short_description: "Short UI description"
  default_prompt: "Use $skill-name to handle the task."
```

This metadata does not change the skill's invocation identifier.

## TypeScript and Testing

Use Bun-native APIs instead of Node.js APIs:

- Use `Bun.file(path).json()` or `Bun.file(path).text()` instead of
  `fs.readFileSync`.
- Use the `node:fs` and `node:path` import prefixes instead of the bare `fs` and
  `path` names.
- Use `require()` only when no Bun-native alternative exists.

## Verification

Run these commands after every change, without exception:

- `bun format`
- `bun check`

## Source Code Readability

Use blank lines to make source code readable:

- Preserve existing blank lines when editing.
- Separate imports, declarations, and functions with blank lines.
- Inside functions, separate logical steps with one blank line.
- Keep related statements together.
- Before finishing, review changed code for missing blank lines.

Apply these rules to both files and code shown in responses.
