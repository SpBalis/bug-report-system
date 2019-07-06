import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bugs } from '../get-bug/bug.model';
import { InsertBugService } from './insert-bug.service';

@Component({
  selector: 'app-insert-bug',
  templateUrl: './insert-bug.component.html',
  styleUrls: ['./insert-bug.component.css']
})
export class InsertBugComponent implements OnInit {
  isSubmitted = false;
  date = new Date();
  newBug: Bugs = {
    title: '',
    description: '',
    priority: null,
    reporter: null,
    status: null,
    createdAt: this.date.toString()
  };

  selectedPriority = null;
  selectedStatus = null;
  selectedReporter = null;

  priorityOptions = [
    { key: 1, priority: 'Critical' },
    { key: 2, priority: 'Major' },
    { key: 3, priority: 'Minor' }
  ];

  reporterOptions = [
    { key: 'QA', reporter: 'QA' },
    { key: 'PO', reporter: 'PO' },
    { key: 'DEV', reporter: 'DEV' }
  ];

  statusOptions = [
    { key: 'Ready for test', status: 'Ready for test' },
    { key: 'Done', status: 'Done' },
    { key: 'Rejected', status: 'Rejected' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private insertBugService: InsertBugService) { }

  ngOnInit() {
  }
  onUpdate(insertform) {
    this.newBug.priority = insertform.priority;
    this.newBug.reporter = insertform.reporter;
    this.newBug.status = insertform.statuss;
    console.log(this.newBug);
    this.insertBugService.createBugReport(this.newBug);
    this.router.navigate(['bugs']);
    this.isSubmitted = true;
  }
}
