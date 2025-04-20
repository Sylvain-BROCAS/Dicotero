import { Events } from "discord.js";
import IEventOptions from "../interfaces/iEventOptions";
import IEvent from "../interfaces/iEvents";
import CustomClient from "./CustomClient";

export default class Event implements IEvent {
    client: CustomClient;
    name: Events;
    description: string;
    once: boolean;

    constructor(client: CustomClient, options: IEventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    Execute(...args: any): void {};
}