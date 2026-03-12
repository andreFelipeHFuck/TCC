export type FormType = 'text'
                       | 'number'
                       | 'email'
                       | 'password';

export type FormAppearance = 'outline' 
                            | 'fill';

export type FormResult = {
    email: string | null;
    password: string | null;
};
