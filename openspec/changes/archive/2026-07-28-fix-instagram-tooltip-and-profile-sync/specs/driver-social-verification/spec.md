# Driver Social Verification Spec

## ADDED Requirements

### Requirement: Unobscured Instagram Hover Preview Tooltip
The Instagram profile hover preview card in `TripDetailModal` SHALL render with proper z-index layering (`z-50` / `z-20`) so it displays unclipped above sibling elements.

#### Scenario: User hovers Instagram icon in TripDetailModal
- **WHEN** the user hovers over the driver's Instagram icon
- **THEN** the preview card SHALL pop up on top of all modal sections without being overlapped by "Detalles de la Ruta".
