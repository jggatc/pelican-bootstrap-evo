* initial release.
* change `SITENAME` to allow `SITENAME - SITESUBTITLE` in navbar by `SITENAME_WITH_SITESUBTITLE`.
* add `{% block head %}` in base, article, and page HTML templates, for HTML insertion in `<head>`.
* add HTML base tag in `<head>` of article and page templates, defined by `baseurl` metadata key.
* change `back to top` in footer to absolute url, required when `baseurl` base tag is used.
* add `SIDEBAR_POSTS_HEADER` to define header of recent posts in sidebar.
* add `DISPLAY_PAGES_ON_SIDEBAR` to display pages in sidebar.

