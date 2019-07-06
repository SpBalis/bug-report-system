import { Component, OnInit } from '@angular/core';
import { GetBugService } from './get-bug.service';
import { Bugs, SearchBugModel } from './bug.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-get-bug',
  templateUrl: './get-bug.component.html',
  styleUrls: ['./get-bug.component.css']
})
export class GetBugComponent implements OnInit {
  bugs: Bugs[] = [];
  // bugsNext and bugsNextSorted are being used in pagination, to check if the next page has bugs.
  bugsNext: Bugs[] = [];
  bugsNextSorted: Bugs[] = [];
  //
  searchedBug: SearchBugModel = {
    title: '',
    priority: '',
    reporter: '',
    status: ''
  };
  savedId: any;
  sortByVar: string;
  sortingDirection = 'asc';
  page: number;
  trueIfNotSorted = true;
  trueIfNotSearched = true;
  trueIfSearchedNotSorted = true;
  filterIconClicked = false;

  selectedPriority = '';
  selectedReporter = '';
  selectedStatus = '';

  priorityOptions = [
    { key: 1, name: 'Critical' },
    { key: 2, name: 'Major' },
    { key: 3, name: 'Minor', }
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

  constructor(private getBugService: GetBugService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.savedId = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.page = 0;
    this.getBugService.getBugReport(this.page).subscribe((data) => {
      this.bugs = data;
      this.bugsNext = data;
    });
  }

  onChangePriority(e) {
    this.searchedBug.priority = e;
    this.selectedPriority = e;
  }

  onChangeReporter(e) {
    this.searchedBug.reporter = e;
    this.selectedReporter = e;
  }

  onChangeStatus(e) {
    this.searchedBug.status = e;
    this.selectedStatus = e;
  }

  sort(sortBy: string) {
    this.page = 0;
    if (this.sortingDirection === 'asc') {
      this.sortingDirection = 'desc';
    } else {
      this.sortingDirection = 'asc';
    }
    this.sortByVar = sortBy;
    if (this.trueIfNotSearched) {
      this.getBugService.getBugReportSorted(sortBy, this.sortingDirection, this.page).subscribe((data) => {
        this.bugs = data;
        this.bugsNextSorted = data;
      });
    } else {
      this.getBugService.getSearchedBugSorted(sortBy, this.sortingDirection, this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
        this.bugs = data;
        this.bugsNextSorted = data;
        this.trueIfSearchedNotSorted = false;
      });
    }
    this.trueIfNotSorted = false;
  }

  editBugMethod(id) {
    this.router.navigate(['edit', id]);
  }

  insertBug() {
    this.router.navigate(['insert']);
  }

