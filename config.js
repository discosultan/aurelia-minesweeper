System.config({
  defaultJSExtensions: true,
  transpiler: false,
  paths: {
    "*": "dist/*",
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },
  map: {
    "aurelia-animator-css": "npm:aurelia-animator-css@1.0.0-beta.1.2.0",
    "aurelia-bootstrapper": "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0",
    "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
    "aurelia-fetch-client": "npm:aurelia-fetch-client@1.0.0-beta.1.2.0",
    "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.1",
    "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
    "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.1",
    "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.1",
    "fetch": "github:github/fetch@0.10.1",
    "text": "github:systemjs/plugin-text@0.0.3",
    "npm:aurelia-animator-css@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-binding@1.0.0-beta.1.3.1": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0": {
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-framework": "npm:aurelia-framework@1.0.0-beta.1.2.1",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-history-browser": "npm:aurelia-history-browser@1.0.0-beta.1.2.0",
      "aurelia-loader-default": "npm:aurelia-loader-default@1.0.0-beta.1.2.0",
      "aurelia-logging-console": "npm:aurelia-logging-console@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-pal-browser": "npm:aurelia-pal-browser@1.0.0-beta.1.2.0",
      "aurelia-polyfills": "npm:aurelia-polyfills@1.0.0-beta.1.1.1",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1",
      "aurelia-templating-binding": "npm:aurelia-templating-binding@1.0.0-beta.1.2.1",
      "aurelia-templating-resources": "npm:aurelia-templating-resources@1.0.0-beta.1.2.1",
      "aurelia-templating-router": "npm:aurelia-templating-router@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-framework@1.0.0-beta.1.2.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-history-browser@1.0.0-beta.1.2.0": {
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-loader-default@1.0.0-beta.1.2.0": {
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-loader@1.0.0-beta.1.2.0": {
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-logging-console@1.0.0-beta.1.2.0": {
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-metadata@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-pal-browser@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-polyfills@1.0.0-beta.1.1.1": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0": {
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-event-aggregator": "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0",
      "aurelia-history": "npm:aurelia-history@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-route-recognizer": "npm:aurelia-route-recognizer@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-task-queue@1.0.0-beta.1.2.0": {
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0"
    },
    "npm:aurelia-templating-binding@1.0.0-beta.1.2.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.1",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-templating-resources@1.0.0-beta.1.2.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-templating-router@1.0.0-beta.1.2.0": {
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-router": "npm:aurelia-router@1.0.0-beta.1.2.0",
      "aurelia-templating": "npm:aurelia-templating@1.0.0-beta.1.2.1"
    },
    "npm:aurelia-templating@1.0.0-beta.1.2.1": {
      "aurelia-binding": "npm:aurelia-binding@1.0.0-beta.1.3.1",
      "aurelia-dependency-injection": "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0",
      "aurelia-loader": "npm:aurelia-loader@1.0.0-beta.1.2.0",
      "aurelia-logging": "npm:aurelia-logging@1.0.0-beta.1.2.0",
      "aurelia-metadata": "npm:aurelia-metadata@1.0.0-beta.1.2.0",
      "aurelia-pal": "npm:aurelia-pal@1.0.0-beta.1.2.0",
      "aurelia-path": "npm:aurelia-path@1.0.0-beta.1.2.0",
      "aurelia-task-queue": "npm:aurelia-task-queue@1.0.0-beta.1.2.0"
    }
  },
  bundles: {
    "aurelia-aafc1ecca7.js": [
      "github:github/fetch@0.10.1.js",
      "github:github/fetch@0.10.1/fetch.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0/aurelia-animator-css.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.1.js",
      "npm:aurelia-binding@1.0.0-beta.1.3.1/aurelia-binding.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0.js",
      "npm:aurelia-bootstrapper@1.0.0-beta.1.2.0/aurelia-bootstrapper.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0.js",
      "npm:aurelia-dependency-injection@1.0.0-beta.1.2.0/aurelia-dependency-injection.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0/aurelia-event-aggregator.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0/aurelia-fetch-client.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.1/aurelia-framework.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader-default@1.0.0-beta.1.2.0/aurelia-loader-default.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0.js",
      "npm:aurelia-loader@1.0.0-beta.1.2.0/aurelia-loader.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0.js",
      "npm:aurelia-logging@1.0.0-beta.1.2.0/aurelia-logging.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0.js",
      "npm:aurelia-metadata@1.0.0-beta.1.2.0/aurelia-metadata.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal-browser@1.0.0-beta.1.2.0/aurelia-pal-browser.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0.js",
      "npm:aurelia-pal@1.0.0-beta.1.2.0/aurelia-pal.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0.js",
      "npm:aurelia-path@1.0.0-beta.1.2.0/aurelia-path.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.1.js",
      "npm:aurelia-polyfills@1.0.0-beta.1.1.1/aurelia-polyfills.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0.js",
      "npm:aurelia-task-queue@1.0.0-beta.1.2.0/aurelia-task-queue.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.1.js",
      "npm:aurelia-templating-binding@1.0.0-beta.1.2.1/aurelia-templating-binding.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/abstract-repeater.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/analyze-view-factory.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/array-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/aurelia-templating-resources.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/binding-mode-behaviors.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/binding-signaler.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/compile-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/compose.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/css-resource.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/debounce-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/dynamic-element.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/focus.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/hide.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/html-resource-plugin.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/html-sanitizer.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/if.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/map-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/null-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/number-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/repeat-strategy-locator.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/repeat-utilities.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/repeat.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/replaceable.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/sanitize-html.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/set-repeat-strategy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/show.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/signal-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/throttle-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/update-trigger-binding-behavior.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/view-spy.js",
      "npm:aurelia-templating-resources@1.0.0-beta.1.2.1/with.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.1.js",
      "npm:aurelia-templating@1.0.0-beta.1.2.1/aurelia-templating.js"
    ],
    "app-build-a878413216.js": [
      "app.css!github:systemjs/plugin-text@0.0.3.js",
      "app.html!github:systemjs/plugin-text@0.0.3.js",
      "app.js",
      "base.css!github:systemjs/plugin-text@0.0.3.js",
      "component/gameboard.css!github:systemjs/plugin-text@0.0.3.js",
      "component/gameboard.html!github:systemjs/plugin-text@0.0.3.js",
      "component/gameboard.js",
      "component/leaderboard.css!github:systemjs/plugin-text@0.0.3.js",
      "component/leaderboard.html!github:systemjs/plugin-text@0.0.3.js",
      "component/leaderboard.js",
      "component/settings.css!github:systemjs/plugin-text@0.0.3.js",
      "component/settings.html!github:systemjs/plugin-text@0.0.3.js",
      "component/settings.js",
      "component/social/github-button.html!github:systemjs/plugin-text@0.0.3.js",
      "component/social/github-button.js",
      "component/social/tweet.css!github:systemjs/plugin-text@0.0.3.js",
      "component/social/tweet.html!github:systemjs/plugin-text@0.0.3.js",
      "component/social/tweet.js",
      "events.js",
      "foundation.css!github:systemjs/plugin-text@0.0.3.js",
      "game/minesweeper.js",
      "game/settings.js",
      "game/square.js",
      "main.js",
      "storage/localLeaderboardStorage.js",
      "storage/remoteLeaderboardStorage.js",
      "utility/input.js",
      "utility/slide.js",
      "utility/sort.js",
      "utility/take.js",
      "utility/timer.js"
    ]
  },
  depCache: {
    "app.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "game/settings.js",
      "utility/input.js",
      "events.js"
    ],
    "component/gameboard.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "utility/input.js",
      "game/minesweeper.js",
      "game/square.js",
      "events.js"
    ],
    "component/leaderboard.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "utility/input.js",
      "storage/remoteLeaderboardStorage.js",
      "storage/localLeaderboardStorage.js",
      "game/minesweeper.js",
      "game/settings.js",
      "events.js"
    ],
    "component/settings.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-event-aggregator@1.0.0-beta.1.2.0.js",
      "utility/input.js",
      "game/settings.js",
      "events.js"
    ],
    "component/social/github-button.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js"
    ],
    "component/social/tweet.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "utility/input.js"
    ],
    "game/minesweeper.js": [
      "game/square.js",
      "utility/timer.js"
    ],
    "storage/remoteLeaderboardStorage.js": [
      "github:github/fetch@0.10.1.js",
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-fetch-client@1.0.0-beta.1.2.0.js"
    ],
    "utility/slide.js": [
      "npm:aurelia-framework@1.0.0-beta.1.2.1.js",
      "npm:aurelia-animator-css@1.0.0-beta.1.2.0.js"
    ]
  }
})