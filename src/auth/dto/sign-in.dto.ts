// import { PickType } from "@nestjs/swagger"
// import { User } from "../../user/entities/user.entity"
// import { IsNotEmpty, IsStrongPassword } from "class-validator";

// export class SignInDto extends PickType(User,
//     [
//         'email',
//         'password',
//         'nickname',
//     ])
//     {
//         @IsNotEmpty({message:'비밀번호 확인을 입력해 주세요.'})
//         @IsStrongPassword(
//             {},
//             {
//                 message:
//                 '비밀번호는 영문 알파벳 대,소문자,숫자,특수문자(!@#$%^&*)를 입력해주세요'
//             }
//             ,)
//         passwordConfirm:string;

//     }

import { PickType } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { IsNotEmpty } from "class-validator";

export class SignInDto extends PickType(User, ['email', 'password']) {
    @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
    email: string;

    @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
    password: string;
}
