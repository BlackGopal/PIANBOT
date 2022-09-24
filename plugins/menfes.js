let handler = async(m, { conn, text, args, command, usedPrefix }) => {
  
  let [number, name, pesan, boddy] = text.split `|`
	if (!text) throw `[ MENFESS ]\nFormat : *${usedPrefix + command} nomor | nama | pesan untuknya*\n\nContoh : *${usedPrefix + command} 628xxxxxxxxxx | UrCrush | hai kamu*`
	if (text.includes('|')) {
		args[0] = text.split(`|`)[0].replaceAll(' ','')
		args[1] = text.split(`|`)[1]
		args[2] = text.split(`|`)[2]
	} else {
		args[1] = args.slice(1).join(' ')
		args[2] = args.slice(2).join(' ')
	}
	let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[0] ? (args[0].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
	let meh = await conn.onWhatsApp(who)
	if (meh.length == 0) return m.reply(`[!] Failed, @${(args[0] || '')} bukan pengguna WhatsApp.`, null, { mentions: [args[0]] })
	if (!who) throw `tag atau ketik nomornya!`
	if (who.includes(conn.user.jid.split`@`[0])) throw `[!] Tidak bisa mengirim *menfess* ke Bot`
	who = meh[0].jid
	if (!args[1]) throw `[!] Isi namamu`
	if (!args[2]) throw `[!] Masukkan isi pesan`
	if (args[2].length > 3000) throw `[!] Teks Kepanjangan`
	let buffer, q = m.quoted ? m.quoted : m, mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image|video|sticker|webp|audio/g.test(mime)) buffer = await q.download?.()
	
	let from = `${name}`
	let target = `📣 ʜɪ ᴋᴀᴋ! ᴋᴀᴍᴜ ᴀᴅᴀ ᴩᴇꜱᴀɴ ʀᴀʜᴀꜱɪᴀ ᴅᴀʀɪ ꜱᴇꜱᴇᴏʀᴀɴɢ ɴɪʜ\n\n❔𝘿𝙖𝙧𝙞 : ${args[1]}\n📩 𝙋𝙚𝙨𝙖𝙣 : ${args[2]}`
	let senderr = `[ S U C C E S S ]\n\nMengirim Pesan ${mime ? `*${mime}*` : ''}\n👥 Untuk : wa.me/${who.split("@s.whatsapp.net")[0]}\n\n*Isi Pesan :*\n${pesan}`
	let foot = `Kamu blom bisa membalas pesan menfes ini ke pengirim, jadi ss aja buat SW siapa tau orang yg ngirim ngaku.\n\nKalo mau gunain fiturnya tinggal ketik .𝙢𝙚𝙣𝙛𝙚𝙨`
	
	const templateButtons = [
    {index: 1, quickReplyButton: {displayText: 'MENFES', id: '.menfes'}},
]
let tm = {
text: target,
footer: foot,
templateButtons: templateButtons,
image: {url: fla + 'Donasi'}
}
	
	if (mime.includes('audio')) await conn.sendMessage(who, { audio: buffer, mimetype: 'audio/mpeg', ptt: true })
	if (mime != '' && !mime.includes('audio')) {
		if (mime.includes('webp')) {
			await conn.sendMessage(who, { text: target }, foot)
			await conn.sendMessage(m.sender, { text: sender })
		}
		await conn.sendButton(who, target.trim(), foot, buffer, [['Menfess', ',menfes']])
		await conn.sendFile(m.sender, buffer, '', senderr, null)
	} else {
		await conn.sendMessage(who, tm, m)
		await conn.reply(m.sender, senderr, m)
	}
	if (m.isGroup) await m.reply(`Sukses mengirim pesan *${mime ? mime : 'teks'}*`)
}

handler.help = ['menfess <nomor|nama|pesan>']
handler.tags = ['anonymous']
handler.command = /^(me(m|n)fess?|chat)$/i

handler.limit = true
handler.private = true

export default handler
