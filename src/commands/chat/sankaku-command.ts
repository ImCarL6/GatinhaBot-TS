import { ChatInputCommandInteraction, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';
import * as Client from 'sankaku-client';

import { Language } from '../../models/enum-helpers/index.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class SankakuCommand implements Command {
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

        let sankaku = new Client();

        let result;

        result.forEach(async element => await InteractionUtils.send(intr, element.file.url));
    }
}
