// const express = require('express')
// const path = require('path')
// const PORT = process.env.PORT || 5000

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))


const https = require('https');
const request = require('request');
const Telegraf = require('telegraf')
const config = require('./config.json')
const utf8 = require('utf8')
const chatId = null;
const bot = new Telegraf(config.token)
var SettingsObj = {day: true, timing: true}

var ChatsArr = [];

bot.start((ctx) => {
  console.log(ChatsArr);
  if(ChatsArr.indexOf(ctx.from.id) == -1) {
    ChatsArr.push(ctx.from.id);
  }
  
  console.log('started:', ctx.from.id)
  var first_msg = "Здравствуйте, господин! \nМеня зовут Юми-чан, я буду помогать вам с ежедневными делами, что бы взаимодействовать со мной, можете использовать эти команды:\n\n/YumiBot - Покажу все доступные команды для взаимодействия. \n/week Покажу расписание на всю неделю. \n/day Покажу рассписание на определённый день. \n/dayon Буду уведомлять вас о расписании в начале дня. \n/dayoff Перестану уведомлять о расписании. \n/timingon Уведомлю вас о скорейшем окончании урока. \n/timingoof Перестану уведомлять о скорейшем окончании урока. \n/homework Покажу вам домашнее задание на неделю. \n/daywork Покажу вам домашнее задание на определённый день.  \n\nВот все мои возможности, надеюсь буду вам полезна:3";
  return ctx.reply(first_msg)
})

var schedule = [
  "Суббота :D",
  `
Понедельник 
1. (325) Алгебра 
2. (325) Алгебра 
3. (305) История Украины 
4. (305) История Украины 
5. (216) Физика
6. (216) Физика
  `,
  `
Вторник
1. (325) Украинский язык
2. (325) Украинский язык 
3. (306) Английский язык 
4. (306) Английский язык 
5. (224) Украинская литература 
6. (224) Украинская литература 
7. (103,213) Информатика
  `,
  `
Среда
1. (206) География 
2. (328) Украинский язык 
3. (206) Зарубежная литература 
4. (305) Всемирная история 
5. (319) Химия
6. (305) Правоведение 
7. Физическая культура
  `, 
  `
Четверг 
1. (104) Биология
2. (305) История Украины 
3. (325) Геометрия 
4. (325) Геометрия 
5. (104/206) Биология / География
6. (305) История Украины 
7. (306) Английский язык
  `,
  `
Пятница
1. (318) Немецкий
2. (318/215,314) Немецкий / Защита отечества 
3. (215,314) Защита отечества 
4. (328) Украинский язык 
5. Физическая культура 
6. (103,213) Технологии 
7. (209) Художественная культура
  `,
  "Воскресенье :D"
]

bot.hears('Привет', (ctx) => ctx.reply('Привет!'))
bot.hears('привет', (ctx) => ctx.reply('Привет!'))
bot.hears('Лёщионизм', (ctx) => ctx.reply('Лёщионизм -- как смысл жизни!'))

bot.command('YumiBot', (ctx) => ctx.reply("/help - Покажу все доступные команды для взаимодействия. \n/week Покажу расписание на всю неделю. \n/day Покажу рассписание на определённый день. \n/dayon Буду уведомлять вас о расписании в начале дня. \n/dayoff Перестану уведомлять о расписании. \n/timingon Уведомлю вас о скорейшем окончании урока. \n/timingoff Перестану уведомлять о скорейшем окончании урока. \n/homework Покажу вам домашнее задание на неделю. \n/daywork Покажу вам домашнее задание на определённый день."))

