export const getVisitStatistics = async (tokenAdmin, t) => {
    try {
        const response = await fetch('/api/statistics/get-visits', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenAdmin}`
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("statisticsApi.get.500"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }

        const statistics = await response.json()
        return { success: true, statistics }
    } catch (error) {
        console.log(error.message)
        return { success: false, message: error.message }
    }
};

export const setVisitStatistics = async (t) => {
    try {
        const response = await fetch('/api/statistics/set-visits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            if (response.status === 500) throw new Error(t("statisticsApi.set.500"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }

        return { success: true, message: t("statisticsApi.set.success") }
    } catch (error) {
        console.log(error.message)
        return { success: false, message: error.message }
    }
};