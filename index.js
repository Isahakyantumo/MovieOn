const TelegramBot = require('node-telegram-bot-api')

const token = '7390740847:AAFFtUPuHush4C7HpZhVrP8bnHDqVDuQtZw'

const bot = new TelegramBot(token, {polling: true})

let index
let inline_keyboard

const expressions = [
  "5 + 3",
  "10 + 7",
  "6 + 9",
  "2 + 8",
  "4 + 5",
  "11 + 6",
  "13 + 14",
  "7 + 8",
  "9 + 12",
  "3 + 6",
  "15 + 3",
  "10 + 5",
  "8 + 4",
  "12 + 11",
  "14 + 7",
  "1 + 2",
  "17 + 3",
  "18 + 2",
  "20 + 1",
  "19 + 5"
];

const options = [
  ['7', '9', '8', '10'], // 5 + 3 = 8
  ['17', '16', '18', '19'], // 10 + 7 = 17
  ['14', '17', '16', '15'], // 6 + 9 = 15
  ['9', '10', '11', '12'], // 2 + 8 = 10
  ['8', '9', '10', '11'], // 4 + 5 = 9
  ['16', '17', '18', '19'], // 11 + 6 = 17
  ['26', '27', '28', '29'], // 13 + 14 = 27
  ['14', '15', '16', '17'], // 7 + 8 = 15
  ['20', '21', '22', '23'], // 9 + 12 = 21
  ['8', '9', '10', '11'], // 3 + 6 = 9
  ['17', '18', '19', '20'], // 15 + 3 = 18
  ['14', '15', '16', '17'], // 10 + 5 = 15
  ['11', '12', '13', '14'], // 8 + 4 = 12
  ['22', '23', '24', '25'], // 12 + 11 = 23
  ['20', '21', '22', '23'], // 14 + 7 = 21
  ['2', '3', '4', '5'], // 1 + 2 = 3
  ['19', '20', '21', '22'], // 17 + 3 = 20
  ['19', '20', '21', '22'], // 18 + 2 = 20
  ['20', '21', '22', '23'], // 20 + 1 = 21
  ['23', '24', '25', '26'] // 19 + 5 = 24
]

const answer = [
  8, 17, 15, 10, 9, 17, 27, 15, 21, 9, 
  18, 15, 12, 23, 21, 3, 20, 20, 21, 24
]

const commands = [
  {
    command: 'start',
    description: 'Վերագործարկել Բոտը'
  }
]

bot.setMyCommands(commands)

let keyboard = [
  ['Դրամա', 'Կոմեդիա', 'Մարտաֆիլմ'],
  // ['Մելոդրամա','Արկածային','Ընտանեկան'],
  // ['','',''],
  // ['Կենսագրական','Զինվորական','Պատմական']
]

const drama = [766, 776, 787, 791, 802, 819, 824, 828, 840, 845]
const komedia = [739, 755, 761, 766, 811, 816, 819, 821, 915, 972]
const martafilm = [672, 732, 787, 791, 800, 814, 816, 819, 824, 851]

bot.on('message', (msg) => {
  const chatId = msg.chat.id

  if (msg.text === '/start') {
    index = Math.floor(Math.random() * expressions.length)
    inline_keyboard = [
      [
        { text: options[index][0], callback_data: options[index][0]},
        { text: options[index][1], callback_data: options[index][1]},
        { text: options[index][2], callback_data: options[index][2]},
        { text: options[index][3], callback_data: options[index][3]}
      ]
    ]
    bot.sendMessage(chatId, "Անվտանգության ստուգում` " + expressions[index], {
      reply_markup: { inline_keyboard }
    })
  }
})

bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id
  const { chat, message_id, text } = query.message

  if (+query.data == answer[index]) {
    bot.deleteMessage(chat.id, message_id)
    bot.sendMessage(chatId, 'Ընտրիր քեզ հետաքրքրող ֆիլմի ժանրը:\n\nԲոտը պատահականության սկզբունքով քեզ կուղարկի այդ ժանրից մի ֆիլմ:', {
      reply_markup: {keyboard, resize_keyboard: true }
    })
  } else {
    bot.sendMessage(chatId, 'Սխալ է, փորձիր կրկին` ' + expressions[index], {
      reply_markup: { inline_keyboard }
    })
    index = Math.floor(Math.random() * expressions.length)
    inline_keyboard = [
      [
        { text: options[index][0], callback_data: options[index][0]},
        { text: options[index][1], callback_data: options[index][1]},
        { text: options[index][2], callback_data: options[index][2]},
        { text: options[index][3], callback_data: options[index][3]}
      ]
    ]
    bot.deleteMessage(chat.id, message_id)
  }

  bot.answerCallbackQuery(query.id)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id

  if (msg.text == 'Դրամա') {
    randdrama = Math.floor(Math.random() * drama.length)

    bot.sendMessage(chatId, 'https://t.me/hayerenfilm/' + drama[randdrama])

  } else if (msg.text == 'Կոմեդիա') {
    randkomedia = Math.floor(Math.random() * komedia.length)

    bot.sendMessage(chatId, 'https://t.me/hayerenfilm/' + komedia[randkomedia])
    
  } else if (msg.text == 'Մարտաֆիլմ'){
    randmartafilm = Math.floor(Math.random() * martafilm.length)

    bot.sendMessage(chatId, 'https://t.me/hayerenfilm/' + martafilm[randmartafilm])
  
  }
})

