const Discord = require('discord.js');
module.exports = {
	name: 'coinflip',
	description: 'Flip a coin! Very good for making decisions.',
	aliases: ["cf", "coinflipper"],
	async execute(message) {

		const flip = Math.floor((Math.random() * 100) + 0);
		let ans = `heads`;

		if(flip % 2 == 0) ans = `tails`;
		if(flip == 73) ans = `its side! Impressive`;

		const embed = new Discord.MessageEmbed()
			.setTitle(`Coin Flipper`)
			.setDescription(`The coin landed on ${ans}\n\nPowered by [@CoinFlipper#1767](https://coinflipperbot.glitch.me/)`)
			.setColor(`#cd7f32`)
			.setThumbnail(`https://i.imgur.com/4Zw6qky.png`);
		message.channel.send(embed).catch(() => { message.author.send(`I am unable to send messages in ${message.channel}, please move to another channel`); }).catch();
	}
};
