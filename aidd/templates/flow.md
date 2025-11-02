---
name: <file-name>
description: <short-summary>
argument-hint: <if any, the needed parameters>
---

# [Task Name]

- **Goal**:
- **Use when**:
- **Outcome**:

## Step-by-step workflow

```mermaid
{Full minimal simple explained workflow with detailed params and actions}
```

### Phase N: [name]

> [Description of Phase 1]

**Steps:**

1. [Detailed steps with checkpoints, example of new implementation, files mention]

**Success Criteria**:

**Files Affected**:

-


sequenceDiagram
    autonumber
    participant Dev as Développeur
    participant Orchestrator as Agent Orchestrateur
    participant Memory as AGENTS.md (mémoire centrale)
    participant Front as Agent Frontend
    participant Rules as aidd-docs/rules/frontend.md
    participant Assertions as Frontend/CODING_ASSERTIONS.md
    participant Design as Frontend/DESIGN.md
    participant MCP as Services MCP (Validation UI)

    Dev->>Orchestrator: Démarrer et définir le plan
    Orchestrator->>Memory: Charger la mémoire (AGENTS.md) et itérer
    Orchestrator-->>Dev: Plan validé ensemble
    Dev->>Front: Envoyer le plan technique
    Front->>Rules: Charger règles personnalisées (frontend)
    Front->>Design: Aligner maquette et patterns UI
    Front->>Front: Implémenter selon plan + règles
    Front->>Assertions: Lancer vérification CODING_ASSERTIONS
    activate Assertions
    loop Boucle interne jusqu'à OK
        Assertions->>Assertions: Vérifier plan, règles, typage, tests, build
    end
    deactivate Assertions
    Assertions-->>Front: OK
    Front->>MCP: Valider conformité maquette côté frontend
    MCP-->>Front: Résultats et recommandations
    Front-->>Dev: Livraison du code final
