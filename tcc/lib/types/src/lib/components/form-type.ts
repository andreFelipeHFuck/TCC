export type FormType = 'text'
                       | 'email'
                       | 'password';

export type FormAppearance = 'outline' 
                            | 'fill';

export type FormResult = {
    email: string | null;
    password: string | null;
};
