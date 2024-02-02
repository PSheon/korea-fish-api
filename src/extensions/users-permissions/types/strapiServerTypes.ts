export interface IAdvancedSettings {
  unique_email: boolean;
  allow_register: boolean;
  email_confirmation: boolean;
  email_reset_password?: string;
  email_confirmation_redirection: string;
  default_role: string;
}

export interface IResetPasswordSettings {
  from: {
    name: string;
    email: string;
  };
  response_email: string;
  object: string;
  message: string;
}
