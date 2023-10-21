export interface Company {
  name: string;
  logo?: string;
}

export interface CompanyContributing extends Company {
  contribution: number;
}
