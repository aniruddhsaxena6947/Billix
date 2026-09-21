---
trigger: always_on
---

==================================================
UNIVERSAL CODEBASE ORGANIZATION RULE
==================================================

This rule applies to EVERY task, EVERY prompt, and EVERY
change made to the INVOXENX ERP project.

The codebase MUST remain clean, well-organized, predictable,
and maintainable at all times.

1. KEEP FILES IN THE CORRECT PLACE

Every file must belong to the correct folder based on its purpose.

Do not place files randomly in the project root.

Do not mix:

- Frontend code
- Backend code
- Documentation
- UI references
- Temporary files
- Generated files

Keep each responsibility inside its appropriate location.

2. DO NOT CREATE RANDOM FILES

Before creating a new file:

- Check whether an appropriate existing file already exists.
- Check whether the functionality can be added to an existing file.
- Create a new file ONLY when it is genuinely required.

Do not create files such as:

- temp files
- test files without a testing requirement
- backup copies
- duplicate components
- unused configuration files
- unnecessary index files
- placeholder files

3. KEEP FOLDERS LOGICAL

Use a predictable folder structure.

Files with similar responsibilities should stay together.

Do not create unnecessary nested folders.

Avoid structures like:

components/ui/common/shared/buttons/basic/

when a simpler structure is sufficient.

Prefer the simplest organization that clearly communicates
where something belongs.

4. ONE RESPONSIBILITY PER FILE

A file should have a clear purpose.

Do not create extremely large files containing unrelated
components, logic, data, and utilities.

At the same time, DO NOT split everything into tiny files
without a real reason.

Use balanced organization.

5. REUSE EXISTING CODE

Before creating a component, hook, utility, type, or service:

SEARCH THE EXISTING CODEBASE.

If an equivalent already exists:

→ REUSE IT.

If it can be extended cleanly:

→ EXTEND IT.

Do not create another version of the same functionality.

6. NO DUPLICATE IMPLEMENTATIONS

Never create:

- Duplicate components
- Duplicate layouts
- Duplicate utilities
- Duplicate hooks
- Duplicate types
- Duplicate page structures
- Duplicate styling systems

If duplicate functionality is discovered during development,
consolidate it when doing so is safe and directly relevant.

7. NO UNUSED CODE

After every task, check for:

- Unused imports
- Unused variables
- Unused functions
- Unused components
- Dead code
- Unused dependencies
- Unused files
- Temporary development code

Remove anything that is no longer required.

8. MINIMAL PROJECT ROOT

Keep the project root clean.

Do not place implementation files, random assets, screenshots,
temporary files, or documentation in the root unless they
genuinely belong there.

The main project areas are:

Backend/
frontend/
Obsidian graph/
UI Refrences/

Respect this separation.

9. DO NOT MODIFY UNRELATED FILES

When completing a task:

- Modify only the files necessary for that task.
- Do not refactor unrelated parts of the application.
- Do not rename files without a reason.
- Do not move files without a reason.
- Do not change working architecture unnecessarily.

10. CLEANUP AFTER EVERY TASK

Before declaring a task complete, perform a CODEBASE CLEANUP CHECK:

✓ Correct folder placement
✓ No unnecessary files
✓ No duplicate components
✓ No duplicate functionality
✓ No unused imports
✓ No unused variables
✓ No dead code
✓ No unnecessary dependencies
✓ No unnecessary nesting
✓ No unrelated modifications
✓ Naming is consistent
✓ Existing architecture is preserved

If something unnecessary was created during the task:

REMOVE IT before finishing.

11. DO NOT OPTIMIZE FOR FILE COUNT

The goal is NOT to have the fewest files possible.

The goal is to have the smallest number of
NECESSARY and WELL-ORGANIZED files.

Do not combine unrelated functionality just to reduce
the number of files.

Do not split simple functionality into many files just
to appear modular.

Choose the structure that is easiest to understand and maintain.

12. OBSIDIAN GRAPH MUST MATCH THE ORGANIZED CODEBASE

After every task, update the relevant documentation inside:

Obsidian graph/

The documentation must reflect the final organized structure,
not temporary development changes.

If a file/component/route is created, moved, renamed,
merged, or removed and it is relevant to the architecture,
update the Obsidian Graph accordingly.

CODEBASE ↔ OBSIDIAN GRAPH

must remain synchronized.

==================================================
UNIVERSAL COMMAND
==================================================

Before finishing ANY task, ask:

"Is this the cleanest necessary implementation?"

If NO:
→ Clean it up.

"Did I create anything that I don't actually need?"

If YES:
→ Remove it.

"Does every file exist in the correct place?"

If NO:
→ Organize it.

"Did I duplicate something that already existed?"

If YES:
→ Reuse or consolidate it.

"Does Obsidian Graph match the final codebase?"

If NO:
→ Update it.

FINAL PRINCIPLE:

BUILD ONLY WHAT IS NEEDED.
KEEP IT WELL ORGANIZED.
REUSE WHAT EXISTS.
REMOVE WHAT IS UNNECESSARY.
KEEP THE CODEBASE CLEAN.
KEEP OBSIDIAN GRAPH IN SYNC.

NEVER LET THE CODEBASE BECOME MESSY.