bot.command('week', (ctx) => ctx.reply("Понедельник \n1. (325) Алгебра \n2. (325) Алгебра \n3. (305) История Украины \n4. (305) История Украины \n5. (216) Физика\n6. (216) Физика\n\n\nВторник\n1. (325) Украинский язык\n2. (325) Украинский язык \n3. (306) Английский язык \n4. (306) Английский язык \n5. (224) Украинская литература \n6. (224) Украинская литература \n7. (103,213) Информатика\n\nСреда\n1. (206) География \n2. (328) Украинский язык \n3. (206) Зарубежная литература \n4. (305) Всемирная история \n5. (319) Химия\n6. (305) Правоведение \n7. Физическая культура\n\nЧетверг \n1. (104) Биология\n2. (305) История Украины \n3. (325) Геометрия \n4. (325) Геометрия \n5. (104/206) Биология / География\n6. (305) История Украины \n7. (306) Английский язык\n\n\nПятница\n1. (318) Немецкий\n2. (318/215,314) Немецкий / Защита отечества \n3. (215,314) Защита отечества \n4. (328) Украинский язык \n5. Физическая культура \n6. (103,213) Технологии \n7. (209) Художественная культура"));
bot.command('time', (ctx) => { var d = new Date();ctx.reply((d.getHours()+2) + ":" + d.getMinutes())});
bot.command('day', (ctx) => { var d = new Date(); var today = d.getDay();ctx.reply(schedule[today])});

bot.command('dayon', (ctx) => { console.log("DAYON");SettingsObj.day = true;ctx.reply("DAY:" + SettingsObj.day); })
bot.command('dayoff', (ctx) => { console.log("DAYOFF");SettingsObj.day = false;ctx.reply("DAY:" + SettingsObj.day); })

bot.command('timingon', (ctx) => { console.log("timingon");SettingsObj.timing = true;ctx.reply("timing:" + SettingsObj.timing); })
bot.command('timingoff', (ctx) => { console.log("timingoff");SettingsObj.timing = false;ctx.reply("timing:" + SettingsObj.timing); })

