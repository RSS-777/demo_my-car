export const sendMessage = async (data, t) => {
    try {
        const response = await fetch('/api/feedback/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            if (response.status === 500) throw new Error(t("tariffApi.request.500"))
        }

        return { success: true, message: t("sendMessageApi.200") }
    } catch (error) {
        console.error(error.message)
        return { success: false, message: t("sendMessageApi.sendError") }
    }
};