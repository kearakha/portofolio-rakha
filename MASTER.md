# MASTER — Design System (porto-web-2)

Canonical source of truth untuk redesign "dramatic minimalism ala Apple".
Setiap warna/font/spacing/radius/shadow/motion di implementasi HARUS
merujuk token di file ini — no magic numbers.

Ditulis Phase 3 dari `/genjutsu:paint`, basis: thesis visual + interaksi
yang sudah di-approve Rakha (sesi Nexus 2026-08-24, sesi 11).

> **Ditandai `[DRAFT]`** = nilai turunan (derived), bukan hasil ukur
> langsung dari apple.com kayak font/tracking/radius/blue accent light
> mode. Review pas token preview sebelum dipakai di Phase 4.

---

## 1. Visual Thesis (ref)

Light-mode-first + near-colorless + 1 functional blue accent (`#0071E3`,
cuma buat elemen clickable), font SF Pro via system stack, weight ceiling
600, tracking measured dari apple.com, button radius 980px (full pill),
edge-to-edge grid radius 0 buat section padat, translucent nav (blur 20px
saturate 180%).

## 2. Interaction Thesis (ref)

Spring-based motion (damping 1.0 / response 0.3–0.4s default, damping
~0.8 cuma buat momentum/gesture), scroll storytelling + micro-interaction
sebagai signature (3D di-skip), `prefers-reduced-motion` → cross-fade.

---

## 3. Color

### Light (default)

