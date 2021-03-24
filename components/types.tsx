interface totalCount {
    totalCount: number
}

export interface ProfileObj {
    avatarUrl: string;
    name: string;
    login: string;
    email: string;
    bio: string;
    repositories: totalCount;
    url: string;
    following: totalCount;
    followers: totalCount;
    createdAt: string;
}

interface owner {
    login: string
}

export interface RepositoryObj {
    name: string;
    owner: owner;
    description: string;
}

