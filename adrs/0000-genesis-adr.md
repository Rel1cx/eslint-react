# Genesis ADR

## State

Approved

## Created

2024-02-01

## Purpose

Provide consistent documentation for software development design guidance. Help
to align people around software development and come to consensus.

## What is an ADR?

ADR stands for Architecture decision record, which is a design document
providing high-level, concise documentation for software development. The goal
is for these documents to serve as the source of truth for software-related
documentation at Straw Hat Team and the way teams discuss and come to consensus
on software development guidance.

## States

At any given time, ADRs may exist in a variety of states as they work their way
through the process. The following is a summary of each state.

### Draft

The initial state for an ADR is the "Draft" state. This means that the ADR is
being discussed and iterated upon, primarily by the original authors. While the
editors may get involved at this stage, it is not necessary.

> If significant, high-level iteration is required, it is recommended to
> draft ADRs in a Google doc instead of a PR.

### Reviewing

Once discussion on an ADR has generally concluded, but before it is formally
accepted it moves to the "Reviewing" state. This means that the authors have
reached a general consensus on the proposal and the editors are now involved.
At this stage the editors may request changes or suggest alternatives to the
proposal before moving forward.

> As a formal matter, one ADR approver (other than the author) **MUST** provide
> formal signoff to advance an ADR to the reviewing state. Additionally, there
> **MUST NOT** be formal objections ("changes requested" on the GitHub PR) from
> other approvers.

### Approved

Once an approved ADR has been agreed upon, it enters "approved" state and is
considered "best current practice".

> As a formal matter, two ADR approvers (other than the author) **MUST** provide
> formal signoff to advance an ADR to the approved state. Additionally, there
> **MUST** not be formal objections ("changes requested" on the GitHub PR) from
> other approvers.

### Withdrawn

If an ADR is withdrawn by the author or champion, it enters "withdrawn" state.
ADRs that are withdrawn may be taken up by another champion.

### Rejected

If an ADR is rejected by the ADR editors, it enters "rejected" state. ADRs that
are rejected remain, and provide documentation and reference to inform future
discussions.

### Deferred

If an ADR has not been acted upon for a significant period of time, the editors
may mark it as "deferred".

### Replaced

If an ADR has been replaced by another ADR, it enters "replaced" state. ADR
editors are responsible to provide a notice explaining the replacement and
rationale (the replacement ADR should also clearly explain the rationale).

In general, API producers should rely primarily on ADRs in the "approved" state.

### Proposing an ADR

In order to propose an ADR, first [open an issue](https://github.com/straw-hat-team/adr/issues/)
to circulate the fundamental idea for initial feedback. It should generally be
possible to describe the idea in a couple of pages.

Once ready, create a PR with a new file in the ADR directory using a file titled
`adrs/draft/README.md`. Ensure that the PR is editable by maintainers.

In most circumstances, the editors will assign the proposal an ADR number and
submit the PR with the ADR in the "Reviewing" state. The editors may reject an
ADR outright if they have an obvious reason to do so (e.g. the proposal was
already discussed and rejected in another ADR or is fundamentally unsound), in
which case the PR is not merged.

### Discussing an ADR

Once the PR is merged, the ADR author is responsible for championing the ADR on
a follow-up approval pull request. This means that the author is responsible for
pushing towards consensus around the proposal. This may involve a discussion at
the regularly scheduled meetings for the API Governance team.

The ADR author may modify the ADR over the course of discussion by submitting
follow-up commits to the PR.

### Accepting an ADR

The editors will work together to ensure that qualified proposals do not linger
in review.

To gain final approval, an ADR **MUST** be approved by, at minimum, the TL with
responsibility over the domain covered by the ADR (either design or infrastructure)
and at least one other editor, with no editors actively requesting changes.

> If an ADR editor is the primary author of an ADR, then at least two other
> editors **MUST** approve it.

Once the ADR is approved, the editors will update the state of the ADR to reflect
this and submit the PR.

### Withdrawing or Rejecting an ADR

The author of an ADR may decide, after further consideration, that an ADR should
not advance. If so, the author may withdraw the ADR by updating the PR adding a
notice of withdrawal with an explanation of the rationale. Additionally, the
author may be unable to get consensus among the group and the ADR editors may
elect to reject the ADR. In this situation, the ADR editors shall amend the PR
adding a notice of rejection with an explanation of the rationale. In both cases,
the ADR editors update the state accordingly and submit the PR.

### Replacing an ADR

In rare cases, it may be necessary to replace an ADR with another one. This is
not general practice: minor edits to approved ADRs are acceptable, and will be
the common way to tweak guidance. However, if new guidance fundamentally alters
the old guidance in some way, then the ADR editors shall create a new ADR that,
once approved, will replace the old one. The old one then enters "Replaced"
state, and will link to the new, current ADR.
