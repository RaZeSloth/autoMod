const Discord = require('discord.js');
module.exports = {
	name: 'ban',
	description: "Permanently removes a member from the server!",
	usage: '<@member> [reason]',
	permissions: ["Ban Members"],
	aliases: ["b", "permban"],
	async execute(message, args) {

		if(!args[0]) return message.reply(`Please include a member to ban`);

		const targetMember = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
		if (!targetMember) return message.reply(`Please include a Member to ban`).catch(() => { message.author.send(`I am unable to send messages in ${message.channel}, please move to another channel`); }).catch();

		if(targetMember.id == message.author.id) return message.reply("You can not ban yourself").catch(() => { message.author.send(`I am unable to send messages in ${message.channel}, please move to another channel`); }).catch();

		let reason = args.slice(1).join(" ");
		if (reason.length < 1) reason = "No reason specified";

		const channelBanned = new Discord.MessageEmbed()
			.setColor('#DC143C')
			.setTitle(`A Member Was Banned`)
			.setAuthor(`${message.member.user.tag}`, `${message.member.user.displayAvatarURL()}`)
			.setThumbnail(targetMember.user.displayAvatarURL())
			.addFields(
				{ name: '**Who?**', value: `${targetMember}\n${targetMember.user.tag}`, inline: true },
				{ name: '**Reason**', value: `${reason}`, inline: true },
			)
			.setTimestamp();


		let errorMessage = false;

		targetMember.ban({ days: 0, reason: `${reason}` }).catch(() => {
			message.channel.send(`Sorry, an error occured when trying to ban ${targetMember.user.tag}`).catch(() => { message.author.send(`I am unable to ban that member.`); }).catch();
		}).then(() => {
			if(errorMessage == true) return;
			message.channel.send(channelBanned).catch();

		});
	}
};
