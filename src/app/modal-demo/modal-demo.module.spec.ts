import { ModalDemoModule } from './modal-demo.module';

describe('ModalDemoModule', () => {
  let modalDemoModule: ModalDemoModule;

  beforeEach(() => {
    modalDemoModule = new ModalDemoModule();
  });

  it('should create an instance', () => {
    expect(modalDemoModule).toBeTruthy();
  });
});
