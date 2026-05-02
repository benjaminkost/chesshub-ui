import { createTheme } from "@mui/material";
import React from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  Module augmentation – expose extra palette slots to TypeScript
// ─────────────────────────────────────────────────────────────────────────────
declare module "@mui/material/styles" {
  interface Palette {
    tertiary: Palette["primary"];
    neutral: Palette["primary"];

    // Surface hierarchy (M3-style)
    surfaceContainerLowest: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    surfaceContainerHighest: string;
    surfaceBright: string;
    surfaceVariant: string;
    surfaceTint: string;

    // On-surface roles
    onSurface: string;
    onSurfaceVariant: string;
    onPrimary: string;
    onPrimaryContainer: string;
    onSecondary: string;
    onSecondaryContainer: string;
    onTertiary: string;
    onTertiaryContainer: string;

    // Container colours
    primaryContainer: string;
    secondaryContainer: string;
    tertiaryContainer: string;

    // Outline roles (The "Ghost Border" rule)
    outlineVariant: string;
    outline: string;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions["primary"];
    neutral?: PaletteOptions["primary"];

    surfaceContainerLowest?: string;
    surfaceContainerLow?: string;
    surfaceContainer?: string;
    surfaceContainerHigh?: string;
    surfaceContainerHighest?: string;
    surfaceBright?: string;
    surfaceVariant?: string;
    surfaceTint?: string;

    onSurface?: string;
    onSurfaceVariant?: string;
    onPrimary?: string;
    onPrimaryContainer?: string;
    onSecondary?: string;
    onSecondaryContainer?: string;
    onTertiary?: string;
    onTertiaryContainer?: string;

    primaryContainer?: string;
    secondaryContainer?: string;
    tertiaryContainer?: string;

    outlineVariant?: string;
    outline?: string;
  }

