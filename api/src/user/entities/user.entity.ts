export class User {
    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        role: string,
        avatarUrl: string,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.avatarUrl = avatarUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    avatarUrl: string;
    createdAt: Date;
    updatedAt: Date;

    static Builder(): UserBuilder {
        return new UserBuilder();
    }
}

export class UserBuilder {
    private _id: string;
    private _name: string;
    private _role: string;
    private _email: string;
    private _password: string;
    private _avatarUrl: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    setId(id: string): UserBuilder {
        this._id = id;
        return this;
    }

    setName(name: string): UserBuilder {
        this._name = name;
        return this;
    }

    setRole(role: string): UserBuilder {
        this._role = role;
        return this;
    }

    setEmail(email: string): UserBuilder {
        this._email = email;
        return this;
    }

    setPassword(password: string): UserBuilder {
        this._password = password;
        return this;
    }

    setAvatarUrl(avatarUrl: string): UserBuilder {
        this._avatarUrl = avatarUrl;
        return this;
    }

    setCreatedAt(createdAt: Date): UserBuilder {
        this._createdAt = createdAt;
        return this;
    }

    setUpdatedAt(updatedAt: Date): UserBuilder {
        this._updatedAt = updatedAt;
        return this;
    }

    build(): User {
        if (!this._email || !this._password || !this._name) {
            throw new Error("User email, password and name are required");
        }
        return new User(
            this._id,
            this._name,
            this._email,
            this._password,
            this._role,
            this._avatarUrl,
            this._createdAt,
            this._updatedAt
        );
    }
}
