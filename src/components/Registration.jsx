export function Registration() {
        return (
            <>
                    <h1>Registration</h1>
                    <p>
                            <label htmlFor="email">Email address: </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email address"
                                required
                            />
                    </p>

                    <p>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="text"
                                id="password"
                                name="password"
                                required
                            />
                    </p>
                    <p>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="username"
                                required
                            />
                    </p>

                    <p>
                            <label htmlFor="firstname">Firstname: </label>
                            <input
                                type="text"
                                id="firstname"
                                name="firstname"
                                placeholder="Firstname"
                            />
                    </p>
                    <p>
                            <label htmlFor="lastname">Lastname: </label>
                            <input
                                type="text"
                                id="lastname"
                                name="lastname"
                                placeholder="Lastname"
                            />
                    </p>
            </>
        )
}
