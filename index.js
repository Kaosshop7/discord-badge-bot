const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const express = require('express');
const app = express();

// --- ส่วนที่ 1: Web Server กัน Render หลับ ---
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Bot is Online! Huge Status List Loaded.');
});
app.listen(port, () => {
  console.log(`Web server listening on port ${port}`);
});

// --- ส่วนที่ 2: รับ Token ---
const TOKEN = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// --- คลังแสงสถานะ (50+ ประโยค) ---
const statusList = [
    // --- โหมด Dev & ขอตรา ---
    { name: 'รอรับตรา Active Developer 🏆', type: ActivityType.Playing },
    { name: 'เขียนโค้ดด้วยมือถือ 📱', type: ActivityType.Playing },
    { name: 'รันบน Render แรงๆ 🚀', type: ActivityType.Competing },
    { name: 'กำลังแก้ Bug (ที่สร้างเอง) 🐛', type: ActivityType.Playing },
    { name: 'Stack Overflow คือเพื่อนแท้ 📚', type: ActivityType.Playing },
    { name: 'Dev โดยวัยรุ่น Termux ⌨️', type: ActivityType.Playing },
    { name: 'Node.js v20 Enjoyer ☕', type: ActivityType.Playing },
    { name: 'Deploy แล้ว ห้ามพังนะ 🙏', type: ActivityType.Watching },
    { name: 'Ping 9999ms (ล้อเล่น) 📶', type: ActivityType.Competing },
    { name: 'System 32 Deleted ❌', type: ActivityType.Playing },

    // --- โหมดกวนประสาท ---
    { name: 'มองหน้าหาเรื่อง? 👀', type: ActivityType.Watching },
    { name: 'ไม่ได้อู้นะ แค่พักสายตา 😴', type: ActivityType.Playing },
    { name: 'ทัก DM มา ไม่ตอบนะจ๊ะ 🚫', type: ActivityType.Playing },
    { name: 'กิน RAM เป็นอาหารเช้า 🍟', type: ActivityType.Playing },
    { name: 'แม่เรียกไปกินข้าว 🍚', type: ActivityType.Listening },
    { name: 'อย่า Ping เดี๋ยวดีด ⚡', type: ActivityType.Watching },
    { name: 'รับจ้างนอน 🛌', type: ActivityType.Competing },
    { name: 'Server นี้คนหน้าตาดีเยอะจัง 😎', type: ActivityType.Watching },
    { name: 'ใครไม่กด /ping ขอให้เน็ตหลุด 🔌', type: ActivityType.Playing },
    { name: 'แอบมองเธออยู่นะจ๊ะ 🎵', type: ActivityType.Listening },

    // --- โหมดเท่ๆ Hacker ---
    { name: 'Security System: Active 🛡️', type: ActivityType.Watching },
    { name: 'Scanning for threats... 🔍', type: ActivityType.Watching },
    { name: 'DDoS Protection: ON 🛑', type: ActivityType.Playing },
    { name: 'Accessing Database... 💾', type: ActivityType.Watching },
    { name: 'User Authentication... 🔐', type: ActivityType.Competing },
    { name: 'Encryption Level: MAX 🔒', type: ActivityType.Playing },
    
    // --- โหมดตลก/Meme ---
    { name: 'Loading... 99% (ค้าง) ⌛', type: ActivityType.Playing },
    { name: '404 Brain Not Found 🧠', type: ActivityType.Playing },
    { name: 'Netflix (หารไหม?) 🎬', type: ActivityType.Watching },
    { name: 'YouTube: วิธีเป็นเทพซ่า 📺', type: ActivityType.Watching },
    { name: 'Spotify: เพลงเศร้าเคล้าน้ำตา 🎧', type: ActivityType.Listening },
    { name: 'Minecraft ⛏️', type: ActivityType.Playing },
    { name: 'ROV ลงแรงค์ (อย่ากวน) 🎮', type: ActivityType.Competing },
    { name: 'Roblox แมพหนีผี 👻', type: ActivityType.Playing },
    { name: 'Discord Light Mode (แสบตา) ☀️', type: ActivityType.Watching },
    
    // --- โหมดเรียกร้องความสนใจ ---
    { name: '/ping สิ รอไรอยู่? 👇', type: ActivityType.Playing },
    { name: 'เหงาจัง ทักได้นะ (หยอก) 💬', type: ActivityType.Listening },
    { name: 'บอทตัวนี้มีเจ้าของแล้ว 💖', type: ActivityType.Playing },
    { name: 'อากาศมันร้อน 🔥', type: ActivityType.Competing },
    { name: 'ฝนตกดูแลสุขภาพด้วย ☔', type: ActivityType.Playing },
    { name: 'ต้องการกาแฟด่วน ☕', type: ActivityType.Watching },
    { name: 'Battery 1% 🔋', type: ActivityType.Playing },
    { name: 'Restarting... (Just kidding) 🔄', type: ActivityType.Playing }
];

const commands = [
  {
    name: 'ping',
    description: 'เช็คสถานะบอทและขอตรา Active Developer',
  },
];

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // --- ระบบสุ่มสถานะ (Random) ---
  setInterval(() => {
    // สุ่มเลข index จากจำนวนสถานะที่มีทั้งหมด
    const randomIndex = Math.floor(Math.random() * statusList.length);
    const status = statusList[randomIndex];
    
    client.user.setPresence({
      activities: [{ name: status.name, type: status.type }],
      status: 'online',
    });
  }, 10000); // เปลี่ยนทุก 10 วินาที

  // --- ระบบฝังคำสั่งลงทุกเซิร์ฟ (Auto Deploy) ---
  console.log('กำลังไล่ฝังคำสั่ง /ping ลงทุกเซิร์ฟเวอร์...');
  client.guilds.cache.forEach(async (guild) => {
    try {
      await guild.commands.set(commands);
      console.log(`✅ เซิร์ฟ: ${guild.name} เรียบร้อย`);
    } catch (error) {
      console.error(`❌ เซิร์ฟ: ${guild.name} เฟล (อาจเพราะสิทธิ์ไม่พอ)`);
    }
  });
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    // สุ่มคำตอบกวนๆ เวลาคนกด Ping
    const replies = [
        'Pong! 🏓 ว่างหรอมานั่งกดเล่น?',
        'Pong! 🏓 จ้าๆ รู้แล้วว่าบอทไม่ตาย',
        'Pong! 🏓 รับทราบ! รอ 24 ชม. ไปกดรับตรานะ',
        'Pong! 🏓 อย่ากดรัวสิ เดี๋ยวเจ็บ!',
        'Pong! 🏓 ดีมากเจ้ามนุษย์'
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    
    await interaction.reply(randomReply);
  }
});

client.login(TOKEN);
