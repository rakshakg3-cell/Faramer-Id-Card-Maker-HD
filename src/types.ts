
export interface LandRecord {
  district: string;
  taluka: string;
  village: string;
  surveyNumber: string;
}

export interface FarmerData {
  fullNameEnglish: string;
  fullNameMarathi: string;
  dob: string;
  gender: string;
  whatsapp: string;
  aadhaar: string;
  farmerId: string;
  address: string;
  photo: string | null;
  landRecords: LandRecord[];
}

export enum PaymentStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}
