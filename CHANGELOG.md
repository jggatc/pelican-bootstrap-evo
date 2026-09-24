* initial release.
* change `SITENAME` to allow `SITENAME - SITESUBTITLE` in navbar by `SITENAME_WITH_SITESUBTITLE`.
* add `{% block head %}` in base, article, and page HTML templates, for HTML insertion in `<head>`.
* add HTML base tag in `<head>` of article and page templates, defined by `baseurl` metadata key.
* change `back to top` in footer to absolute url, required when `baseurl` base tag is used.
* add `SIDEBAR_POSTS_HEADER` to define header of recent posts in sidebar.
* add `DISPLAY_PAGES_ON_SIDEBAR` to display pages in sidebar.
* add `SIDEBAR_ITEMS` for order of items in sidebar.

## Bootstrap 5 port

* port all templates from Bootstrap 3 to Bootstrap 5 (`panel` → `card`,
  `well` → `card`, `label` → `badge text-bg-*`, `img-responsive` → `img-fluid`,
  `pull-*` → `float-*`, `sr-only` → `visually-hidden`, Bootstrap 5 navbar,
  pagination and accordion components).
* rebuild `static/` with Bootstrap 5.3.8 assets (CSS/JS) and Bootstrap 5.3.8
  Bootswatch themes; themes now live in `static/css/<theme>/bootstrap.min.css`
  (one directory per theme, `slate` and `journal` bundled).
* drop Bootstrap 3 leftovers: glyphicons, `respond.min.js`, `bodypadding.js`,
  the non-bundle `bootstrap.min.js` and the Tipue search box.
* add `BOOTSTRAP_THEME_DARK` / `BOOTSTRAP_THEME_LIGHT` / `BOOTSTRAP_THEME_SWITCH`
  dark/light theme switcher (navbar or footer), with `localStorage` persistence
  and the `data-bs-theme` color-mode attribute.
* add `BOOTSTRAP_THEME_STYLES` dropdown to switch between any installed
  Bootswatch theme.
* add `BOOTSTRAP_DARK_THEMES` setting (default `['slate', 'cyborg', 'darkly',
  'superhero']`) to classify which themes are dark by design; drives
  `data-bs-theme` and the dark/light buttons. Restoring a saved theme is now
  guarded so a theme removed from `BOOTSTRAP_THEME_STYLES` can't leave the
  page unstyled.
* drop FontAwesome entirely (old version, caused issues) and switch to
  [Bootstrap Icons](https://icons.getbootstrap.com/), vendored under
  `static/icons/` (`bootstrap-icons.min.css` + woff/woff2 fonts + SVG sources).
  The `DISABLE_FONT_AWESOME` setting is removed; the Bootstrap Icons stylesheet
  is always loaded. `DISABLE_SIDEBAR_TITLE_ICONS` still hides sidebar title
  icons.

