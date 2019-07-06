import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { GetBugComponent } from './get-bug/get-bug.component';
import { EditBugComponent } from './edit-bug/edit-bug.component';
import { InsertBugComponent } from './insert-bug/insert-bug.component';
import { StringifyPriorityPipe } from './get-bug/stringify-priority.pipe';
import { CapitalizePipe } from './get-bug/capitalize.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    GetBugComponent,
    EditBugComponent,
    InsertBugComponent,
    StringifyPriorityPipe,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    EditBugComponent,
    GetBugComponent,
    InsertBugComponent
  ]
})
export class BugReportSystemModule { }
