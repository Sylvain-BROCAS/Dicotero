import { AutocompleteInteraction, CacheType, ChatInputCommandInteraction } from "discord.js";
import ICommand from "../interfaces/iCommand";
import CustomClient from "./CustomClient";
import Category from "../enums/Category";
import ICommandOptions from "../interfaces/iCommandOptions";

export default class Command implements ICommand{
    client: CustomClient;
    name: string;
    description: string;
    category: Category;
    options: Object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;

    constructor(client: CustomClient, options: ICommandOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.category = options.category;
        this.options = options.options;
        this.default_member_permissions = options.default_member_permissions;
        this.dm_permission = options.dm_permission;
        this.cooldown = options.cooldown;
    }

    Execute(interaction: ChatInputCommandInteraction<CacheType>): void {
    }
    AutoComplete(interaction: AutocompleteInteraction<CacheType>): void {
    }

}