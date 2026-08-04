# Mountain Weather Road Status Spec

## Purpose
Position the mountain weather and road status card cleanly below the viewport fold using CSS viewport height units.

## MODIFIED Requirements

### Requirement: Compact Non-Intrusive Layout
The MountainStatusPill SHALL start below the initial `100vh` viewport fold in desktop viewports so it reveals smoothly on scroll without visual clipping in the primary view.

#### Scenario: User visits Faredeo on desktop
- **WHEN** the user lands on the page
- **THEN** Panel 1 and Panel 2 SHALL occupy the primary viewport height, and MountainStatusPill SHALL start cleanly below the fold.