| Token | Value | Use |
|---|---|---|
| `--background` | `#FFFFFF` | base page background |
| `--background-secondary` | `#F5F5F7` | subtle off-white surface (measured, Apple's stock section bg) |
| `--surface` | `#FBFBFD` | card / elevated surface |
| `--foreground` | `#1D1D1F` | primary text — near-black, never pure `#000` |
| `--foreground-secondary` | `#6E6E73` | secondary text/labels |
| `--foreground-tertiary` | `#86868B` | tertiary/disabled text |
| `--border` | `#D2D2D7` | hairline borders |
| `--accent` | `#0071E3` | measured — CTA, links, active state, focus ring |
| `--accent-hover` | `#0077ED` | button/link hover |
| `--accent-active` | `#006EDB` | pressed state |

### Dark `[DRAFT]`

| Token | Value | Use |
|---|---|---|
| `--background` | `#000000` | base page background |
| `--background-secondary` | `#1D1D1F` | subtle surface |
| `--surface` | `#161617` | card / elevated surface |
| `--foreground` | `#F5F5F7` | primary text |
| `--foreground-secondary` | `#A1A1A6` | secondary text/labels |
| `--foreground-tertiary` | `#6E6E73` | tertiary/disabled text |
| `--border` | `#424245` | hairline borders |
| `--accent` | `#2997FF` | brighter blue, AA-contrast on black (Apple's own dark-mode link blue) |
| `--accent-hover` | `#3AA0FF` | hover |
| `--accent-active` | `#1E88F0` | pressed |

### Semantic `[DRAFT]` (buat admin dashboard, bukan public site)

| Token | Value |
|---|---|
| `--success` | `#34C759` |
| `--warning` | `#FF9500` |
| `--error` | `#FF3B30` |
| `--info` | `var(--accent)` |

**Rule keras:** accent (`--accent`) CUMA dipakai di elemen yang bisa
diklik (CTA, link, active filter, focus ring). Jangan pernah dipakai
sebagai warna dekoratif/background section — itu yang bikin desain Apple
kerasa "near-colorless" bukan "biru di mana-mana".

---

## 4. Typography `[DRAFT — scale, tracking measured]`

Font stack (SF Pro asli, bukan Google Font approximation):

```
--font-sans: -apple-system, BlinkMacSystemFont, "SF Pro Text",
  "SF Pro Display", "Helvetica Neue", Arial, sans-serif;
```

Weight ceiling: **600**. Jangan pernah pakai 700+ walau di ukuran besar
(measured — Apple nggak pernah lebih tebal dari 600 bahkan di headline
80px+).

Tracking measured: makin besar font, makin negatif (rentang
`-0.005em` s/d `-0.022em`).

| Step | Size (mobile → desktop) | Weight | Tracking | Line-height |
|---|---|---|---|---|
| `display` | 56px → 88px | 600 | `-0.022em` | 1.05 |
| `h1` | 40px → 56px | 600 | `-0.019em` | 1.08 |
| `h2` | 28px → 40px | 600 | `-0.016em` | 1.1 |
| `h3` | 22px → 28px | 600 | `-0.011em` | 1.15 |
| `body-lg` | 19px → 21px | 400 | `-0.008em` | 1.5 |
| `body` | 17px | 400 | `-0.005em` | 1.55 |
| `caption` | 13px → 14px | 400 | `-0.005em` | 1.4 |

---

## 5. Spacing

Base unit 4px:

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128` (px)

## 6. Radii — measured

| Token | Value | Use |
|---|---|---|
| `--radius-none` | `0` | edge-to-edge grid, dense section |
| `--radius-sm` | `8px` | small chip/tag |
| `--radius-md` | `12px` | card |
| `--radius-lg` | `18px` | large card/panel |
| `--radius-full` | `980px` | button — full pill (measured, literal value dari apple.com) |

## 7. Shadows `[DRAFT]`

Subtle, sesuai "dramatic minimalism" — bukan elevation berat.

| Token | Light | Dark |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.04)` | `0 1px 2px rgba(0,0,0,0.4)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.06)` | `0 4px 16px rgba(0,0,0,0.5)` |
| `--shadow-lg` | `0 12px 40px rgba(0,0,0,0.08)` | `0 12px 40px rgba(0,0,0,0.6)` |

## 8. Motion

CSS custom properties (buat transition hover/focus di elemen non-GSAP):

| Token | Value |
|---|---|
| `--duration-fast` | `150ms` |
| `--duration-normal` | `300ms` |
| `--duration-slow` | `400ms` |
| `--ease-spring` | `cubic-bezier(0.22, 1, 0.36, 1)` — approksimasi CSS dari damping 1.0 / response 0.35s |
| `--ease-momentum` | `cubic-bezier(0.16, 1, 0.3, 1)` — approksimasi CSS dari damping ~0.8, buat drag/gesture |

**GSAP (Phase 4, animasi scroll/reveal):** stack animasi project ini GSAP
(bukan Framer Motion), jadi spring damping/response di atas dipetakan ke
ease GSAP yang setara, konsisten sama yang udah dipakai di codebase
(`power3.out`, `expo.inOut` — lihat `IntroScreen.tsx`):

- Default (damping 1.0/response 0.3–0.4s) → `power3.out`, duration 0.3–0.4s
- Momentum/gesture (damping ~0.8) → `expo.out` atau `back.out(1.2)` kalau
  butuh sedikit overshoot yang halus (bukan bounce penuh — thesis
  interaksi eksplisit skip bounce/elastic di luar gesture)

**`prefers-reduced-motion`:** semua transform/scroll-reveal fallback ke
cross-fade (`opacity` only, `duration-fast`), no transform.

---

## 9. Base Component States

5-state rule: default, hover, focus, active, disabled.

### Button (primary, pill)

| State | Style |
|---|---|
| Default | `bg: var(--accent)`, `color: white`, `radius: var(--radius-full)` |
| Hover | `bg: var(--accent-hover)` |
| Focus | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Active | `bg: var(--accent-active)` |
| Disabled | `bg: var(--foreground-tertiary)`, `opacity: 0.5`, `cursor: not-allowed` |

### Card

| State | Style |
|---|---|
| Default | `bg: var(--surface)`, `border: 1px solid var(--border)`, `radius: var(--radius-md)` |
| Hover | `shadow: var(--shadow-md)`, `transform: translateY(-2px)` (respect `--ease-spring`) |
| Focus | `outline: 2px solid var(--accent)` |
| Active | `transform: translateY(0)` |
| Disabled | `opacity: 0.5` |

### Link / Nav item

| State | Style |
|---|---|
| Default | `color: var(--foreground-secondary)` |
| Hover | `color: var(--foreground)` |
| Focus | `outline: 2px solid var(--accent)`, `outline-offset: 2px` |
| Active | `color: var(--accent)` |
| Disabled | `color: var(--foreground-tertiary)`, `pointer-events: none` |

### Nav (translucent) — measured

```
backdrop-filter: blur(20px) saturate(180%);
background: rgba(255,255,255,0.72); /* light */
background: rgba(0,0,0,0.72);       /* dark [DRAFT] */
```

---

## 10. Implementasi

- Token file: `app/globals.css` (Tailwind v4, `@theme inline` + CSS
  variables — bukan `tailwind.config.js`).
- Font loading (`next/font` Inter → SF Pro system stack) baru diganti
  pas Hero disentuh di Phase 4, biar section lain yang belum diaudit
  nggak break duluan.
- Dark mode: token sudah siap (`[DRAFT]`), toggle switch-nya sendiri
  belum diimplementasi — menyusul di Phase 4/iterasi terpisah.
