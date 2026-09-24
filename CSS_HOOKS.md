# CSS Hooks Reference

Class/id hooks exposed by pelican-bootstrap-evo (Bootstrap 5 port). Use these
to customize the theme from your own `CUSTOM_CSS` / `CUSTOM_JS` rather than
editing the theme. All Bootstrap 5 utility/component classes (`btn`, `dropdown`,
`list-group`, `text-bg-*`, etc.) are available too; this documents the
theme-specific and port-added surface.

## 1. Theme switcher (new in the port — JS hooks)

| Hook | Where |
|---|---|
| `<html data-theme-css-base data-theme-dark data-theme-light data-theme-dark-styles data-bs-theme="dark\|light">` | root element, `base.html` — the switcher reads these; `data-theme-dark-styles` is the space-separated `BOOTSTRAP_DARK_THEMES` list |
| `#bootstrap-theme-css` | the `<link>` whose `href` gets swapped |
| `[data-theme-mode="dark"]` / `[data-theme-mode="light"]` | the two dark/light buttons |
| `[data-theme-style]` | one per entry in the `BOOTSTRAP_THEME_STYLES` dropdown |
| `#theme-style-label` | the dropdown's current-style label |
| `THEME_SWITCH_BTN_STYLE` | config — button classes, default `'btn-outline-secondary'` |

Style the buttons via `.btn-group-sm`, `.dropdown`,
`.dropdown-menu.dropdown-menu-end` (wrapped in
`div.d-flex.align-items-center.gap-2.flex-wrap` inside the navbar's right `ul`).

## 2. Navbar (`base.html`)

- `nav.navbar.navbar-expand-lg.navbar-dark.bg-primary.sticky-top` — `bg-dark`
  instead if `BOOTSTRAP_NAVBAR_INVERSE = True`
- `#navbar-main` — the collapsible block (target of the hamburger)
- `.navbar-brand` (logo `img.d-inline-block.align-text-top.gap-right` + site name)
- `.navbar-toggler`, `.navbar-toggler-icon` — hamburger
- `.navbar-nav.me-auto` — left menu (`.nav-item` > `.nav-link`, active page gets `.active`)
- `.navbar-nav.ms-auto.align-items-lg-center` — right side (Archives link + theme switch)

## 3. Layout / grid (`base.html`)

- `.container-fluid` (with `BOOTSTRAP_FLUID`) or `.container` → `.row`
- Content column: `div.col-md-9` (+ `order-md-last` when `SIDEBAR_ON_LEFT`)
- Sidebar column: `div#sidebar.col-md-3` (+ `order-md-first` when `SIDEBAR_ON_LEFT`)
- `PADDED_SINGLE_COLUMN_STYLE` → `col-md-8.mx-auto`

## 4. Sidebar (`includes/sidebar.html` + subtemplates)

Outer shell: `section.card > ul.list-group.list-group-flush > li.list-group-item`
— each section is one `li`, with an `<h4>` header (icon + `span.icon-label`).

Section ids (target these to restyle a section):

- `#aboutme` — About Me blurb
- `#social` — `SOCIAL` links (each `li.list-group-item` > `a`)
- `#pages`, `#recentposts`, `#archive`, `#authors`, `#links`, `#images`,
  `#show-source`, `#gh_repos`, `#twitter_timeline`, `#tags`
- `#categories` / `#tags` — these two are Bootstrap 5 **accordions**:
  `#accordion` → `.accordion-item` > `.accordion-header` >
  `button.accordion-button.collapsed` + `.accordion-collapse.collapse`
  (`#heading-{slug}` / `#collapse-{slug}`), with a
  `badge.text-bg-secondary.rounded-pill.ms-auto` count
- `#related-posts`, `#series` — cards below the article (see §5)

## 5. Article & page content

- `<section id="content">` (article) / `<section id="content" class="body">` (page)
- `h1.entry-title`, `div.entry-content`, `.summary`
- `footer.post-info` (`includes/article_info.html`) with `.published`,
  `.modified`, and badges — now `badge.text-bg-secondary` (category) /
  `badge.text-bg-success` (tags)
- Breadcrumbs: `ol.breadcrumb` > `li.breadcrumb-item` (+ `.active`)
- Cards replacing BS3 panels: `.card` + `.card-body` for related-posts
  (`#related-posts`), series, show-source, and article-info
- `.img-thumbnail` for sidebar images; `.float-start` / `.float-end` for
  aligned images
- Tag cloud sizes: `.tag-0` … `.tag-4` (sizes are in `style.css`)

## 6. Footer (`includes/footer.html`)

- `footer` → `.container-fluid` → `.row` → `.col-10.col-sm-11` (copyright) and
  `.col-2.col-sm-1` (back-to-top link, `float-end`, `bi bi-arrow-up`)
- When `BOOTSTRAP_THEME_SWITCH = 'footer'`, the theme switcher renders in the
  footer instead of the navbar

## 7. Pagination (`includes/pagination.html`)

- `ul.pagination` > `li.page-item` (+ `.disabled` / `.active`) > `a.page-link`
- With `USE_PAGER`: `div.d-flex.justify-content-between` with
  `btn.btn-secondary` prev/next buttons

## 8. Existing `style.css` hooks

`#sidebar .card`, `#sidebar .list-group(-item)`, `#banner` (+
`@media (max-width: 650px)`), `.entry-content a`/`img`, `.highlighttable`,
`.categories-timestamp`, `html { scroll-padding-top: 72px }` (keeps anchors
clear of the sticky navbar).

## Notes

- Everything is scoped by the theme, so override in your `CUSTOM_CSS`
  (e.g. `CUSTOM_CSS = 'theme/css/custom.css'`) rather than editing the theme.
- The `#categories`/`#tags` accordions are the biggest structural change from
  Bootstrap 3 — if you'd rather have plain lists, that's the file to tweak
  (`templates/includes/sidebar/categories.html`, `tags.html`).
