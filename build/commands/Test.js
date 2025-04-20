"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Command_1 = __importDefault(require("../base/classes/Command"));
const Category_1 = __importDefault(require("../base/enums/Category"));
const discord_js_1 = require("discord.js");
class Test extends Command_1.default {
    constructor(client) {
        super(client, {
            name: "test",
            description: "Test command",
            category: Category_1.default.Utilities,
            default_member_permissions: discord_js_1.PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            cooldown: 3,
            options: [
                { name: "one", description: "First option", type: discord_js_1.ApplicationCommandOptionType.Subcommand },
                { name: "two", description: "Second option", type: discord_js_1.ApplicationCommandOptionType.Subcommand }
            ]
        });
    }
    Execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        const fullName = `test.${subcommand}`;
        const sub = this.client.subCommands.get(fullName);
        if (!sub) {
            return interaction.reply({ content: `❌ Sous-commande \`${fullName}\` non trouvée.`, ephemeral: true });
        }
        return sub.Execute(interaction);
    }
}
exports.default = Test;
