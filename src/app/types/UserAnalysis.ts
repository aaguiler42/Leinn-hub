export interface Skills {
  leadership: number;
  innovation: number;
  enterpreneurship: number;
  teamwork: number;
  goodPerson: number;
  commitment: number;
  resilience: number;
}

export interface UserAnalysis extends Partial<Skills> {
  analysis?: string;
}
