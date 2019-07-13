[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

# skoville-webpack-hot-module-reloading

- Only recompile what changes
- Only run tests on what changes
- Only deploy the changes, and do so automatically
- Debug code real-time that is shared cross-platform

These are but a few of the aspirations for this project. This project seeks to create an extensible, enterprise-grade, next-gen DevOps platform and provide it freely.
We heavily utilize the Hot Module Reloading feature for module-grained testing and deployments.

This repository in particular solves the universal HMR portion of the puzzle, and exposes a plugin system that allows enough customization to build out tools in separate repos like dashboards for monitoring current build progress.