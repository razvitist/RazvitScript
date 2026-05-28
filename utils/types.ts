export type ProtectionType = 'NO' | 'PASSWORD' | 'MATH' | 'MORSE' | 'TEXT';

export interface ProtectionData {
  protectionType: ProtectionType;
  password?: string;
  customText?: string;
  mathLevel: number;
  morseLength: number;
}

export interface SettingsData {
  contentScript: string;
  protection: ProtectionData;
}
