import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';
import E621 from 'e621';

import { Language } from '../../models/enum-helpers/index.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class YiffCommand implements Command {
    public names = [Lang.getRef('chatCommands.yiff', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction): Promise<void> {
        let args = {
            option: intr.options.getString(Lang.getRef('arguments.yiff', Language.Default)),
            limit: intr.options.getInteger(Lang.getRef('arguments.limit', Language.Default)),
        };

        if (!args.limit) args.limit = 1;

        const furro = new E621({
            authKey: 'd72d73a63fc7799245df4f30fa9cb525',
            authUser: '2bb',
            requestTimeout: 10,
        });

        let result = await furro.posts.search({ tags: args.option, limit: args.limit });

        result.forEach(async element => await InteractionUtils.send(intr, element.file.url));
    }
}
