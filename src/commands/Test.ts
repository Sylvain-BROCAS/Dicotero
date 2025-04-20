import Command from "../base/classes/Command";
import CustomClient from "../base/classes/CustomClient";
import Category from "../base/enums/Category";
import { ApplicationCommandOptionType, CacheType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export default class Test extends Command {
    constructor(client: CustomClient) {
        super(client, {
            name: "test",
            description: "Test command",
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [
                {name: "one", description: "First option", type: ApplicationCommandOptionType.Subcommand},
                {name: "two", description: "Second option", type: ApplicationCommandOptionType.Subcommand} 
            ]
        });
    }   
    Execute(interaction: ChatInputCommandInteraction) {
        const subcommand = interaction.options.getSubcommand();
        const fullName = `test.${subcommand}`;
    
        const sub = this.client.subCommands.get(fullName);
        if (!sub) {
            return interaction.reply({ content: `❌ Sous-commande \`${fullName}\` non trouvée.`, ephemeral: true });
        }
    
        return sub.Execute(interaction);
    }
    
}