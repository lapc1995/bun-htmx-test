import * as database from './../database.ts';

export function getLoginScreen() {
    return (
        <div class="flex justify-center items-center h-full">
            <div class="flex flex-col justify-center items-center gap-4">
                <button class="bg-[fed766] p-4"> Login </button>
                <button class="bg-[fed766] p-4" hx-post="/register" hx-target="#app-container"> Register </button>
            </div>
        </div>
    );
}

export function getRegisterScreen(email?: string, name?: string, password?: string, confirmPassword?: string, errors?: string[]) {
    return (
        <div class="flex justify-center items-center h-full">
            <form class="flex flex-col justify-center items-center gap-4" hx-post="/registerUser" hx-target="#app-container">
                <label for="email">E-mail</label>
                <input id="email" name="email" class="border-4 border-black rounded-lg p-4" type="email" required='true' value={email != null ? email : ''}/>
                <label for="name">Name</label>
                <input id="name" name="name" class="border-4 border-black rounded-lg p-4" type="text" required='true' value={name != null ? name : ''}/>
                <label for="password">Password</label>
                <input id="password" name="password" class="border-4 border-black rounded-lg p-4" type="password" required='true' value={password != null ? password : ''}/>
                <label for="password">Confirm Password</label>
                <input id="confirm password" name="confirm password" class="border-4 border-black rounded-lg p-4" type="password" required='true' value={confirmPassword != null ? confirmPassword : ''}/>
                {
                    errors != null ? errors.map((error) => {
                        return (
                            <p class="text-red-500">{error}</p>
                        )
                    }) : ''
                }
                <button class="bg-[fed766] p-4"> Register </button>
            </form>
        </div>
    );
}

export function registerUser(email: string, name: string, password: string, confirmPassword: string) {
    const errors: string[] = [];

    if(email == null || database.getUser(email) != null) {
        errors.push('Email is invalid or already in use');
    }
    
    if(password != confirmPassword) {
        console.log(password, confirmPassword);
        errors.push('Passwords do not match');
    }

    if(errors.length > 0) {
        return getRegisterScreen(email, name, password, confirmPassword, errors);
    }

    return true;
}