  // ── Custom CSS variables surfaced via theme.vars (sx-compatible) ──────────
  interface TypographyVariants {
    displayLg: React.CSSProperties;
    displayMd: React.CSSProperties;
    displaySm: React.CSSProperties;
    headlineLg: React.CSSProperties;
    headlineMd: React.CSSProperties;
    headlineSm: React.CSSProperties;
    titleLg: React.CSSProperties;
    titleMd: React.CSSProperties;
    titleSm: React.CSSProperties;
    labelLg: React.CSSProperties;
    labelMd: React.CSSProperties;
    labelSm: React.CSSProperties;
    bodyLg: React.CSSProperties;
    bodyMd: React.CSSProperties;
    bodySm: React.CSSProperties;
    /** Monospaced — reserved for ELO ratings and clock timers */
    dataTerminal: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    displayLg?: React.CSSProperties;
    displayMd?: React.CSSProperties;
    displaySm?: React.CSSProperties;
    headlineLg?: React.CSSProperties;
    headlineMd?: React.CSSProperties;
    headlineSm?: React.CSSProperties;
    titleLg?: React.CSSProperties;
    titleMd?: React.CSSProperties;
    titleSm?: React.CSSProperties;
    labelLg?: React.CSSProperties;
    labelMd?: React.CSSProperties;
    labelSm?: React.CSSProperties;
    bodyLg?: React.CSSProperties;
    bodyMd?: React.CSSProperties;
    bodySm?: React.CSSProperties;
    dataTerminal?: React.CSSProperties;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Raw design tokens  (reference these in components, never hard-code hex)
// ─────────────────────────────────────────────────────────────────────────────
export const tokens = {
  // ── Colour ──────────────────────────────────────────────────────────────
  color: {
    // Primary (Cool Blue)
    primary: "#7bd0ff",
    onPrimary: "#003449",
    primaryContainer: "#004d67",
    onPrimaryContainer: "#008abb",

    // Secondary (Slate Blue)
    secondary: "#bcc7de",
    onSecondary: "#26304d",
    secondaryContainer: "#3c4664",
    onSecondaryContainer: "#d8e3fc",

    // Tertiary / Emerald  — engine analysis & "correct" moves ONLY
    tertiary: "#4edea3",
    onTertiary: "#003824",
    tertiaryContainer: "#001c10",
    onTertiaryContainer: "#6efbc0",

    // Error
    error: "#ffb4ab",
    onError: "#690005",
    errorContainer: "#93000a",
    onErrorContainer: "#ffdad6",

    // Surface stack ("Deep Slate" foundation)
    surface: "#0b1326",               // base backdrop
    surfaceContainerLowest: "#070e1d",
    surfaceContainerLow: "#131b2e",   // sub-sections
    surfaceContainer: "#171f33",      // sidebars / notation panels
    surfaceContainerHigh: "#222a3f",
    surfaceContainerHighest: "#2d3449", // "lifted" interactive cards
    surfaceBright: "#31394d",         // hover state target
    surfaceVariant: "#44475a",        // glassmorphism base (use at 60% opacity)
    surfaceTint: "#7bd0ff",           // subtle glow colour

    // On-surface roles
    onSurface: "#dae2fd",             // primary content — never pure white
    onSurfaceVariant: "#c6c6cd",      // secondary metadata

    // Outline (The "Ghost Border" rule)
    outline: "#8e9099",
    outlineVariant: "#45464d",        // use at 15% opacity if absolutely needed

    // Board squares
    boardDark: "#2d3449",             // surfaceContainerHighest
    boardLight: "#bcc7de",            // secondary
    boardHighlight: "rgba(78,222,163,0.30)", // tertiary at 30% opacity (last move)
  },

  // ── Typography scales ────────────────────────────────────────────────────
  font: {
    display: "'Space Grotesk', 'Inter', sans-serif",
    body: "'Inter', 'Space Grotesk', sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace", // ELO / clock only
  },

  // ── Spacing scale (rem) ──────────────────────────────────────────────────
  spacing: {
    px: "0.0625rem",
    0.5: "0.125rem",
    1: "0.25rem",
    1.5: "0.375rem", // game-list item gap (the "no-divider" rule)
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",   // breathing room between data modules
    12: "3rem",     // generous section spacing
    16: "4rem",     // major section break (replaces borders)
    20: "5rem",
    24: "6rem",
  },

  // ── Border radius ────────────────────────────────────────────────────────
  radius: {
    none: "0",
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",   // board container
    xl: "0.75rem",
    full: "9999px",
  },

  // ── Elevation / shadows (Ambient Luminescence) ───────────────────────────
  shadow: {
    /** Dragged piece / floating board element */
    floatPiece: "0 0 32px 0 rgba(123,208,255,0.06)",
    /** Standard lifted card */
    cardLift: "0 4px 24px 0 rgba(123,208,255,0.04)",
    /** Glassmorphism popover */
    glass: "0 8px 32px 0 rgba(11,19,38,0.48)",
  },

  // ── Gradient presets ─────────────────────────────────────────────────────
  gradient: {
    /** Primary CTA: primary → on-primary-container at 135° */
    primaryCta: "linear-gradient(135deg, #7bd0ff 0%, #008abb 100%)",
    /** Subtle surface shimmer */
    surfaceShimmer:
      "linear-gradient(135deg, rgba(123,208,255,0.04) 0%, rgba(123,208,255,0) 100%)",
  },

  // ── Glassmorphism preset ─────────────────────────────────────────────────
  glass: {
    background: "rgba(68,71,90,0.60)",   // surfaceVariant at 60%
    backdropFilter: "blur(12px)",
    webkitBackdropFilter: "blur(12px)",
  },

  // ── Transition ───────────────────────────────────────────────────────────
  transition: {
    fast: "120ms ease",
    base: "200ms ease",
    slow: "350ms ease",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
//  MUI theme
// ─────────────────────────────────────────────────────────────────────────────
export const theme = createTheme({
  // ── Colour system ──────────────────────────────────────────────────────
  palette: {
    mode: "dark",

    background: {
      default: tokens.color.surface,
      paper: tokens.color.surfaceContainer,
    },

    primary: {
      main: tokens.color.primary,
      dark: tokens.color.onPrimaryContainer,
      contrastText: tokens.color.onPrimary,
    },

    secondary: {
      main: tokens.color.secondary,
      dark: tokens.color.secondaryContainer,
      contrastText: tokens.color.onSecondary,
    },

    tertiary: {
      main: tokens.color.tertiary,
      dark: tokens.color.tertiaryContainer,
      contrastText: tokens.color.onTertiary,
    },

    neutral: {
      main: tokens.color.surface,
    },

    error: {
      main: tokens.color.error,
      dark: tokens.color.errorContainer,
      contrastText: tokens.color.onError,
    },

    success: {
      // "No green for generic success" — use primary blue semantics
      main: tokens.color.primary,
    },

    text: {
      primary: tokens.color.onSurface,
      secondary: tokens.color.onSurfaceVariant,
    },

    // Extended palette tokens
    surfaceContainerLowest: tokens.color.surfaceContainerLowest,
    surfaceContainerLow: tokens.color.surfaceContainerLow,
    surfaceContainer: tokens.color.surfaceContainer,
    surfaceContainerHigh: tokens.color.surfaceContainerHigh,
    surfaceContainerHighest: tokens.color.surfaceContainerHighest,
    surfaceBright: tokens.color.surfaceBright,
    surfaceVariant: tokens.color.surfaceVariant,
    surfaceTint: tokens.color.surfaceTint,

    onSurface: tokens.color.onSurface,
    onSurfaceVariant: tokens.color.onSurfaceVariant,
    onPrimary: tokens.color.onPrimary,
    onPrimaryContainer: tokens.color.onPrimaryContainer,
    onSecondary: tokens.color.onSecondary,
    onSecondaryContainer: tokens.color.onSecondaryContainer,
    onTertiary: tokens.color.onTertiary,
    onTertiaryContainer: tokens.color.onTertiaryContainer,

    primaryContainer: tokens.color.primaryContainer,
    secondaryContainer: tokens.color.secondaryContainer,
    tertiaryContainer: tokens.color.tertiaryContainer,

    outlineVariant: tokens.color.outlineVariant,
    outline: tokens.color.outline,
  },

  // ── Typography ─────────────────────────────────────────────────────────
  typography: {
    // Base body font
    fontFamily: tokens.font.body,

    // ── Display (Space Grotesk) — architectural / match scores ────────────
    displayLg: {
      fontFamily: tokens.font.display,
      fontSize: "3.5625rem",
      lineHeight: 1.12,
      letterSpacing: "-0.02em",
      fontWeight: 400,
    },
    displayMd: {
      fontFamily: tokens.font.display,
      fontSize: "2.8125rem",
      lineHeight: 1.15,
      letterSpacing: "-0.015em",
      fontWeight: 400,
    },
    displaySm: {
      fontFamily: tokens.font.display,
      fontSize: "2.25rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
      fontWeight: 400,
    },

    // ── Headlines (Space Grotesk) ─────────────────────────────────────────
    headlineLg: {
      fontFamily: tokens.font.display,
      fontSize: "2rem",
      lineHeight: 1.25,
      letterSpacing: "-0.005em",
      fontWeight: 500,
    },
    headlineMd: {
      fontFamily: tokens.font.display,
      fontSize: "1.75rem",
      lineHeight: 1.28,
      fontWeight: 500,
    },
    headlineSm: {
      fontFamily: tokens.font.display,
      fontSize: "1.5rem",
      lineHeight: 1.33,
      fontWeight: 500,
    },

    // ── Titles (Space Grotesk) ────────────────────────────────────────────
    titleLg: {
      fontFamily: tokens.font.display,
      fontSize: "1.375rem",
      lineHeight: 1.27,
      fontWeight: 500,
    },
    titleMd: {
      fontFamily: tokens.font.display,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.009em",
      fontWeight: 500,
    },
    titleSm: {
      fontFamily: tokens.font.display,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.006em",
      fontWeight: 500,
    },

    // ── Labels — uppercase chips / button text ────────────────────────────
    labelLg: {
      fontFamily: tokens.font.body,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.006em",
      fontWeight: 500,
    },
    labelMd: {
      fontFamily: tokens.font.body,
      fontSize: "0.75rem",
      lineHeight: 1.33,
      letterSpacing: "0.05em",
      fontWeight: 500,
      textTransform: "uppercase" as const,
    },
    labelSm: {
      fontFamily: tokens.font.body,
      fontSize: "0.6875rem",
      lineHeight: 1.45,
      letterSpacing: "0.05em",
      fontWeight: 500,
      textTransform: "uppercase" as const,
    },

    // ── Body (Inter) — move list / engine depth ───────────────────────────
    bodyLg: {
      fontFamily: tokens.font.body,
      fontSize: "1rem",
      lineHeight: 1.5,
      letterSpacing: "0.009em",
      fontWeight: 400,
    },
    bodyMd: {
      fontFamily: tokens.font.body,
      fontSize: "0.875rem",
      lineHeight: 1.43,
      letterSpacing: "0.018em",
      fontWeight: 400,
    },
    bodySm: {
      fontFamily: tokens.font.body,
      fontSize: "0.75rem",
      lineHeight: 1.33,
      letterSpacing: "0.025em",
      fontWeight: 400,
    },

    // ── Data Terminal (JetBrains Mono) — ELO ratings & clock timers ONLY ──
    dataTerminal: {
      fontFamily: tokens.font.mono,
      fontSize: "0.875rem",
      lineHeight: 1.5,
      letterSpacing: "0.04em",
      fontWeight: 400,
    },

    // ── Map to standard MUI variants ─────────────────────────────────────
    h1: { fontFamily: tokens.font.display, fontSize: "2.8125rem", fontWeight: 400, lineHeight: 1.15, letterSpacing: "-0.015em" },
    h2: { fontFamily: tokens.font.display, fontSize: "2.25rem",   fontWeight: 400, lineHeight: 1.2,  letterSpacing: "-0.01em"  },
    h3: { fontFamily: tokens.font.display, fontSize: "2rem",      fontWeight: 500, lineHeight: 1.25  },
    h4: { fontFamily: tokens.font.display, fontSize: "1.75rem",   fontWeight: 500, lineHeight: 1.28  },
    h5: { fontFamily: tokens.font.display, fontSize: "1.5rem",    fontWeight: 500, lineHeight: 1.33  },
    h6: { fontFamily: tokens.font.display, fontSize: "1.25rem",   fontWeight: 500, lineHeight: 1.4   },
    body1: { fontFamily: tokens.font.body, fontSize: "1rem",      fontWeight: 400, lineHeight: 1.5,  letterSpacing: "0.009em"  },
    body2: { fontFamily: tokens.font.body, fontSize: "0.875rem",  fontWeight: 400, lineHeight: 1.43, letterSpacing: "0.018em"  },
    caption: { fontFamily: tokens.font.body, fontSize: "0.75rem", fontWeight: 400, lineHeight: 1.33, letterSpacing: "0.025em"  },
    button: { fontFamily: tokens.font.body, fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" as const },
  },

  // ── Shape ──────────────────────────────────────────────────────────────
  shape: {
    borderRadius: 6, // ~rounded-md (0.375rem)
  },

  // ── Spacing ────────────────────────────────────────────────────────────
  // MUI default is 8px; we keep it so spacing(1)=8px, spacing(2)=16px, etc.
  spacing: 8,

  // ── Component overrides ────────────────────────────────────────────────
  components: {
    // Button — gradient CTA + uppercase label-md
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          transition: `background ${tokens.transition.base}, box-shadow ${tokens.transition.base}`,
        },
        containedPrimary: {
          background: tokens.gradient.primaryCta,
          color: tokens.color.onPrimary,
          boxShadow: "none",
          "&:hover": {
            background: tokens.gradient.primaryCta,
            filter: "brightness(1.10)",
            boxShadow: tokens.shadow.cardLift,
          },
        },
      },
    },

    // Paper — use surface tiers, no borders
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: tokens.color.surfaceContainer,
          border: "none",
        },
        elevation1: { backgroundColor: tokens.color.surfaceContainerLow },
        elevation2: { backgroundColor: tokens.color.surfaceContainer },
        elevation3: { backgroundColor: tokens.color.surfaceContainerHigh },
        elevation4: { backgroundColor: tokens.color.surfaceContainerHighest },
      },
    },

