import { DynamicFormDemoModule } from './dynamic-form-demo.module';

describe('DynamicFormDemoModule', () => {
  let dynamicFormModule: DynamicFormDemoModule;

  beforeEach(() => {
    dynamicFormModule = new DynamicFormDemoModule();
  });

  it('should create an instance', () => {
    expect(dynamicFormModule).toBeTruthy();
  });
});
