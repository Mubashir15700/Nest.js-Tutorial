import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // same as /users route
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get() // "GET /users" with optional single query param
    findUsers(@Query('isActive') isActive?: string) {
        return this.usersService.findUsers(isActive);
    }

    @Get(':id') // GET /users/:id
    findUser(@Param('id') id: string) {
        return this.usersService.findUser(id);
    }

    @Get('filtered') // "GET /users/filtered?role=Protagonist&name=Niko" with option role and required name query params
    findUsersWithName(@Query() query:
        { role?: 'Protagonist' | 'Cousin', name: string }
    ) {
        return this.usersService.findUsersWithName(query);
    }

    @Get('active') // GET /users/interns
    findActiveUsers() {
        return this.usersService.findActiveUsers();
    }

    @Post() // POST /users
    createUser(@Body() user: { name: string, email: string, age: number }) {
        return this.usersService.createUser(user);
    }

    @Patch(':id') // PATCH /users/:id
    updateUser(@Param('id') id: string, @Body() userUpdate: { name: string, email: string, age: number, isActive: boolean }) {
        return this.usersService.updateUser(+id, userUpdate);
    }

    @Delete(':id') // DELETE /users/:id
    deleteUser(@Param('id') id: string) {
        return this.usersService.deleteUser(+id);
    }
}
