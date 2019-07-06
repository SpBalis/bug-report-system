import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EditBugService } from './edit-bug.service';
import { Bugs, BugComment } from '../get-bug/bug.model';

@Component({
  selector: 'app-edit-bug',
  templateUrl: './edit-bug.component.html',
  styleUrls: ['./edit-bug.component.css']
})
export class EditBugComponent implements OnInit {
  savedId: any;
  editBug: Bugs = {
    title: '',
    description: '',
    priority: null,
    reporter: '',
    status: '',
    comments: []

  };
  newComment: BugComment =  {
    reporter: '',
    description: ''
  };
  selectedPriority = null;
  selectedReporter = null;
  selectedStatus = null;

  priorityOptions = [
    { key: 1, name: 'Critical' },
    { key: 2, name: 'Major' },
    { key: 3, name: 'Minor' }
  ];

  reporterOptions = [
    { key: 'QA', name: 'QA' },
    { key: 'PO', name: 'PO' },
    { key: 'DEV', name: 'DEV' },
  ];

  statusOptions = [
    { key: 'Ready for test', name: 'Ready for test' },
    { key: 'Done', name: 'Done' },
    { key: 'Rejected', name: 'Rejected' },
  ];

  constructor(private route: ActivatedRoute, private  editBugService: EditBugService, private router: Router) {
    this.savedId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.editBugService.getBugReport(this.savedId ).subscribe((col: Bugs) => {
      this.editBug = col;
      this.selectedPriority = col.priority;
      this.selectedReporter = col.reporter;
      this.selectedStatus = col.status;
      // this.editBug.comments?.[{ description?: string; reporter?: string; }];
      console.log(col);
    });
  }
  onChangePriority(e) {
    this.editBug.priority = e;
    this.selectedPriority = e;
  }
  onChangeReporter(e) {
    this.editBug.reporter = e;
    this.selectedReporter = e;
  }
  onChangeStatus(e) {
    this.editBug.status = e;
    this.selectedStatus = e;
  }
  onSubmit(f: { value: any; valid: any; }) {
    this.editBugService.updateBugReport(this.savedId, this.editBug ).subscribe((col) => {
      this.router.navigate(['bugs']);
    });
  }

  onCommentSubmit(commentForm: { value: any; valid: any; }) {
    this.editBug.comments = this.editBug.comments || [] ;
    this.editBug.comments.push(commentForm.value);
    this.editBugService.updateBugReport(this.savedId, this.editBug ).subscribe( (col) => {
      this.router.navigate(['bugs']);
    });

  }
}
