import { Injectable } from '@nestjs/common';

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
        }

        foundUsers = this.usersCollection.filter((user) => user.isActive.toString() === isActive);

        if (foundUsers.length) {
            return foundUsers;
        }

        return "No users found";
    }

    findUser(id: string) {
        const foundUser = this.usersCollection.find((user) => user.id === +id);
        if (foundUser) {
            return foundUser;
        }

        return "No user found";
    }

    findUsersWithName(query: { isActive?: string, name: string }) {
        const isActiveBool = query.isActive !== undefined ? query.isActive === 'true' : undefined;

        const foundUsers = this.usersCollection.filter((user) => {
            const matchesName = user.name.toLowerCase().includes(query.name.toLowerCase());
            const matchesIsActive = isActiveBool === undefined || user.isActive === isActiveBool;
            return matchesName && matchesIsActive;
        });

        if (foundUsers.length) {
            return foundUsers;
        }

        return "No users found";
    }

    findActiveUsers() {
        const foundUsers = this.usersCollection.filter((user) => user.isActive === true);

        if (foundUsers.length) {
            return foundUsers;
        }

        return "No users found";
    }

    createUser(user: { name: string, email: string, age: number }) {
        const newUser = {
            id: this.usersCollection.length + 1,
            name: user.name,
            email: user.email,
            age: user.age,
            isActive: true
        }

        this.usersCollection.push(newUser);

        return `New user with id ${newUser.id} has been created`;
    }

    updateUser(id: number, userUpdate: { name: string, email: string, age: number, isActive: boolean }) {
        const foundUser = this.usersCollection.find((user) => user.id === id);

        if (!foundUser) {
            return "No user found";
        }

        // Update user properties
        foundUser.name = userUpdate.name;
        foundUser.email = userUpdate.email;
        foundUser.age = userUpdate.age;
        foundUser.isActive = userUpdate.isActive;

        return foundUser;
    }

    deleteUser(id: number) {
        const userIndex = this.usersCollection.findIndex((user) => user.id === id);

        if (userIndex === -1) {
            return "No user found";
        }

        this.usersCollection.splice(userIndex, 1);
        return `User with id ${id} has been deleted`;
    }
}