// RANDOM DAY REPLICAS
var randomDayReplicas = {
  monday: [
`Здравствуйте, господин! 
Сегодня понедельник, на восемь часов линейка! 
Думаю стоит на нее сходить, правда ничего полезного вы там не услышите.. 
Вот ваше расписание: 

1. (325) Алгебра 
2. (325) Алгебра 
3. (305) История Украины 
4. (305) История Украины 
5. (216) Физика 
6. (216) Физика 

Удачного дня!`,
`Доброе утречко, господин! 
Сегодня понедельник, так что не забудьте про линейку! 
К сожалению, на ней не будет ничего нового для вас, но такие правила.. 
Вот расписание на сегодня: 

1. (325) Алгебра 
2. (325) Алгебра 
3. (305) История Украины 
4. (305) История Украины 
5. (216) Физика 
6. (216) Физика 

Удачного дня!`,
`Доброе утро, господин! 
Угораздило же вас проснутся в понедельник.. 
Сегодня будет линейка, так что поторопитесь. 
Вот ваше расписание на сегодня: 

1. (325) Алгебра 
2. (325) Алгебра 
3. (305) История Украины 
4. (305) История Украины 
5. (216) Физика 
6. (216) Физика 

Удачного вам дня!`,
`Приветствую вас, господин! 
Понедельник по расписанию, сегодня будет линейка! 
Идти на нее не лучшее решение, но если не хотите получить замечание, то стоит сходить. 
Расписание на сегодня будет таким: 

1. (325) Алгебра 
2. (325) Алгебра 
3. (305) История Украины 
4. (305) История Украины 
5. (216) Физика 
6. (216) Физика 

Удачи вам, господин!`
  ],
  tuesday: [
    `Доброго утречка, господин! 
    Сегодня вторник, и в расписании есть английский.. 
    Думаю сегодня не лучший день чтобы сходить в школу.. 
    Но если собираетесь идти, то я желаю вам удачи, ведь она вам точно прегодится! 
    А вот полное расписание на сегодня: 
    
    1. (325) Украинский язык 
    2. (325) Украинский язык 
    3. (306) Английский язык 
    4. (306) Английский язык 
    5. (224) Украинская литература 
    6. (224) Украинская литература 
    7. (103,213) Информатика`,
    `Доброе утро, господин! 
    Вторник день тяжелый, сегодня у вас 7 уроков и английский.. 
    Крайне не советую сегодня идти в школу.. 
    Но если вы все же собрались, то я желаю вам удачи! 
    Вот рассписание на весь день: 
    
    1. (325) Украинский язык 
    2. (325) Украинский язык 
    3. (306) Английский язык 
    4. (306) Английский язык 
    5. (224) Украинская литература 
    6. (224) Украинская литература 
    7. (103,213) Информатика`,
    `Утречка, господин! 
    Сегодня вторник, надеюсь вы выжили после вчерашнего учебного дня, но этот день будет ещё сложнее, ведь будет урок английского языка. 
    Я уверена, что домашнее задание вы не делали, так что будьте осторожны, если вы сегодня вообще пойдете. 
    Вот все расписание на сегодня: 
    
    1. (325) Украинский язык 
    2. (325) Украинский язык 
    3. (306) Английский язык 
    4. (306) Английский язык 
    5. (224) Украинская литература 
    6. (224) Украинская литература 
    7. (103,213) Информатика 
    
    Удачного дня!`,
    `Здравствуйте, господин! 
    Сегодня вторник, будет два урока английского языка, так что готовьтесь. 
    Вот расписание: 
    
    1. (325) Украинский язык 
    2. (325) Украинский язык 
    3. (306) Английский язык 
    4. (306) Английский язык 
    5. (224) Украинская литература 
    6. (224) Украинская литература 
    7. (103,213) Информатика`
  ],
  wednesday: [
`Утречка! 
Сегодня среда, у вас семь уроков. 
Не лучший день дня похода в школу, впрочем, как и все.. 
Вот расписание: 

1. (206) География 
2. (328) Украинский язык 
3. (206) Зарубежная литература 
4. (305) Всемирная история 
5. (319) Химия 
6. (305) Правоведение 
7. Физическая культура 

Удачи вам, господин! 
`,
`Доброе утро, господин! 
Сегодня у нас среда, половина недели позади! 
Вот ваше расписание: 

1. (206) География 
2. (328) Украинский язык 
3. (206) Зарубежная литература 
4. (305) Всемирная история 
5. (319) Химия 
6. (305) Правоведение 
7. Физическая культура 

Удачного дня, надеюсь что ваш учитель географии в настроении!`,
`Доброго утречка! 
Сегодня среда, по расписанию 7 уроков! 
А вот и оно: 

1. (206) География 
2. (328) Украинский язык 
3. (206) Зарубежная литература 
4. (305) Всемирная история 
5. (319) Химия 
6. (305) Правоведение 
7. Физическая культура 

Удачного дня!`,
`Доброе утро! 
Среда по расписанию, думаю вы не очень мотивированы идти сегодня, ведь ничего интересного не будет. 
Но если вы все же пойдёте, то я желаю вам удачи! 
Вот расписание на сегодняшний день: 

1. (206) География 
2. (328) Украинский язык 
3. (206) Зарубежная литература 
4. (305) Всемирная история 
5. (319) Химия 
6. (305) Правоведение 
7. Физическая культура`
  ],
  thursday: [
`Здравствуйте, господин! 
Сегодня четверг, не советую вам идти в школу, ибо седьмым уроком будет английский язык, 
в любом случае вы можете прогулять его:) 
Пятым уроком будет биология, будьте готовы! 
Вот расписание на сегодня: 
1. (104) Биология 
2. (305) История Украины 
3. (325) Геометрия 
4. (325) Геометрия 
5. (104) Биология 
6. (305) История Украины 
7. (306) Английский язык 

Удачи вам!`,
`Доброе утречко! 
Сегодня четверг, очень плохой день! 
Советую остаться в кровати и не идти в школу. 
По расписанию пятым уроком будет биология. 
Но раз вы собрались, вот ваше расписание: 

1. (104) Биология 
2. (305) История Украины 
3. (325) Геометрия 
4. (325) Геометрия 
5. (104) Биология 
6. (305) История Украины 
7. (306) Английский язык 

Удачного вам дня!`,
`Доброе утро, господин! 
Четверг тяжелый день, пятым уроком будет география, а седьмым английский язык.. 
Идти сегодня в школу не лучшее решение.. 
Вот ваше расписание: 

1. (104) Биология 
2. (305) История Украины 
3. (325) Геометрия 
4. (325) Геометрия 
5. (206)География 
6. (305) История Украины 
7. (306) Английский язык 

Удачного дня!`,
`Утречка! 
Сегодня четверг, почти конец недели! 
Пятым уроком будет география, а седьмым английский язык, так что приготовьтесь! 
Вот расписание: 

1. (104) Биология 
2. (305) История Украины 
3. (325) Геометрия 
4. (325) Геометрия 
5. (206)География 
6. (305) История Украины 
7. (306) Английский язык 

Удачи!`
  ],
  friday: [
    `Доброго утречка, господин! 
    Сегодня пятница, последний день недели! 
    Вторым уроком будет защита отечества, а седьмым художественная культура. 
    Вот ваше расписание: 
    
    
    1. (318) Немецкий 
    2. (215,314)Защита отечества 
    3. (215,314) Защита отечества 
    4. (328) Украинский язык 
    5. Физическая культура 
    6. (103,213) Технологии 
    7. (209) Художественная культура 
    
    
    Удачи вам, господин!`,
    `Доброе утро! 
    Сегодня пятница, так что вы сможете сегодня нормально поспать! 
    Будет один урок немецкого, но всего уроков будет семь.. 
    Вот все расписание: 
    
    1. (318) Немецкий 
    2. (215,314)Защита отечества 
    3. (215,314) Защита отечества 
    4. (328) Украинский язык 
    5. Физическая культура 
    6. (103,213) Технологии 
    7. (209) Художественная культура 
    
    Удачи!`,
    `Утречка! 
    Конец недели, господин! 
    К сожилению у вас сегодня два урока немецкого, но седьмого урока не будет! 
    Вот все расписание: 
    
    1. (318) Немецкий 
    2. (318) Немецкий 
    3. (215,314) Защита отечества 
    4. (328) Украинский язык 
    5. Физическая культура 
    6. (103,213) Технологии 
    
    Удачи!`,
    `Доброе утро, господин! 
    Сегодня посдледний день недели! 
    У вас будет всего шесть уроков, но два из них будет немецкий язык.. 
    Вот ваше расписание на сегодня: 
    
    1. (318) Немецкий 
    2. (318) Немецкий 
    3. (215,314) Защита отечества 
    4. (328) Украинский язык 
    5. Физическая культура 
    6. (103,213) Технологии 
    
    Удачки вам!`
  ],
};

