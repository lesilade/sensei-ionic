import {AvailabilityModel} from './availability.model';

export class CoachingRequestModel {
    public closeBy: boolean;
    public description: string;
    public duration: Number;
    public inNetwork: boolean;
    public industry: string;
    public subtopic: string;
    public topic: string; 
    public username: string;
    public availabilities: AvailabilityModel[];

  }