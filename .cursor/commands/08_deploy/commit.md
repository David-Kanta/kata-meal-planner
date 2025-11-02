---
name: commit
description: Create git commit with proper message format
---

# Commit Prompt

## Goal

Generate git commit with standardized message following project conventions.

## Rules

- Conventional commits
- Clear change description
- Follow previous commit message format
- Include change type prefix
- Concise but descriptive
- Reference issues if applicable

## Context

### Commit rules

```markdown
@docs/COMMIT.md
```

### Previous commits

```text
!`git log -5 --pretty=%B`
```

## Process steps

1. Check staged changes
2. Determine change type (feat, fix, docs, etc)
3. Make a list of functional changes with clear commit messages
4. Execute git add patch for dedicated part of the feature
5. **WAIT FOR USER APPROVAL**
6. Run git commit with generated message
7. If errors, fix and retry to commit: loop here until you can commit
8. Verify commits success
9.  List them to user
