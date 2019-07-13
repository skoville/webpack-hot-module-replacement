This is an introduction to the webpack-dev-sec-ops-server project.

# Problem Background
I have often tried starting full-stack TypeScript projects (React + TypeScript on front-end, Node.js + TypeScript on back-end) with the intent of sharing code universally (ex. an API interface which could be implemented on the server-side and consumed on the web-client-side). TypeScript can take a while to transpile TS to JS, so it would be nice if I only had to re-compile modules that change rather than recompiling all the code after every change. Even better would be if I could hot-swap compiled code into running applications after a change so I don't need to restart the application each time. WebpackDevServer's hot module reloading should solve this problem, but it does not.

- WebpackDevServer HMR only supports browser hot module swapping, not node.js applications
- There is not much of a plugin interface for WebpackDevServer so it is difficult to extend.
- The code for WebpackDevServer is not very well documented and the code has monolithic structures making it difficult to maintain
- [Sometimes](https://github.com/webpack/webpack-dev-server/issues/1503) all of a webpack bundle's code is recompiled when only one file changes.

I desire a robust, production-ready system for rapidly developing, testing, and deploying my full-stack, isomorphic TypeScript projects, but webpack-dev-server does not provide the functionality I need, and based on the state of maintainability of its source, it is not worth my time to try and extend it. I'm tired of spending hours on haphazard configs and waiting for full-project recompiles, entire test-suite re-runs, full code redeploys, and full system restarts when I could be using webpacks core's HMR feature to its full potential.

# Solution

Create a better webpack-dev-server which supports universal HMR, is easily extensible, well-documented, and secure. Why not just do this but for TypeScript projects specifically to avoid end-users writing webpack configs entirely? Because I want this solution to be general, which will attract more users of the project, and thus more contributors among them. More eyes to scrutinize the project's flaws and fix them.

__The WebpackDevSecOpsServer Alpha MVP release will offer the following:__

- hot module swapping for any JavaScript runtime client (node.js, browsers, ReactNative, electron, etc.)
- Only compile the code that changes, and emit those updates via the [webpack HMR standards](https://webpack.js.org/api/hot-module-replacement/).
- Provide a way for individual modules to be tested before being passed to be emitted to the client for HMR.
- A web dashboard which can display stats on all webpack bundles currently being developed and re-built.
- Document the entire webpack HMR interface including how WebpackDevSecOpsServer taps into specific [webpack hooks](https://webpack.js.org/api/compiler-hooks/) and how that allows for hot code reloading
- Better document how to use the webpack HMR api in client code.

__In the long-run the project will aim to:__

- Provide plugin boilerplate repo.
- Eventually support [Deno](https://github.com/denoland/deno) in some way once it has stabalized.
- Add interactive debugging built-in to the dashboard. Debug souce-code alongside generated JS (eventually WASM).
- Build out an extensible build-pipeline (extended via plugins) so that once hot modules are compiled and tested, they can be hot swapped into live production systems. CI/CD (D for deployment) for individual modules.
- Add in optional light-weight execution tracer into production bundles so that entire end-user interactions can be recreated as if it was a debugging session.
- Curate a list of preferred plugins to use with this tool for best outcomes in
    - Compiling code
    - Testing code
    - Checking code for security vulnerabilities
    - Deploying vetted updates to individual servers, scaled clusters, applications running on end-user devices.

# Project Values

- No overscoping. Have a defined, minimal scope for repositories and let other functionality be implemented by third-party plugins.
- Document EVERYTHING.
    - All systems should have highly detailed documentation full of descriptive diagrams and this should be complete as part of the 1.0 release.
    - Every line of code should be justified and explained by near-by documentation.
    - Conform to the [TSDoc Standard](https://github.com/Microsoft/tsdoc) for documentating methods and classes.
    - Write everything in TypeScript and don't use the `any` type so all data structure types of plugin infrastructure APIs and internal modules can be easily documented and understood.
    - Anyone who reads all the documentation should be able to start productively contributing to the core repo(s) immediately without needing any further explanation.
- Perfection is just as important as Done when is comes to creating critical infrastructure platforms. "Done is better than Perfect" is for start-ups building consumer apps.
- Superior design > backwards-compatability. Force users to change their integration code to enjoy the features in new major releases for their own sake.
- Fair allocation of resouces. If eventually the project is funded by [Patreon](https://patreon.com) or [OpenCollective](https://opencollective.com), then resources should be spent on getting as many high-quality developers as possible, and they should be paid based on the value of their contribution to the project. It should be noted though that the goal of this project is not to make a profit, but to provide [Free](https://www.gnu.org/philosophy/free-sw.en.html) and Open Source Software. Profit-making is for businesses who use this software.
- Value community input without compromising the no overscoping principle. Come up with a system to vote on features and to delegate them to other projects or repos and their authors/maintainers.

# Project's Current Status

Basically the project has just begun. After spending much of 2018 thinking about these problems and how I want to solve them, I know now what I want to build, but I'm not sure how to build it or specifically how everything could be best-architected. Immediately I need help understanding webpack fully, and all the data passed to hooks and when the hooks are invoked and under what circumstances. Once this is known then we can properly design the project architecture. Until then, I am considering reverse-engineering [webpack-dev-server](https://github.com/webpack/webpack-dev-server) and [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) to implement the Alpha MVP (v0) functionality then rewriting the entire project according to a formalized spec for the [first stable release](https://semver.org/) (v1).

I'm in the process of starting some documentation on webpack (webpack's own documentation doesn't give enough detail to be sufficient for this project), the content for which is being learned by myself as I sandbox around with webpack.

If you have questions about this project, want to join me in building this, or have some advice to give, email me at [alex.l.leung@gmail.com](mailto:alex.l.leung@gmail.com) with the subject `WebpackDevSecOpsServer`.