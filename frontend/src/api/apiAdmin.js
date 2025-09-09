export const loginAdmin = async (data, t) => {
    try {
        const response = await fetch('api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 400) throw new Error(t("adminApi.login.400"))
            if (response.status === 401) throw new Error(t("adminApi.login.401"))
            if (response.status === 403) throw new Error(t("api.loginUser.403"))
            if (response.status === 500) throw new Error(t("adminApi.login.500"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }

        const fetchData = await response.json()
        return { success: true, tokenAdmin: fetchData.tokenAdmin }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getUsersList = async (tokenAdmin, t) => {
    try {
        const response = await fetch('api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("adminApi.userList.500"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }

        const { users } = await response.json()
        return { success: true, users }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};