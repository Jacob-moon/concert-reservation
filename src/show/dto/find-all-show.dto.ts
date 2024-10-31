import { ShowCategory } from "../types/show-category.type";
import { IsEnum, IsOptional, IsString } from "class-validator";

export class findAllShowDto {
    /**
     * 공연 목록 조회(검색)
     * @returns
     */

    @IsOptional()
    @IsString()
    keyword?: string;

    /**
     * 공연 상세 조회
     * @param showId
     * @returns
     */

    @IsOptional()
    @IsEnum(ShowCategory)
    category?: ShowCategory;
}