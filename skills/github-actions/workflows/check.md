# Check

A Check workflow runs a repository's checks on pull requests. Put the workflow
in a file named `check.yml`. This file must start with the following content.

```yml
name: Check

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]
  workflow_call:
```

Add jobs after this content. Fill in those jobs from the repository's tooling
and documented checks. Examples are format, lint, type check, test, and build.

Follow the action version and job timeout rules in
[GitHub Actions](../SKILL.md). For JavaScript and TypeScript, follow
[Package Management](../../package-management/SKILL.md). Use the repository's
documented setup for tools such as mise.

`opened` runs Check when someone opens a pull request. `synchronize` runs Check
when someone pushes new commits to the head branch. `reopened` runs Check when
someone reopens a closed pull request. `ready_for_review` runs Check when a
draft pull request becomes ready for review. These events can change the result
of the checks.

The `workflow_call` trigger lets a release workflow or a deploy workflow call
Check and use the result as a gate.
