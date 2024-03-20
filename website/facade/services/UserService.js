import APIProvider from "../utilities/APIProvider.js";

const UserService = (async () => {
    const apiProvider = await APIProvider();

    return {
        show: async (id, cookies) => {
            try {
                const user = await apiProvider.get(`/users/${id}`, {
                    headers: {
                        Cookie: cookies
                    }
                });

                return user.data?.user || {};
            } catch (error) {
                throw error;
            }
        },

        create: async (user) => {
            try {
                const formData = new FormData();

                Object.keys(user).forEach(key => {
                    formData.append(key, user[key]);
                });

                await apiProvider.post("/users", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                throw error;
            }
        },

        update: async (id, user) => {
            try {
                const formData = new FormData();

                Object.keys(user).forEach(key => {
                    formData.append(key, user[key]);
                });

                await apiProvider.put(`/users/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } catch (error) {
                throw error;
            }
        },

        authenticate: async (user) => {
            try {
                const response = await apiProvider.post("/users/authenticate", user);

                return { headers: response.headers, data: response.data?.user };
            } catch (error) {
                throw error;
            }
        },

        logout: async (cookies) => {
            try {
                await apiProvider.post("/users/logout", {}, {
                    headers: {
                        Cookie: cookies
                    }
                });
            } catch (error) {
                throw error;
            }
        }
    };
})();

export default UserService;