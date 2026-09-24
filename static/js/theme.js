/* Bootstrap theme switcher for pelican-bootstrap-evo (Bootstrap 5).
 *
 * Swaps the active Bootstrap theme stylesheet (one subdir per Bootswatch
 * theme under <theme>/css/) and sets data-bs-theme="dark|light" on <html>
 * so Bootstrap 5.3 color mode applies. The chosen theme is persisted in
 * localStorage and restored on the next visit.
 *
 * Only wired up when the template renders the switch controls (i.e. when
 * BOOTSTRAP_THEME_SWITCH is set in the Pelican config).
 */
(function () {
    'use strict';

    var link = document.getElementById('bootstrap-theme-css');
    var html = document.documentElement;
    if (!link || !html) {
        return;
    }

    var cssBase = html.getAttribute('data-theme-css-base');
    var darkTheme = html.getAttribute('data-theme-dark') || 'slate';
    var lightTheme = html.getAttribute('data-theme-light') || 'journal';
    // Bootswatch themes that are dark by design. Rendered from the
    // BOOTSTRAP_DARK_THEMES setting; falls back to the classic defaults.
    var darkStyles = (html.getAttribute('data-theme-dark-styles') ||
        'slate cyborg darkly superhero').split(' ');
    var STORAGE_KEY = 'bootstrap-theme-evo';

    function cssHref(theme) {
        return cssBase + '/' + theme + '/bootstrap.min.css';
    }

    function isDark(theme) {
        return darkStyles.indexOf(theme) !== -1;
    }

    function setActiveButton(theme) {
        var dark = isDark(theme);
        var buttons = document.querySelectorAll('[data-theme-mode]');
        for (var i = 0; i < buttons.length; i++) {
            var mode = buttons[i].getAttribute('data-theme-mode');
            buttons[i].classList.toggle('active',
                (dark && mode === 'dark') || (!dark && mode === 'light'));
        }
    }

    function applyTheme(theme) {
        link.href = cssHref(theme);
        html.setAttribute('data-bs-theme', isDark(theme) ? 'dark' : 'light');
        setActiveButton(theme);
        var label = document.getElementById('theme-style-label');
        if (label) {
            label.textContent = theme;
        }
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch (e) { /* storage unavailable (private mode) */ }
    }

    var modeButtons = document.querySelectorAll('[data-theme-mode]');
    for (var i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener('click', function () {
            var mode = this.getAttribute('data-theme-mode');
            applyTheme(mode === 'dark' ? darkTheme : lightTheme);
        });
    }

    var styleButtons = document.querySelectorAll('[data-theme-style]');
    for (var j = 0; j < styleButtons.length; j++) {
        styleButtons[j].addEventListener('click', function () {
            applyTheme(this.getAttribute('data-theme-style'));
        });
    }

    var saved = null;
    try {
        saved = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    if (saved) {
        // Only restore a theme that is still offered, so a removed theme
        // (or a stale localStorage entry) can't leave the page unstyled.
        var available = [darkTheme, lightTheme];
        for (var k = 0; k < styleButtons.length; k++) {
            available.push(styleButtons[k].getAttribute('data-theme-style'));
        }
        if (available.indexOf(saved) !== -1) {
            applyTheme(saved);
        }
    }
})();