// ALARM
AlarmsObj = {
  first: true,
  second: true,
  third: true,
  fourth: true,
  fifth: true,
  sixth: true
}

var randomAlarmReplicas = {
  all: [
    `Господин! Урок закончится уже через 5 минут!`,
    `Урок скоро закончится, господин!`,
    `Урок подходит к концу, осталось 5 минут!`, 
    `Осталось 5 минут!`,
    `Урок закончится через 5 минут, господин!`, 
    `Урок почти закончился, осталось всего 5 минут!`, 
    `Часы показывают что урок закончится через 5 минут!`, 
    `5 минут до конца урока!`,
    `Господин, урок почти закончился, осталось 5 минут!`, 
    `Всего 5 минут отделяют вас от конца урока!` 
  ],
  preFour: [
    `Господин, скоро закночится четвертый урок и вы сможете пойти на диванчики!`,
    `Всего 5 минут до конца урока, после конца которого, вы сможете отдохнуть на диванчиках!`,
    `Господин, урок почти закончился, большая перемена на подходе!`,
    `5 минут до конца, диванчики на первом этаже уже ожидают вас!`,
    `До конца урока осалось 5 минут, поторопитесь, пока не заняли диванчики!`
  ],
  endFour: [
    `2 минуты до конца перемены, поторопитесь на урок! `,
    `Скоро начнётся урок, поторопитесь! `,
    `Урок скоро начнётся, вам стоит поторопиться! `,
    `Через 2 минуты закончится перемена! `,
    `Скоро перемена заканчивается, поторопитесь на урок!`
  ],
  lastLeasson: [
    `Последний урок подходит к концу!`,
    `Скоро закончится последний урок и вы сможете пойти домой!`,
    `5 минут до конца урока, позравляю вас с окончанием этого дня!`,
    `Последний урок подходит к концу!`,
    `Буквально через 5 минут закончится последний урок, с чем я вас и поздравляю!` 
  ]
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
} 

