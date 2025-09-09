export const sendConfirmationCode = async (email, t) => {
    try {
        const response = await fetch('/api/users/send-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 400) throw new Error(t("api.sendConfirmationCode.emailAlready"))
            if (response.status === 500) throw new Error(t("api.sendConfirmationCode.unableSendCode"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("api.sendConfirmationCode.successSent") }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message };
    }
};

export const validateConfirmationCode = async (email, confirmationCode, t) => {
    try {
        const response = await fetch('/api/users/validate-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, confirmationCode })
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 404) throw new Error(t("api.validateConfirmationCode.notThisEmail"))
            if (response.status === 403) throw new Error(t("api.validateConfirmationCode.incorrectCode"))
            throw new Error(errorData.message || t("carsApi.unknownError"));
        }

        return { success: true, message: t("api.validateConfirmationCode.successSent") }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message };
    }
};

export const registrationUser = async (data, t) => {
    try {
        const response = await fetch('/api/users/registration', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("api.registrationUser.insideError"))
            if (response.status === 409) throw new Error(t("api.registrationUser.userAlready"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const dataResp = await response.json()
        return {
            success: true,
            message: t("api.registrationUser.succsesRegistr"),
            data: dataResp.data
        }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message }
    }
};

export const getUserData = async (token, t) => {
    try {
        const response = await fetch('/api/users/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t('api.getUserData.errorServer'))
            if (response.status === 404) throw new Error(t('api.getUserData.noUserFound'))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const data = await response.json()
        return { success: true, data: data }

    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getUserTariff = async (token, t) => {
    try {
        const response = await fetch('/api/users/user-tariff', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t('api.getUserData.errorServer'))
            if (response.status === 404) throw new Error(t('api.getUserData.noUserFound'))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const tariff = await response.json()
        return { success: true, data: tariff }

    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const loginUser = async (data, t) => {
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 400) throw new Error(t("api.loginUser.cannotEmpty"))
            if (response.status === 500) throw new Error(t("api.loginUser.errorServer"))
            if (response.status === 401) {
                if (errorData.message.includes("Невірний емейл або пароль.")) {
                    throw new Error(t("api.loginUser.errorMessage"))
                } else {
                    throw new Error(t("api.loginUser.403"))
                }
            }
            if (response.status === 403) throw new Error(t("api.loginUser.403"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const { token, tariff } = await response.json()
        return { success: true, token, tariff }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const changeProfile = async (token, data, existingImagePath, t) => {
    try {
        const formData = new FormData()
        formData.append('firstName', data.firstName)
        formData.append('lastName', data.lastName)

        if (data.image && data.image[0]) {
            formData.append('image', data.image[0])
        }

        if (existingImagePath !== null) {
            formData.append('existingImagePath', existingImagePath)
        }

        const response = await fetch('/api/users/change-profile', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("api.changeProfile.500"))
            if (response.status === 502) throw new Error(t("api.changeProfile.502"))
            if (response.status === 400) throw new Error(t("api.changeProfile.400"))
            if (response.status === 404) throw new Error(t("api.changeProfile.404"))
            if (response.status === 413) throw new Error(t("api.changeProfile.413"))
            if (response.status === 422) throw new Error(t("api.changeProfile.422"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("api.changeProfile.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const changePassword = async (token, data, t) => {
    try {
        const response = await fetch('/api/users/change-password', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("api.changeProfile.500"))
            if (response.status === 409) throw new Error(t("api.changePassword.409"))
            if (response.status === 404) throw new Error(t("api.changePassword.404"))
            if (response.status === 400) throw new Error(t("api.changePassword.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("api.changePassword.200") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const deleteUser = async (token, password, t) => {
    try {
        const response = await fetch('/api/users/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ password })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 404) throw new Error(t("api.changePassword.404"))
            if (response.status === 500) throw new Error(t("api.deleteUser.500"))
            if (response.status === 400) throw new Error(t("api.deleteUser.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("api.deleteUser.200") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};