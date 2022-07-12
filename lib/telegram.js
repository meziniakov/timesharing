const telegramBotAPI = process.env.TELEGRAM_BOT_TOKEN
// const telegramUserID = process.env.TELEGRAM_USER_ID

export const sendNotification = async (telegramUserID, text, parseMode) => {
  try {
    const url = `https://api.telegram.org/bot${telegramBotAPI}/sendMessage?chat_id=${telegramUserID}&text=${text}`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(telegramUserID, text, parseMode),
    })
    console.log(url, telegramUserID)
    return await res.json()
  } catch (error) {
    console.log('Ошибка:', error)
    // console.log(url, telegramUserID)
    console.log(telegramBotAPI)
    return
  }
}
