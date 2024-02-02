export type UserType = {
  id: number;
  username?: string;
  email?: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role?: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  address: string;
  isHighlighted: boolean;
  createdAt: string;
  updatedAt: string;
};
