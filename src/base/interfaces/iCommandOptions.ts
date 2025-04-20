import Category from "../enums/Category";

export default interface ICommandOptions{
    name: string;
    description: string;
    category: Category;
    options: Object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;
}