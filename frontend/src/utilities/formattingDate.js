import { formatDistanceToNow, parseISO } from "date-fns"
import moment from "moment"

export const formattingDate = (timestamp) => {
	const date = parseISO(timestamp)
	const timePeriod = formatDistanceToNow(date)
	return `${timePeriod} ago`
}

export const momentDate = (timestamp) => {
	return moment().parseZone(timestamp).format("MMMM/YYYY/DD")
}
