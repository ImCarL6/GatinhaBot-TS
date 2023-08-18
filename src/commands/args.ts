import { APIApplicationCommandBasicOption, ApplicationCommandOptionType } from 'discord.js';

import { HelpOption, InfoOption } from '../enums/index.js';
import { Language } from '../models/enum-helpers/index.js';
import { Lang } from '../services/index.js';

export class Args {
    public static readonly HELP_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.option', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.option'),
        description: Lang.getRef('argDescs.helpOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.helpOption'),
        type: ApplicationCommandOptionType.String,
        choices: [
            {
                name: Lang.getRef('helpOptionDescs.contactSupport', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('helpOptionDescs.contactSupport'),
                value: HelpOption.CONTACT_SUPPORT,
            },
            {
                name: Lang.getRef('helpOptionDescs.commands', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('helpOptionDescs.commands'),
                value: HelpOption.COMMANDS,
            },
        ],
    };
    public static readonly INFO_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.option', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.option'),
        description: Lang.getRef('argDescs.helpOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.helpOption'),
        type: ApplicationCommandOptionType.String,
        choices: [
            {
                name: Lang.getRef('infoOptions.about', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.about'),
                value: InfoOption.ABOUT,
            },
            {
                name: Lang.getRef('infoOptions.translate', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.translate'),
                value: InfoOption.TRANSLATE,
            },
            {
                name: Lang.getRef('infoOptions.dev', Language.Default),
                name_localizations: Lang.getRefLocalizationMap('infoOptions.dev'),
                value: InfoOption.DEV,
            },
        ],
    };
    public static readonly TRACK_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.order', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.order'),
        description: Lang.getRef('argDescs.trackOption', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.trackOption'),
        type: ApplicationCommandOptionType.String,
    };
    public static readonly ROLL_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.dice', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.dice'),
        description: Lang.getRef('argDescs.dice', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.dice'),
        type: ApplicationCommandOptionType.String,
    };
    public static readonly YIFF_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.yiff', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.yiff'),
        description: Lang.getRef('argDescs.yiff', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.yiff'),
        type: ApplicationCommandOptionType.String,
    };
    public static readonly LIMIT_OPTION: APIApplicationCommandBasicOption = {
        name: Lang.getRef('arguments.limit', Language.Default),
        name_localizations: Lang.getRefLocalizationMap('arguments.limit'),
        description: Lang.getRef('argDescs.limit', Language.Default),
        description_localizations: Lang.getRefLocalizationMap('argDescs.limit'),
        type: ApplicationCommandOptionType.Integer,
        max_value: 10,
        min_value: 1,
    };
}
