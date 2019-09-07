console.log("hmr-test-state.ts is running");

class AppState {
    private curNumber = 0;

    constructor() {
        console.log("AppState constructor running");
    }

    public setNumber(newNumber: number) {
        this.curNumber = newNumber;
    }

    public getCurNumber() {
        return this.curNumber;
    }
}
export const appState = new AppState();