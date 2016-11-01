export class ModalBase {
    destroy: Function;

    closeModal(): void {
        this.destroy();
    }
}