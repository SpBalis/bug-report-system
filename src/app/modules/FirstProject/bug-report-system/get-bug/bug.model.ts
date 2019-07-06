//Above is the model for every bug
export interface Bugs {
  id?: string;
  title?: string;
  description?: string;
  priority?: number;
  reporter?: string;
  status?: string;
  createdAt?: string;
  comments?: BugComment[];
}

//Above is the model for every comment at each bug
export interface BugComment {
  reporter: string;
  description: string;
}

//Above is our model for the search navigation
export interface SearchBugModel {
  title?: string;
  priority?: string;
  reporter?: string;
  status?: string;
}
