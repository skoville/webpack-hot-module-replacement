export interface ClientConfigurationOptions {
    /**
     * The url that the client runtime should use to establish contact with the server.
     */
    url: string;
    /**
     * If false, then any module reload would prompt an application restart instead of a module hot swap.
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