import { sendNotification } from '../../lib/telegram'

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
      const { telegramUserID, text, parseMode } = req.body
      console.log(telegramUserID)
      await sendNotification(telegramUserID, text, parseMode)
      res.status(200).json({ message: 'Сообщение отправлено' })
      break
    default:
      res.status(405).end('Данный метод не поддерживается')
  }
}
export default handler
