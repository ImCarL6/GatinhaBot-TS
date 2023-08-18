import { rastrearEncomendas } from 'correios-brasil';
import { format } from 'date-fns';
import { ChatInputCommandInteraction, EmbedBuilder, PermissionsString } from 'discord.js';
import { RateLimiter } from 'discord.js-rate-limiter';

import { Language } from '../../models/enum-helpers/index.js';
import { Order } from '../../models/order.js';
import { Lang } from '../../services/index.js';
import { InteractionUtils } from '../../utils/index.js';
import { Command, CommandDeferType } from '../index.js';

export class TrackCommand implements Command {
    public names = [Lang.getRef('chatCommands.track', Language.Default)];
    public cooldown = new RateLimiter(1, 5000);
    public deferType = CommandDeferType.PUBLIC;
    public requireClientPerms: PermissionsString[] = [];

    private orderEmbed(order: Order): EmbedBuilder {
        if (!order.eventos) {
            let errorEmbed: EmbedBuilder = new EmbedBuilder()
                .setTitle(order?.codObjeto)
                .setDescription(order?.mensagem)
                .setColor('Red')
                .setFooter({
                    text: format(new Date(), 'dd-mm-yyyy-hh:mm:ss'),
                });

            return errorEmbed;
        }

        let embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(order?.codObjeto)
            .setDescription(order?.eventos[0]?.descricao)
            .setColor(0xffff00)
            .setFooter({
                text: format(new Date(order?.eventos[0]?.dtHrCriado), 'dd-mm-yyyy-hh:mm:ss'),
            });

        let aux: Array<string> = order.eventos[0].descricao.split(' ');

        aux.includes('entregue')
            ? embed.addFields({
                  name: 'Status',
                  value: `${order?.eventos[0]?.unidade?.tipo}, 
                    ${order?.eventos[0]?.unidade?.endereco?.cidade} - 
                    ${order?.eventos[0]?.unidade?.endereco?.uf}`,
              })
            : embed.addFields(
                  {
                      name: 'De',
                      value: `${order?.eventos[0]?.unidade?.tipo}, 
                    ${order?.eventos[0]?.unidade?.endereco?.cidade} - 
                    ${order?.eventos[0]?.unidade?.endereco?.uf}`,
                  },
                  {
                      name: 'Para',
                      value: `${order?.eventos[0]?.unidadeDestino?.tipo}, 
                    ${order?.eventos[0]?.unidadeDestino?.endereco?.cidade} - 
                    ${order?.eventos[0]?.unidadeDestino?.endereco?.uf}`,
                  }
              );

        return embed;
    }

    public async execute(intr: ChatInputCommandInteraction): Promise<void> {
        let args = {
            option: intr.options.getString(Lang.getRef('arguments.order', Language.Default)),
        };

        let order: Order;

        await rastrearEncomendas([args.option]).then(response => (order = response[0]));

        await InteractionUtils.send(intr, this.orderEmbed(order));
    }
}