setInterval(function(ctx) {
  var d = new Date();
  var hour_now = d.getHours() + 2;
  var minutes_now = d.getMinutes();
  var day_now = d.getDay();
  if(SettingsObj.day == true && day_now != 0 && day_now != 6) {

    if(hour_now == 20 && minutes_now == 00 && day_now == 1) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomDayReplicas.monday[getRandom(0, 4)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    if(hour_now == 7 && minutes_now == 00 && day_now == 2) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomDayReplicas.tuesday[getRandom(0, 4)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    if(hour_now == 7 && minutes_now == 00 && day_now == 3) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomDayReplicas.wednesday[getRandom(0, 4)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    if(hour_now == 7 && minutes_now == 00 && day_now == 4) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomDayReplicas.thursday[getRandom(0, 4)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    if(hour_now == 7 && minutes_now == 00 && day_now == 5) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomDayReplicas.friday[getRandom(0, 4)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
  }
  if(SettingsObj.timing == true) {
    var d = new Date();
    var hour_now = d.getHours() + 2;
    var minutes_now = d.getMinutes();
    console.log(hour_now + ":" + minutes_now);

    var outoflesson = 'http://avarice.ga/alarm.ogg'; 

    // first
    if(hour_now == 10 && minutes_now == 10) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.all[getRandom(0, 10)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // second
    if(hour_now == 11 && minutes_now == 00) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.all[getRandom(0, 10)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // third
    if(hour_now == 11 && minutes_now == 45) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.all[getRandom(0, 10)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // fourth
    if(hour_now == 12 && minutes_now == 50) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.Four[getRandom(0, 5)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // fourth end
    if(hour_now == 13 && minutes_now == 8) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.endFour[getRandom(0, 5)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // fifth
    if(hour_now == 13 && minutes_now == 40) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.all[getRandom(0, 10)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }
    // sixth
    if(hour_now == 14 && minutes_now == 30) {
      if(day_now == 1) {
        ChatsArr.forEach(function(entry) {
          var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.lastLeasson[getRandom(0, 5)]);
          request.get({ uri: host_req, encoding: 'utf-8' });
        })
      } else {
        ChatsArr.forEach(function(entry) {
          var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.friday[getRandom(0, 10)]);
          request.get({ uri: host_req, encoding: 'utf-8' });
        })
      }
      
    }
    // seventh
    if(hour_now == 14 && minutes_now == 30 && day_now != 1) {
      ChatsArr.forEach(function(entry) {
        var host_req = "https://api.telegram.org/bot392530919:AAG--VunCAxOIUmu2X2mzjORDnowNR0CPx8/sendMessage?chat_id="+ entry +"&text=" + utf8.encode(randomAlarmReplicas.lastLeasson[getRandom(0, 5)]);
        request.get({ uri: host_req, encoding: 'utf-8' });
      })
    }

    }

}, 60000)

// STICKER
bot.on('sticker', (ctx) => ctx.reply('👍'))

// COUB
randCoubFunc = function(n) {
  var s ='', abd ='abcdefghijklmnopqrstuvwxyz0123456789', aL = abd.length;
  while(s.length < n)
    s += abd[Math.random() * aL|0];
  return "http://coub.com/view/" + s;
}
bot.command('coub', (ctx) => { ctx.reply(randCoubFunc(5)) });

bot.startPolling()