import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users') // same as /users
export class UsersController {
    @Get() // "GET /users" with optional single query param
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return [{ role }];
    }

    @Get('filtered') // "GET /users/filtered?role=admin&name=niko" with option role and required name query params
    findAllWithName(@Query() query:
        { role?: 'INTERN' | 'ENGINEER' | 'ADMIN', name: string }
    ) {
        const { role, name } = query;
        return [{ role, name }];
    }

    @Get('interns') // GET /users/interns
    findAllInterns() {
        return [];
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Post() // POST /users
    create(@Body() user: {}) {
        console.log(user);
        return user;
    }

    @Patch(':id') // PATCH /users/:id
    findOneAndUpdate(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id') // DELETE /users/:id
    findOneAndDelete(@Param('id') id: string) {
        return { id };
    }
}
