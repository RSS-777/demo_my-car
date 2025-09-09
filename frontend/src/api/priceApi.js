export const gettingPrice = async (t) => {
    try {
        const response = await fetch('/api/prices/price', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
        }

        const fetchData = await response.json()
        return { success: true, data: fetchData.data }

    } catch (err) {
        console.error(err.message)
        return { success: false, message: err.message }
    }
};

export const changePrice = async (tokenAdmin, data, t ) => {
    try {
        const response = await fetch('/api/prices/price', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `Bearer ${tokenAdmin}`
            },
            body: JSON.stringify(data)
        })
        if (!response.ok) {
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
            if (response.status === 422) throw new Error(t("priceApi.422"))
            if (response.status === 400) throw new Error(t("priceApi.400"))
        }

        return { success: true, message: t("priceApi.success")}
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};