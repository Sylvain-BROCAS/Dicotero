import CustomClient from "../base/classes/CustomClient";
import SubCommand from "../base/classes/SubCommand";
import { ChatInputCommandInteraction } from "discord.js";

export default class TestTwo extends SubCommand {
    constructor(client: CustomClient) {
        super(client, {
            name: "test.two"
        });
    }   
    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({ content: "Test two command executed!", ephemeral: true });
    }
}