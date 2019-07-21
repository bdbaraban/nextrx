export interface Lift {
  _id: string;
  name: string;
}

export interface Reps {
  score_type: string;
  score: string;
  minutes: number;
  description: string;
  rx: boolean;
}

export interface Time {
  score_type: string;
  score: string;
  rounds: number;
  description: string;
  rx: boolean;
}

export interface Load {
  score_type: string;
  lift: string;
  score: number;
  one_rep_max: boolean;
}

export interface Other {
  score_type: string;
  description: string;
  rx: boolean;
}

export type Movement = Reps | Time | Load | Other;

export interface Workout {
  _id: string;
  date: string;
  athlete_id: string;
  movements: Movement[];
}

export interface Athlete {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profile_image_url: string;
  created_at: string;
  last_login: string;
  affiliate: string;
  workouts: Workout[];
}
