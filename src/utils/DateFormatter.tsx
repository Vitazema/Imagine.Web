const dateFormatter = Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
})

const preciseFormatter = Intl.DateTimeFormat("en-GB", {
  dateStyle: "short",
  timeStyle: "medium",
})

export { dateFormatter, preciseFormatter }