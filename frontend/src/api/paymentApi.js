export const getInfoPayment = async (lang, t) => {
    try {
        const response = await fetch(`/api/payments/payment?lang=${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 404) throw new Error(t("paymentApi.404"))
        }

        const dataFetch = await response.json()
        return { success: true, data: dataFetch.data[0] }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const setInfoPayment = async (tokenAdmin, dataPayment, t) => {
    try {
        const response = await fetch('/api/payments/payment', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(dataPayment)
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 400) throw new Error(t("api.loginUser.cannotEmpty"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("paymentApi.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getBlockStatusMessage = async (t) => {
    try {
        const response = await fetch('/api/payments/get-block-message', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 404) throw new Error(t("paymentApi.blockStatusMessage.get.404"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const data = await response.json()
        return { success: true, data }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message }
    }
};

export const updateBlockStatusMessage = async (tokenAdmin, data, t) => {
    try {
        const response = await fetch('/api/payments/update-block-message', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify({data})
        })
        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 404) throw new Error(t("paymentApi.blockStatusMessage.update.404"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }
        return { success: true, message: t("paymentApi.blockStatusMessage.update.success") }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message }
    }
};

export const getPaymentActive = async ( lang, t) => {
    try {
        const response = await fetch(`/api/payments/get-active-payment?lang=${lang}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 400) throw new Error(t("advertisingApi.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        const dataFetch = await response.json()
        return { success: true, data: dataFetch[0] }
    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message }
    }
};