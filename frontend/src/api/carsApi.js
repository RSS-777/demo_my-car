export const createNewCar = async (token, data, t) => {
    try {
        const formData = new FormData()
        for (const key in data) {
            if (data[key] && key !== 'image') {
                formData.append(key, data[key])
            }
        }

        if (data.image && data.image[0]) {
            formData.append('image', data.image[0])
        }

        const response = await fetch('/api/cars/create-car', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 409) throw new Error(t("carsApi.409"))
            if (response.status === 400) throw new Error(t("carsApi.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("carsApi.message") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getUserCars = async (token, t) => {
    try {
        const response = await fetch('/api/cars/get-cars', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const deleteUserCar = async (token, carId, image, t) => {
    try {
        const response = await fetch(`/api/cars/delete-car/${carId}?image=${encodeURIComponent(image)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 404) throw new Error(t("carsApi.404"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("carsApi.messageDelete") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};