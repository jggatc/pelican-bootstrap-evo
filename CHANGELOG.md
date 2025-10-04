* initial release.
* change `SITENAME` to allow for `SITENAME - SITESUBTITLE` in navbar, determined by `SITENAME_WITH_SITESUBTITLE`. Can set separator with `SITENAME_WITH_SITESUBTITLE_SEP`.
* add `{% block head %}` in base, article, and page HTML templates, for HTML insertion in `<head>`.
* add HTML base tag in `<head>` of article and page templates, defined by `baseurl` metadata key.
* change `back to top` in footer to absolute url, required when `baseurl` base tag is used.
* add `SIDEBAR_POST_HEADER` to define header of recent posts in sidebar.

