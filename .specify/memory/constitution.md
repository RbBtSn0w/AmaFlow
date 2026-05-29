<!--
SYNC IMPACT REPORT
- Version change: None -> 1.0.0
- List of modified principles:
  - PRINCIPLE_1: Library-First Architecture (NEW)
  - PRINCIPLE_2: Decoupled Interfaces & Message Passing (NEW)
  - PRINCIPLE_3: Test-First Development (NEW)
  - PRINCIPLE_4: Automated Integration Testing (NEW)
  - PRINCIPLE_5: Simplicity & Low-Cost (YAGNI) (NEW)
- Added sections:
  - Technical Constraints & Standards
  - Development Workflow & Quality Gates
  - Governance
- Removed sections: None
- Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
- Follow-up TODOs: None
-->
# myFastM Constitution

## Core Principles

### I. Library-First Architecture
Every feature module MUST start as a standalone, self-contained library or logical script (e.g., decoupled DOM scrapers or logic modules). Modules MUST be independently testable and documented. Clear architectural separation MUST be maintained.

### II. Decoupled Interfaces & Message Passing
Core modules MUST communicate via decoupled APIs or clean message-passing channels (e.g., Chrome Extension background/content script port messaging). Input/Output protocols MUST use clean structured models (like JSON).

### III. Test-First Development (NON-NEGOTIABLE)
Test suites MUST be prepared alongside or before the implementation code. Every user story MUST be independently testable. Regression testing MUST be performed to safeguard against breaking changes.

### IV. Automated Integration Testing
Niche extraction and data boundaries MUST be validated using integration tests to verify the compatibility between content injection and simulated page DOMs.

### V. Simplicity & Low-Cost (YAGNI)
Implementations MUST adhere to the YAGNI principle. Any architectural complexity (like external servers, paid proxies) MUST be avoided unless explicitly justified in the Complexity Tracking section of the Implementation Plan.

## Technical Constraints & Standards
- **Language**: Python 3.10+ (managed via pyenv), Node.js (managed via nvm), or native Web standards.
- **Localization**: Code, comments, identifiers, commits, and technical docs MUST be in English.
- **Environment**: Prefer standard tools installed via Homebrew where possible.

## Development Workflow & Quality Gates
- **Plan/Code Switch**: For any moderate or complex task, strictly switch between Planning Mode and Coding Mode. Creating or modifying code blocks requires an approved Implementation Plan.
- **Git Commits**: Follow semantic commit naming conventions. Auto-commit changes after boundary transitions using Spec Kit command workflows.
- **Review Focus**: Prioritize verification of regressions, missing tests, security, breaking API changes, and performance-sensitive paths.

## Governance
This Constitution supersedes all ad-hoc coding styles. Amendments require a formal modification proposal, documentation updates, and a SemVer version bump.

**Version**: 1.0.0 | **Ratified**: 2026-05-29 | **Last Amended**: 2026-05-29
