import dayjs from 'dayjs'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      timeFormat: (date: string, format: 'YYYY-MM-DD HH:mm' | 'YYYY-MM') =>
        dayjs(date).format(format),
    },
  }
})
