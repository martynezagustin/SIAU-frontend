export function formatDateForInput(dateString: string) {
    const parsedDate = new Date(dateString)
    return parsedDate.toISOString().split("T")[0]
  }