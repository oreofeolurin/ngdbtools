import { Inject, NgModule, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DynamicFormDemoComponent } from './dynamic-form-demo.component';
//import {RouterModule} from '@angular/router';
//import {DynamicFormModule} from '@ngdbtools/dynamic-form';
import { RouterModule } from '@angular/router';
import { DynamicFormModule } from '@ngdbtools/dynamic-form';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  { path: '', component: DynamicFormDemoComponent }
];

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    DynamicFormModule,
    //RouterModule.forChild([
    //    {path: 'dynamic-form', component: DynamicFormDemoComponent}
    // ])
    RouterModule.forChild(routes)
  ],
  declarations: [DynamicFormDemoComponent],
  exports: [],
})
export class DynamicFormDemoModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer, @Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl(`assets/images/icons/mdi.svg`));
    }
  }
}
