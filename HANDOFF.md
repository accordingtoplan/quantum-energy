# Quantum Prototype, Handoff Brief
Context transfer from the strategy chat. Read this first, then docs/.

## What this is
A web prototype (homepage + one PDP) to convince Quantum Energy Square (client contacts: Dan, Leah, Katie Lee) to engage MoreSleep for the brand and website relaunch. Plain HTML/CSS/JS, deployed via GitHub Pages from accordingtoplan/quantum-energy. Reference deployment pattern: janell-lewis.accordingtoplan.co.

## Repo contents
- index.html: homepage hero only (Block 1). Two headline variants with a toggle switcher, variant A "Steady energy for unsteady days", variant B "Real caffeine. Real food. Real energy." Verdict pending; once decided, strip the switcher and keep the winner.
- docs/Quantum_Homepage_Spec_v1.md: full homepage block-by-block (11 blocks). Build order: Block 2 (argument), Block 3 (scroll-driven energy curve), then 4, 5, 10, then statics.
- docs/Quantum_PDP_Spec_v1.md: full PDP block-by-block (13 blocks), v1.1 decisions locked at the bottom.

## Locked decisions
- Design system: Quantum yellow (#FFD400) dominant, black ink, hard borders, offset shadows. Type placeholder: Archivo / Archivo Expanded (swap for brand font later). Rhode calm as default, David-style repeated argument (exactly 3x on PDP, 2x on homepage), energy from type and color, not density.
- Prototype flavor: Peanut Butter Dark Chocolate ($19.95 8-pack, live copy pulled from quantumsquares.com PDP).
- Flavor takeover: each flavor takes over the PDP stage; yellow owns homepage and nav.
- Energy curve: scroll-driven (curve draws on scroll, crash line falls, Quantum line holds). Signature module, shared between homepage and PDP.
- Moment selector: interactive tabs. Pricing: placeholders until Katie Lee.
- Hero: static image for v1. Product cutout still a placeholder graphic, needs real packshot.
- Never use em-dashes in any copy.

## Deploy protocol (per Frederik)
GitHub REST API, not git CLI. Verify connection, check Pages status (enable on default branch root if 404), always fetch live file + fresh SHA before PUT, surgical string replacements only, show diff and wait for explicit go before every push, one concern per commit.

## Immediate next steps
1. Push repo contents to accordingtoplan/quantum-energy, enable Pages, confirm live URL.
2. Get headline verdict (A or B) from Frederik on the live hero, strip switcher.
3. Build homepage Block 2 + Block 3 (curve) per spec.
4. Request from Frederik: PB Dark Chocolate packaging screenshots (flavor color extraction) and product cutout PNG.
