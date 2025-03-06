import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("You are not authenticated.");
    }

    if (user.role === "Admin") {
      return true;
    }

    throw new ForbiddenException("You do not have permission to perform this action.");
  }
}
