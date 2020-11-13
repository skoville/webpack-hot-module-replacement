export interface SkovilleWebpackPluginOptions {
    /**
     * The url that the client runtime should use to establish contact with the Skoville server.
     */
    url: string;
    /**
     * If false, then all module updates will trigger and entire application restart instead of a module hot swap, unless {@link enableApplicationRestarting} is false,
     * in which case only a warning will be emitted.
     */
    enableHotModuleReloading: boolean;
    /**
     * If true, then whenever the application requires a restart, this will happen automatically.
     * Common cases for restarting include:
     * 1. The hot module swap bubbles up because importing modules don't have module.hot.accept handlers
     * 2. There was an error in the hot module swapping runtime
     * 3. module reloading was disabled.
     * If false, then a message will be logged that a restart is required to begin using updated module, however
     * this restart will not happen automatically.
     */
    enableApplicationRestarting: boolean;
}