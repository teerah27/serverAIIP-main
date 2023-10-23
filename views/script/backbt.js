        // Disable the back button
        history.pushState(null, null, location.href);
        window.onpopstate = function () {
            history.pushState(null, null, location.href); // Revert the URL to the current page
        };