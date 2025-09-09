export const createCarNotes = async (userId, carId, text, t) => {
    try {
        const response = await fetch('/api/notes/create-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userId}`
            },
            body: JSON.stringify({ text, carId })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 400) throw new Error(t("postsApi.400"))
            if (response.status === 422) throw new Error(t("formContact.input.required"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("vehicleApi.create.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getCarNotes = async (userId, carId, t) => {
    try {
        const response = await fetch(`/api/notes/get-note?carId=${carId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userId}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 400) throw new Error(t("postsApi.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }
        const postsData = await response.json()

        if (postsData.length === 0) {
            return { success: true, post: null }
        }

        return { success: true, post: postsData[0] }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const updateCarNotes = async (userId, carId, text, t) => {
    try {
        const response = await fetch('/api/notes/update-note', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userId}`
            },
            body: JSON.stringify({ text, carId })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 422) {
                if(errorData.error === 'Поле не може бути порожнім') {
                    throw new Error(t("formContact.input.required"))
                } else {
                     throw new Error(t("postsApi.422"))
                }
            } 
            if (response.status === 404) throw new Error(t("vehicleApi.delete.404"))
            if (response.status === 400) throw new Error(t("postsApi.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("vehicleApi.update.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const deleteCarNotes = async (userId, carId, t) => {
    try {
        const response = await fetch('/api/notes/delete-note', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userId}`
            },
            body: JSON.stringify({ carId })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 404) throw new Error(t("vehicleApi.delete.404"))
            if (response.status === 400) throw new Error(t("postsApi.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("vehicleApi.delete.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};