  deleteBugMethod(id) {
    this.getBugService.deleteBug(id).subscribe((data) => {
      for (let i = 0; i < this.bugs.length; ++i) {
        if (this.bugs[i].id === id) {
          this.bugs.splice(i, 1);
          if (this.trueIfNotSorted && this.trueIfNotSearched) {
            this.getBugService.getBugReport(this.page).subscribe((data) => {
              this.bugs = data;
              this.bugsNext = data;
            });
          } else if (!this.trueIfNotSorted && this.trueIfNotSearched) {
            this.getBugService.getBugReportSorted(this.sortByVar, this.sortingDirection, this.page).subscribe((data) => {
              this.bugs = data;
              this.bugsNextSorted = data;
              this.trueIfNotSorted = false;
            });
          } else if (!this.trueIfNotSearched && this.trueIfSearchedNotSorted) {
            this.getBugService.getSearchedBug(this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
              this.bugs = data;
              this.bugsNext = data;
              this.trueIfNotSearched = false;
            });
          } else if (!this.trueIfNotSearched && !this.trueIfSearchedNotSorted) {
            this.getBugService.getSearchedBugSorted(this.sortByVar, this.sortingDirection, this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
              this.bugs = data;
              this.bugsNextSorted = data;
              this.trueIfNotSorted = false;
              this.trueIfNotSearched = false;
            });
          }
        }
      }
    });
  }

  onSubmit(searchForm: { value: any; valid: any; }) {
    this.sortingDirection = '';
    this.page = 0;
    this.getBugService.getSearchedBug(this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
      this.bugs = data;
      this.bugsNext = data;
    });
    this.trueIfNotSearched = false;
    // this.toggleBtn = false;
  }

  removeFilters() {
    // this.toggleBtn = true;
    this.page = 0;
    this.getBugService.getBugReport(this.page).subscribe((data) => {
      this.bugs = data;
      this.bugsNext = data;
      this.searchedBug.title = '';
      this.searchedBug.priority = '';
      this.searchedBug.reporter = '';
      this.searchedBug.status = '';
      this.selectedPriority = '';
      this.selectedReporter = '';
      this.selectedStatus = '';
    });
    this.trueIfNotSearched = true;
    this.trueIfSearchedNotSorted = true;
    this.sortingDirection = '';
  }

  nextPage() {
    // The next condition checks if sort method has been called, so to do the pagination due to sorting or not
    if (this.trueIfNotSorted && this.trueIfNotSearched) {
      this.getBugService.getBugReport(this.page + 1).subscribe((data) => {
        this.bugsNext = data;
        if (Object.keys(this.bugsNext).length > 0 && Object.keys(this.bugs).length === 10) {
          this.page += 1;
          this.getBugService.getBugReport(this.page).subscribe((data) => {
            this.bugs = data;
          });
        }
      });
    } else if (!this.trueIfNotSorted && this.trueIfNotSearched) {
      // When bugs are sorted
      this.getBugService.getBugReportSorted(this.sortByVar, this.sortingDirection, this.page + 1).subscribe((data) => {
        this.bugsNextSorted = data;
        if (Object.keys(this.bugsNextSorted).length > 0 && Object.keys(this.bugs).length === 10) {
          this.page += 1;
          this.getBugService.getBugReportSorted(this.sortByVar, this.sortingDirection, this.page).subscribe((data) => {
            this.bugs = data;
          });
        }
      });
    } else if (!this.trueIfNotSearched && this.trueIfSearchedNotSorted) {
      this.getBugService.getSearchedBug(this.page + 1, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
        this.bugsNext = data;
        if (Object.keys(this.bugsNext).length > 0 && Object.keys(this.bugs).length === 10) {
          this.page += 1;
          this.getBugService.getSearchedBug(this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
            this.bugs = data;
          });
        }
      });
    } else if (!this.trueIfNotSearched && !this.trueIfSearchedNotSorted) {
      this.getBugService.getSearchedBugSorted(this.sortByVar, this.sortingDirection, this.page + 1, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
        this.bugsNext = data;
        if (Object.keys(this.bugsNext).length > 0 && Object.keys(this.bugs).length === 10) {
          this.page += 1;
          this.getBugService.getSearchedBugSorted(this.sortByVar, this.sortingDirection, this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
            this.bugs = data;
          });
        }
      });
    }
  }

  previousPage() {
    // The next condition checks if sort method has been called, so to do the pagination due to sorting or not
    if (this.trueIfNotSorted && this.trueIfNotSearched) {
      if (this.page > 0) {
        this.page -= 1;
      }
      this.getBugService.getBugReport(this.page).subscribe((data) => {
        this.bugs = data;
      });
    } else if (!this.trueIfNotSorted && this.trueIfNotSearched) {
      if (this.page > 0) {
        this.page -= 1;
      }
      this.getBugService.getBugReportSorted(this.sortByVar, this.sortingDirection, this.page).subscribe((data) => {
        this.bugs = data;
      });
    } else if (!this.trueIfNotSearched && this.trueIfSearchedNotSorted) {
      if (this.page > 0) {
        this.page -= 1;
      }
      this.getBugService.getSearchedBug(this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
        this.bugs = data;
      });
    } else if (!this.trueIfNotSearched && !this.trueIfSearchedNotSorted) {
      if (this.page > 0) {
        this.page -= 1;
      }
      this.getBugService.getSearchedBugSorted(this.sortByVar, this.sortingDirection, this.page, this.searchedBug.title, this.searchedBug.priority, this.searchedBug.reporter, this.searchedBug.status).subscribe((data) => {
        this.bugs = data;
      });
    }
  }
  showFilterForm() {
    if (!this.filterIconClicked) {
      this.filterIconClicked = true;
    } else {
      this.filterIconClicked = false;
    }
  }
}
