import { 
    Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users') // same as /users route
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get() // "GET /users" with optional single query param
    findUsers(@Query('isActive') isActive?: string) {
        return this.usersService.findUsers(isActive);
    }

    @Get(':id') // GET /users/:id
    findUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUser(id);
    }

    @Get('filtered') // "GET /users/filtered?role=Protagonist&name=Niko" with option role and required name query params
    findUsersWithName(@Query() query:
        { age?: 28 | 30, name: string }
    ) {
        return this.usersService.findUsersWithName(query);
    }

    @Get('active') // GET /users/interns
    findActiveUsers() {
        return this.usersService.findActiveUsers();
    }

    @Post() // POST /users
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch(':id') // PATCH /users/:id
    updateUser(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }

    @Delete(':id') // DELETE /users/:id
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
