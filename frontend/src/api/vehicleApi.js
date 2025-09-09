export const createVehicleRepair = async (formData, t) => {
    try {
        const response = await fetch('/api/vehicles/create-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 400) throw new Error(t("vehicleApi.400"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }
        return { success: true, message: t("vehicleApi.create.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const updateVehicleRepair = async (data, t) => {
    try {
        const response = await fetch('/api/vehicles/update-entry', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        })
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 400) throw new Error(t("vehicleApi.400"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }
        return { success: true, message: t("vehicleApi.update.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const deleteVehicleRepair = async (repairId, t) => {
    try {
        const response = await fetch(`/api/vehicles/delete-entry/${repairId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 404) throw new Error(t("vehicleApi.delete.404"))
            if (response.status === 400) throw new Error(t("vehicleApi.delete.400"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }
        return { success: true, message: t("vehicleApi.delete.success") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};

export const getVehicleRepair = async (carId, t) => {
    try {
        const response = await fetch(`/api/vehicles/get-entry/${carId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 500) throw new Error(t("vehicleApi.500"))
            if (response.status === 400) throw new Error(t("vehicleApi.get.400"))
            throw new Error(errorData.message || t("vehicleApi.unknown"))
        }
        const fetchData =  await response.json()
        return { success: true, data: fetchData.data }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: error.message }
    }
};