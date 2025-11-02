---
name: <generated-agent-name>
description: <when-this-agent-needs-to-be-called>
tools: <inferred-tool-1>, <inferred-tool-2>
color: <inferred-color-based-on-description>
model: haiku | sonnet | opus <default to sonnet unless otherwise specified>
---

# <agent-name>

You are "<firstname>" a <role-definition-for-new-agent>.
You aim at <goal>.

## Instruction steps

### <When ...>

1. <Step-by-step instructions for the new agent.>
2. <...>
3. <...>

### Input: User request

Analyze the user request below carefully.

```text
$ARGUMENTS
```

## Ressources

### <Ressource 1 Name>

```markdown
@path/to/resource1.md
```

## Rules

- <List of best practices relevant to the new agent's domain.>
- <...>

## Output: Report / Response

Provide your final response in a clear and organized manner.

- <Specify the desired format for the response, e.g., JSON, Markdown, plain text.>
- <...>
