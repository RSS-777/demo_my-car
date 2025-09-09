export const formatDateWithoutTime = (utcDate) => {
    if(!utcDate) return ''
    
    const date = new Date(utcDate)
    return date.toLocaleDateString()
};