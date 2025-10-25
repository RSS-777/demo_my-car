export const changeStatusOrder = async (tokenAdmin, data, t) => {
    try {
        const response = await fetch('/api/orders/change-status', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            throw new Error(errorData.message || t("carsApi.unknownError"))
        }

        return { success: true, message: t("tariffApi.status.200") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const deleteOrderRequest = async (tokenAdmin, data, t) => {
    try {
        const response = await fetch('/api/orders/delete-request', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(data)
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