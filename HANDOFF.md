# Quantum Prototype, Handoff Brief
Context transfer from the strategy chat. Read this first, then docs/.

## What this is
A web prototype (homepage + one PDP) to convince Quantum Energy Square (client contacts: Dan, Leah, Katie Lee) to engage MoreSleep for the brand and website relaunch. Plain HTML/CSS/JS, deployed via GitHub Pages from accordingtoplan/quantum-energy. Reference deployment pattern: janell-lewis.accordingtoplan.co.

## Repo contents
- index.html: full homepage prototype. Announcement bar, hero (claim locked: "real energy for days."), two rows of product tiles (packshot at rest, ingredient or lifestyle image plus white buy pill on hover, tap-to-open on touch), summer focus module, trail and nuts duo, statement block (the argument), Block 3 energy curve (scroll-driven, id how-it-works), split module (mechanism copy), giant wordmark footer. Shop links and buy pills open product.html.
- product.html: PDP. Sticky plain nav, Block 1 stage (gallery with thumbs, purchase panel with flavor chips that take over tint and accent, one-time vs subscribe, quantity, add to cart, badges), Block 0 sticky buy bar on mobile, Block 2 argument, Block 3 curve (same module), Block 4 three numbers as cards, Block 5 ingredient flex (details rows, one open at a time, yellow dot marks the one you feel), Block 6 moment selector tabs (2pm slump leading), Block 8 comparison table (archetypes, no logos, scrolls sideways on mobile), Block 9 static social proof wall (review count, the two live quotes, four stills), Block 12 close plus cross-sell tiles and footer. Blocks 7, 10 and 11 not built. Four flavors carry chips (the ones with packshots); salted PB crunch and caramel almond descriptions are placeholder copy. Subscription price is 10% off as a placeholder until Katie Lee.
- styles.css and site.js: shared design system, nav behaviour, tile tap, curve module and PDP behaviour. Both pages link them.
- docs/Quantum_Homepage_Spec_v1.md: full homepage block-by-block (11 blocks).
- docs/Quantum_PDP_Spec_v1.md: full PDP block-by-block (13 blocks), v1.1 decisions locked at the bottom.
- docs/Concept_and_References.md: concept, benchmark research, reference map.

## Energy curve (Block 3) notes
Vanilla JS, no libraries. Section is 260svh tall (220svh on mobile) with a sticky card; scroll progress drives stroke-dashoffset on two SVG paths (pathLength=1), a clipped yellow fill, two HTML dots that ride the line tips, four annotation labels, the time axis and the three numbers. Progress is smoothed with a small lerp in requestAnimationFrame. prefers-reduced-motion renders the finished curve statically with no sticky scroll. Row-2 hover images are borrowed placeholders from elsewhere on the page (almonds, four-wrapper flat lay, foil macro) and need their own shots.

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
1. Frederik reviews product.html live. Open on the PDP: Block 7 taste (needs dessert-coded macro shots), Block 10 subscribe reprise, Block 11 FAQ with schema.
2. Hover images for row 2 on the homepage and real copy for the salted PB crunch and caramel almond flavors.
3. Hero: the approved studio packshot is in with ink nav and caption (Frederik, Sep 23). A real cutout or a darker treatment is still open.
4. Homepage Blocks 5 to 9 (retail spotlight, moments strip, taste, social proof, subscribe) remain unbuilt.
