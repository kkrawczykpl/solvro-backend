import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    public name: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(
        /^(?=.*([A-Z]){1,})(?=.*[()%=+!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{6,100}$/,
        { message: 'Password isn\'t strong enought. Make sure your password contains special character, uppercase and lowercase letters.'}
    )
    public password: string;
}

export default CreateUserDto;