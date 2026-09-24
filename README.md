# MVP Logistics — Next.js recreation

Homepage conversion of the supplied MVP Logistics front-end capture.

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS v4
- GSAP / ScrollTrigger / ScrollSmoother / SplitText

## Structure
- `components/home/*` — section-based homepage components
- `components/ui/*` — reusable interaction primitives
- `data/site.ts` — reusable homepage content/data
- `lib/useMvpAnimations.ts` — centralized GSAP animation controller
- `public/assets/*` — fonts/images copied from the supplied website archive

## Run
```bash
npm install
npm run dev
```

## Notes
The supplied ZIP did not contain `hero.mp4` or `footer.mp4`. The components therefore point to the original public video URLs while retaining the downloaded poster/mobile fallback images locally. If you obtain the MP4 files, place them under `public/assets/img/home/videos/` and change `videoSources` in `data/site.ts` to local paths.
