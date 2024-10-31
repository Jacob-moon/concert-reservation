import { PickType } from "@nestjs/swagger";
import { User } from "../../user/entities/user.entity";
import { IsNotEmpty } from "class-validator";

export class SignInDto extends PickType(User, ['email', 'password']) {
    @IsNotEmpty({ message: '이메일을 입력해 주세요.' })
    email: string;

    @IsNotEmpty({ message: '비밀번호를 입력해 주세요.' })
    password: string;
}
