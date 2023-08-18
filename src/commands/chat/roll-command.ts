import { DiceRoll } from '@dice-roller/rpg-dice-roller';
import { ChatInputCommandInteraction, EmbedBuilder, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class RollCommand implements Command {
    public names = [Lang.getRef('chatCommands.dice', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    public async execute(intr: ChatInputCommandInteraction): Promise<void> {
        let args = {
            option: intr.options.getString(Lang.getRef('arguments.dice', Language.Default)),
        };

        let roll: DiceRoll = new DiceRoll(args.option);

        let rollEmbed = new EmbedBuilder()
            .setTitle(args.option)
            .setDescription(roll.output)
            .setColor('Green');

        await InteractionUtils.send(intr, rollEmbed);
    }
}
