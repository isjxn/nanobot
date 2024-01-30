import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CommandInteraction, ComponentType, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import findUser from "../../utils/findUser";
import BlackjackGame from "../../blackjack/BlackjackGame";

const command: ICommand = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName("blackjack")
        .setDescription("Play a game of blackjack."),
    async execute(interaction: CommandInteraction) {
        await interaction.deferReply();

        const discordUser = interaction.user;
        var user = await findUser(discordUser.id, discordUser.globalName);

        // Initializing Blackjack game
        const blackjackGame = new BlackjackGame();
        blackjackGame.startNewGame();

        // Buttons for the game
        const hitButton = new ButtonBuilder()
            .setCustomId('hit')
            .setLabel('Hit')
            .setStyle(ButtonStyle.Primary);

        const standButton = new ButtonBuilder()
            .setCustomId('stand')
            .setLabel('Stand')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(hitButton, standButton);

        let gameEmbed = new EmbedBuilder()
            .setTitle("Blackjack Game")
            .setDescription(`Your hand: (${blackjackGame.playerHand.getScore()}) ${blackjackGame.playerHand.getHandString()} \n Dealer's hand: ${blackjackGame.dealerHand.getHandString()}`)
            .setColor("#0099ff");

        await interaction.editReply({ embeds: [gameEmbed], components: [row] });

        const collector = interaction.channel.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60_000 });


        collector.on('collect', async i => {
            if (i.user.id === interaction.user.id) {
                if (i.customId === 'hit') {
                    await i.deferUpdate(); // Defer the update before processing
                    blackjackGame.hitPlayer();

                    gameEmbed.setDescription(`Your hand: (${blackjackGame.playerHand.getScore()}) ${blackjackGame.playerHand.getHandString()} \n Dealer's hand: ${blackjackGame.dealerHand.getHandString()}`);
                    await i.editReply({ embeds: [gameEmbed], components: [row] });

                    if (blackjackGame.playerHand.getScore() > 21) {
                        gameEmbed.setDescription(`You busted with ${blackjackGame.playerHand.getScore()} points!`);
                        await i.editReply({ embeds: [gameEmbed], components: [] });
                        collector.stop();
                    }
                } else if (i.customId === 'stand') {
                    await i.deferUpdate(); // Defer the update before processing
                    blackjackGame.dealerPlays();
                    const winner = blackjackGame.checkWinner();

                    gameEmbed.setDescription(`Final Results: \n Your hand: (${blackjackGame.playerHand.getScore()}) ${blackjackGame.playerHand.getHandString()} \n Dealer's hand: ${blackjackGame.dealerHand.getHandString()}\nWinner: ${winner}`);
                    await i.editReply({ embeds: [gameEmbed], components: [] });
                    collector.stop();
                }
            } else {
                await i.reply({ content: `These buttons aren't for you!`, ephemeral: true });
            }
        });

        collector.on('end', async () => {
            await interaction.editReply({ components: [] });
        });
    }
}

export default command;