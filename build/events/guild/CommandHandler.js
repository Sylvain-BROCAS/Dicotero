"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = __importDefault(require("../../base/classes/Event"));
class CommandHandler extends Event_1.default {
    constructor(client) {
        super(client, {
            name: discord_js_1.Events.InteractionCreate,
            description: "Command handler event",
            once: false
        });
    }
    Execute(interaction) {
        var _a;
        if (!interaction.isChatInputCommand())
            return;
        const command = this.client.commands.get(interaction.commandName);
        //@ts-ignore
        if (!command)
            return interaction.reply({ content: "Command not found", ephemeral: true }) && this.client.commands.delete(interaction.commandName);
        const { cooldowns } = this.client;
        if (!cooldowns.has(command.name))
            cooldowns.set(command.name, new discord_js_1.Collection());
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;
        if (timestamps.has(interaction.user.id) && now < timestamps.get(interaction.user.id) + cooldownAmount) {
            return interaction.reply({
                embeds: [new discord_js_1.EmbedBuilder()
                        .setColor("Red")
                        .setDescription(`❌ Please wait \`${((((timestamps.get(interaction.user.id) || 0) + cooldownAmount) - now) / 1000).toFixed(1)}\` more second(s) before using \`${command.name}\``)
                ], ephemeral: true
            });
        }
        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        try {
            const subCommandGroup = interaction.options.getSubcommandGroup(false);
            const subCommand = `${interaction.commandName} ${subCommandGroup ? `.${subCommandGroup}` : ""}${interaction.options.getSubcommand(false) || ""}`;
            return ((_a = this.client.subCommands.get(subCommand)) === null || _a === void 0 ? void 0 : _a.Execute(interaction)) || command.Execute(interaction);
        }
        catch (ex) {
            console.log(ex);
        }
    }
}
exports.default = CommandHandler;
