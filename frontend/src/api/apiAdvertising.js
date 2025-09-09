export const getAdvertising = async (t, lang) => {
    try {
        const response = await fetch(`/api/advertising/getAdvertising/${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const dataError = await response.json()
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 404) throw new Error(t("advertisingApi.404"))
            if (response.status === 400) throw new Error(t("advertisingApi.400"))
            throw new Error(dataError.message || t("vehicleApi.unknown"))
        }

        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error(error.message)
        return { success: false, error: error.message }
    }
};

export const getAdvertisingAll = async (t) => {
    try {
        const response = await fetch(`/api/advertising/getAdvertising-all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            const dataError = await response.json()
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            throw new Error(dataError.message || t("vehicleApi.unknown"))
        }

        const data = await response.json()
        return { success: true, data }
    } catch (error) {
        console.error(error.message)
        return { success: false, error: error.message }
    }
};

export const updateAdvertising = async (tokenAdmin, data, t) => {
    try {
        const response = await fetch(`/api/advertising/updateAdvertising`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const dataError = await response.json()
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 400) throw new Error(t("advertisingApi.update.400"))
            throw new Error(dataError.message || t("vehicleApi.unknown"))
        }

        return { success: true, message: t("advertisingApi.update.200") }
    } catch (error) {
        console.error(error.message)
        return { success: false, error: error.message }
    }
};