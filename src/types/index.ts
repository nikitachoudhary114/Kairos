export interface IActivity {
  id: string;
  name: string;
  category:
    | "indoor"
    | "outdoor"
    | "food"
    | "social"
    | "relaxation"
    | "fitness"
    | "culture";
  duration: number; // in hours
  mood: "energetic" | "relaxing" | "social" | "creative" | "adventurous";
  icon: string;
  description: string;
}

export interface ScheduleItem {
  id: string;
  activity: IActivity;
  startTime: string;
  day: "saturday" | "sunday";
}

export interface WeekendPlan {
  id: string;
  name: string;
  saturday: ScheduleItem[];
  sunday: ScheduleItem[];
  createdAt: Date;
}