    // Card — lifted interactive data point
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.color.surfaceContainerHighest,
          backgroundImage: "none",
          border: "none",
          borderRadius: tokens.radius.lg,
          boxShadow: tokens.shadow.cardLift,
        },
      },
    },

    // Input — "soft-bottom" approach (only bottom border visible)
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: tokens.color.surfaceContainerLowest,
          borderRadius: tokens.radius.md,
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderBottom: `1px solid ${tokens.color.outlineVariant}`,
            borderRadius: 0,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderBottom: `1px solid ${tokens.color.outline}`,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderBottom: `2px solid ${tokens.color.primary}`,
          },
        },
      },
    },

    // Chip — analysis chip (tertiary-container base)
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radius.md,
          fontFamily: tokens.font.body,
          fontSize: "0.75rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        },
      },
    },

    // Divider — ghost border rule (outlineVariant at 15% opacity)
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: `rgba(69, 70, 77, 0.15)`, // outlineVariant @ 15%
        },
      },
    },

    // Tooltip — glassmorphism floating panel
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: tokens.glass.background,
          backdropFilter: tokens.glass.backdropFilter,
          WebkitBackdropFilter: tokens.glass.webkitBackdropFilter,
          borderRadius: tokens.radius.lg,
          color: tokens.color.onSurface,
          boxShadow: tokens.shadow.glass,
          fontSize: "0.75rem",
          letterSpacing: "0.018em",
        },
      },
    },

    // List items — no dividers, 0.3rem gap, hover → surfaceBright
    MuiListItem: {
      styleOverrides: {
        root: {
          marginBottom: tokens.spacing[1.5],
          borderRadius: tokens.radius.md,
          transition: `background-color ${tokens.transition.base}`,
          "&:hover": {
            backgroundColor: tokens.color.surfaceBright,
          },
        },
      },
    },
  },
});