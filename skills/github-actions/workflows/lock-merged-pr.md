# Lock merged PR

A lock-merged-PR workflow locks the pull request conversation after a merge. Put
the workflow in a file named `lock-merged-pr.yml`. This file must contain the
following content.

```yml
name: Lock merged PR

on:
  pull_request_target:
    types: [closed]

jobs:
  lock:
    if: github.event.pull_request.merged == true
    runs-on: ubuntu-latest
    timeout-minutes: 5
    permissions:
      pull-requests: write
      issues: write

    steps:
      - name: Lock conversation
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          endpoint="repos/${{ github.repository }}/issues/${{ github.event.pull_request.number }}"
          if ! gh api -X PUT "${endpoint}/lock" -f lock_reason=resolved; then
            locked="$(gh api "$endpoint" --jq .locked)"
            if [ "$locked" = "true" ]; then
              echo "Conversation is already locked."
              exit 0
            fi
            exit 1
          fi
```

Use `pull_request_target` so the job can lock a pull request from a fork. The
workflow never checks out code. The workflow never runs pull request code. Those
limits keep this trigger safe.

Run the job only for a merged pull request. Do not lock a closed pull request
that did not merge.

Grant the job only `pull-requests: write` and `issues: write`. The lock call
needs only these permissions.

Lock the conversation with the preinstalled `gh` CLI. Do not use a third-party
action for this step. Set the lock reason to `resolved`.

Exit 0 when the conversation is already locked. Exit 1 when the lock request
fails and the conversation is not locked.

The workflow locks only pull requests that merge after this file reaches the
default branch.
