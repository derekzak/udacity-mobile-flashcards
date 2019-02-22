import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import shortid from 'shortid'
const NOTIFICATION_KEY = 'MobileFlashcards:notifications'

export function generateUID(time = Date.now()) {
    const newUID = shortid.generate()
    return newUID
}

// export function clearLocalNotifications() {
//   return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
//     Notifications.cancelAllScheduledNotificationsAsync()
//   )
// }

// function createNotification() {
//   return {
//     title: 'Log your stats!',
//     body: "👋 don't forget to log your stats for today!",
//     ios: {
//       sounds: true
//     },
//     android: {
//       sounds: true,
//       priority: 'high',
//       sticky: false,
//       vibrate: true
//     }
//   }
// }

// export function setLocalNotification() {
//   AsyncStorage.getItem(NOTIFICATION_KEY)
//     .then(JSON.parse)
//     .then(data => {
//       if (data === null) {
//         Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
//           if (status == 'granted') {
//             Notifications.cancelAllScheduledNotificationsAsync()

//             let tomorrow = new Date()
//             tomorrow.setDate(tomorrow.getDate() + 1)
//             tomorrow.setHours(20)
//             tomorrow.setMinutes(0)

//             Notifications.scheduleLocalNotificationAsync(createNotification(), {
//               time: tomorrow,
//               repeat: 'day'
//             })

//             AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//           }
//         })
//       }
//     })
// }
