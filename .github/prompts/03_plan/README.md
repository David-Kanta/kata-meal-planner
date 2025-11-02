# Plan Commands

## Commands Overview

Two complementary commands with clear separation of responsibilities:

- **elaborate.md**: Creates and refines feature requests through user interaction
- **plan.md**: Generates technical plans from requirements and waits for approval

### plan.md

Generates technical implementation plans from requirements, saves to task file, displays for review, and waits for user confirmation.

#### Usage

```bash
# From GitHub issue
/ide:03_plan:plan https://github.com/owner/repo/issues/123

# From raw text requirements
/ide:03_plan:plan "Add user authentication with OAuth2 support"
```

#### Features

- **Smart input detection**: Automatically detects GitHub URLs vs raw text
- **GitHub integration**: Fetches issue content using `gh` CLI
- **Vocal dictation support**: Handles inconsistencies from voice input
- **Task file creation**: Saves to `docs/tasks/<date>-<feature>.md`
- **User confirmation**: Displays plan and waits for approval

### elaborate.md

Creates and refines feature requests through interactive user dialogue, then delegates to plan.md for technical planning.

#### Usage Example

```bash
/ide:03_plan:elaborate
```

#### Workflow

1. **Create feature request**: Interactive refinement with user
2. **User approval**: Wait for feature request confirmation
3. **Delegate to plan.md**: Passes approved requirements to plan command
4. **Plan review**: plan.md handles technical planning and approval

## Separation of Responsibilities

Each command has a distinct role:

### elaborate.md
- **Role**: Feature request creator
- **Focus**: Understanding user needs
- **Process**: Interactive dialogue
- **Output**: Refined requirements

### plan.md
- **Role**: Technical plan generator
- **Focus**: Implementation strategy
- **Process**: Automated analysis + user confirmation
- **Output**: Task file with implementation plan

## Benefits

- Clear separation of concerns
- Direct plan generation from GitHub issues
- Reusable plan generation logic
- Feature requests remain implementation-agnostic
- Technical plans are consistent and structured
