# Check

A Check workflow runs a repository's checks on pull requests and on `main`. Put
the workflow in a file named `check.yml`. This file must start with the
following content.

```yml
name: Check

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  workflow_call:
```

Add jobs after this content. Fill in those jobs from the repository's tooling
and documented checks. Examples are format, lint, type check, test, and build.

The workflow must run on every push to `main`. This push run catches breakage
after a merge. It also keeps the status of `main` green.

Limit the push trigger to `main`. Do not run the workflow on every push. This
rule avoids duplicate runs.
