# Trip Publishing Spec

## MODIFIED Requirements

### Requirement: Clean modal header
The trip publishing form header SHALL display the modal title without additional subtitle text, styled using the "Clean Alpine Frost & Sky Glass" design system with deep navy title color or crisp snow white text.

#### Scenario: Modal header render
- **WHEN** the driver opens the publish modal
- **THEN** only "Publicar Viaje" is displayed as the header title in font-black DM Sans typography, and the container renders with a glassmorphic background (`backdrop-filter: blur(26px)`), specular border highlight (`inset 0 1px 0 rgba(255, 255, 255, 0.28)`), and close button styled with `bg-white/10 hover:bg-white/20`.

## ADDED Requirements

### Requirement: Frosted Snow Glass modal container and Alpine Sky CTA
The trip publishing modal container SHALL utilize the `.glass-card` background tokens (`rgba(160, 190, 215, 0.22)`), crystalline borders (`border-white/30`), translucent form field backgrounds (`bg-white/10` / `bg-slate-900/60`), and a primary CTA button ("Publicar Viaje") in sky celeste (`#38BDF8`) with deep navy text (`#0F2942`).

#### Scenario: Displaying publish modal with alpine aesthetics
- **WHEN** a user opens the publish modal on desktop or mobile
- **THEN** the modal wrapper renders over a dark translucent backdrop (`bg-slate-950/70 backdrop-blur-md`), the form fields display crisp borders with sky-blue focus rings (`focus:ring-[#38BDF8]`), and the primary submit button features `#38BDF8` background with `#0F2942` font-black text.
