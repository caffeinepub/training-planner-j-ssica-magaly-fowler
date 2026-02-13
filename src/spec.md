# Specification

## Summary
**Goal:** Replace the site’s current hero and profile photos with the newly uploaded photos, using professionally processed versions for a polished, cohesive look.

**Planned changes:**
- Add the two uploaded images as static frontend assets under `frontend/public/assets/generated` and stop using the current on-site photos in the hero and profile/headshot areas.
- Update `frontend/src/components/training-planner/HeroSection.tsx` to use a processed hero image derived from `e3d60550-0886-11f1-b0bb-e7f856b020c7.jpg`, ensuring proper crop/cleanup and no overlay text; maintain responsive, non-stretched display.
- Update `frontend/src/components/training-planner/Header.tsx` and `frontend/src/components/training-planner/ProfessionalBioSection.tsx` to use a processed square headshot derived from `1770831915760.png`, keeping the existing fallback to `/assets/generated/logo-jmf.dim_512x512.png` on load error and ensuring correct circular crop without distortion.

**User-visible outcome:** The website displays the new hero photo and updated avatar/headshot across the header and bio section, with crisp, professional-looking images on mobile and desktop.
