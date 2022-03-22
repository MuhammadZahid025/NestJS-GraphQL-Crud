import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";

@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
    ) {
        super({
            secretOrKey: "secret123",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload) {

        return payload
    }
}