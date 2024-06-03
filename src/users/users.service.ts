import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    // users array mocking database collection
    private usersCollection = [
        {
            id: 1,
            name: "Alice Johnson",
            email: "alice.johnson@example.com",
            age: 28,
            isActive: true,
        },
        {
            id: 2,
            name: "Bob Smith",
            email: "bob.smith@example.com",
            age: 34,
            isActive: false,
        },
        {
            id: 3,
            name: "Charlie Brown",
            email: "charlie.brown@example.com",
            age: 22,
            isActive: true,
        }
    ]

    findUsers(isActive?: string) {
        let foundUsers = [];
        
        if (isActive === undefined) {
            foundUsers = this.usersCollection;
        } else {
            foundUsers = this.usersCollection.filter((user) => user.isActive.toString() === isActive);
        }

        if (!foundUsers.length) throw new NotFoundException("No users found");

        return foundUsers;
    }

    findUser(id: number) {
        const foundUser = this.usersCollection.find((user) => user.id === id);
        
        if (!foundUser) throw new NotFoundException("No user found");

        return foundUser;
    }

    findUsersWithName(query: { age?: number, name: string }) {
        const ageFilter = query.age !== undefined ? query.age : undefined;

        const foundUsers = this.usersCollection.filter((user) => {
            const matchesName = user.name.toLowerCase().includes(query.name.toLowerCase());
            const matchesAgeFilter = ageFilter === undefined || user.age === ageFilter;
            return matchesName && matchesAgeFilter;
        });

        if (!foundUsers.length) throw new NotFoundException("No users found");

        return foundUsers;
    }

    findActiveUsers() {
        const foundUsers = this.usersCollection.filter((user) => user.isActive === true);

        if (!foundUsers.length) throw new NotFoundException("No users found");

        return foundUsers;
    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = {
            id: this.usersCollection.length + 1,
            name: createUserDto.name,
            email: createUserDto.email,
            age: createUserDto.age,
            isActive: true
        }

        this.usersCollection.push(newUser);

        return `New user with id ${newUser.id} has been created`;
    }

    updateUser(id: number, updateUserDto: UpdateUserDto) {
        const foundUser = this.usersCollection.find((user) => user.id === id);

        if (!foundUser) throw new NotFoundException("No user found");

        // Update user properties
        foundUser.name = updateUserDto.name;
        foundUser.email = updateUserDto.email;
        foundUser.age = updateUserDto.age;
        foundUser.isActive = updateUserDto.isActive;

        return foundUser;
    }

    deleteUser(id: number) {
        const userIndex = this.usersCollection.findIndex((user) => user.id === id);

        if (userIndex === -1) throw new NotFoundException("No user found");

        this.usersCollection.splice(userIndex, 1);
        return `User with id ${id} has been deleted`;
    }
}
