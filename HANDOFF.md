# Quantum Prototype, Handoff Brief
Context transfer from the strategy chat. Read this first, then docs/.

## What this is
A web prototype (homepage + one PDP) to convince Quantum Energy Square (client contacts: Dan, Leah, Katie Lee) to engage MoreSleep for the brand and website relaunch. Plain HTML/CSS/JS, deployed via GitHub Pages from accordingtoplan/quantum-energy. Reference deployment pattern: janell-lewis.accordingtoplan.co.

## Repo contents
- index.html: homepage hero only (Block 1). Two headline variants with a toggle switcher, variant A "Steady energy for unsteady days", variant B "Real caffeine. Real food. Real energy." Verdict pending; once decided, strip the switcher and keep the winner.
- docs/Quantum_Homepage_Spec_v1.md: full homepage block-by-block (11 blocks). Build order: Block 2 (argument), Block 3 (scroll-driven energy curve), then 4, 5, 10, then statics.
- docs/Quantum_PDP_Spec_v1.md: full PDP block-by-block (13 blocks), v1.1 decisions locked at the bottom.

## Locked decisions
- Design system v2 (Frederik, Jul 15): warm neutral paper background (#F4F2EC), never yellow as background. Yellow (#FFD400) as the dominant color through elements: pack, highlights, stat underlines, CTA text, accents. No brown anywhere. Hairline borders and soft shadows, not hard borders or offset shadows. Direction: Rhode and David having a talented kid, Rhode calm and refinement with David-bold uppercase type. Type placeholder: Archivo / Archivo Expanded. Repeated argument stays (3x PDP, 2x homepage).
- Prototype flavor: Peanut Butter Dark Chocolate ($19.95 8-pack, live copy pulled from quantumsquares.com PDP).
- Flavor takeover: each flavor takes over the PDP stage; yellow owns homepage and nav.
- Energy curve: scroll-driven (curve draws on scroll, crash line falls, Quantum line holds). Signature module, shared between homepage and PDP.
- Moment selector: interactive tabs. Pricing: placeholders until Katie Lee.
- Hero: static image for v1. Product cutout still a placeholder graphic, needs real packshot.
- Claim locked (Frederik, Jul 16): "real energy for days." Supersedes "real energy for days and nights."
- Never use em-dashes in any copy. NEVER. Applies to all files, commits, and UI text.

## Deploy protocol (per Frederik)
GitHub REST API, not git CLI. Verify connection, check Pages status (enable on default branch root if 404), always fetch live file + fresh SHA before PUT, surgical string replacements only, show diff and wait for explicit go before every push, one concern per commit.

## Immediate next steps
1. Push repo contents to accordingtoplan/quantum-energy, enable Pages, confirm live URL.
2. Get headline verdict (A or B) from Frederik on the live hero, strip switcher.
3. Build homepage Block 2 + Block 3 (curve) per spec.
4. Request from Frederik: PB Dark Chocolate packaging screenshots (flavor color extraction) and product cutout PNG.
