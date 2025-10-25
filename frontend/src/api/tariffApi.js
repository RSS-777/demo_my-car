export const requestTariffChange = async (token, selectTariff, generateCodeRandom, paymentMonths, newAmountDue, t) => {
    try {
        const response = await fetch('/api/tariff/change-request', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ tariff: selectTariff, orderCode: generateCodeRandom, paymentMonths, amountDue: newAmountDue })
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 400) throw new Error(t("tariffApi.request.400"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("tariffApi.request.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const cancelTariffChangeRequest = async (token, generateCodeRandom, t) => {
    try {
        const response = await fetch('/api/tariff/cancel-request', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ orderCode: generateCodeRandom })
        })

        if (!response.ok) {
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
        }

        return { success: true, message: t("tariffApi.cancel.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getAllTariffs = async (tokenAdmin, t) => {
    try {
        const response = await fetch('/api/tariff/get-tariffs', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        if (response.status === 204) {
            return { success: true, data: [] }
        }

        const fetchData = await response.json()
        return { success: true, data: fetchData.data }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};






