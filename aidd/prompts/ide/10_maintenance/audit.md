---
name: codebase-audit
description: Perform deep codebase analysis for technical debt and improvements
argument-hint: Scope or module to audit (optional - defaults to full codebase)
---

# Codebase Audit Prompt

## Ressources

### Code to Analyze

```plaintext
$ARGUMENTS
```

### Coding rules

```markdown
@docs/rules.md
```

### Template

```markdown
@aidd/templates/code_review.md
```

## Goal

Conduct comprehensive codebase audit to identify quality issues and improvement opportunities.

## Rules

- Complete code analysis, no omissions
- Clean code enforcement
- Security best practices adherence
- Performance optimization techniques
- Code documentation standards
- No duplication of code
- Code reused effectively
- Error handling best practices
- Logs management
- Loading, empty, error states handling
- Unbroken responsiveness
- WCAG compliance
- Length for files, functions, components
- Clear naming conventions
- No dead code
- Anti-patterns avoidance
- Too complex code
- Lack of test coverage

## Process steps

1. Scan source code for duplication patterns
2. For each rules, check compliance and document findings
3. Output detailed audit report based on template
