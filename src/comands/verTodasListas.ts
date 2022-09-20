import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente_model/cliente";

export default async function (bot: Ibot) {
  const { webMessage, reply } = bot;
  
  const list = await cliente.consult();

  if (list.length < 1) {
    return reply("Lista não encontrada");
  }
  let listName = list.map((x) => x.tipoDeCliente)
  listName = listName.filter((x, v) => { return listName.indexOf(x) == v; })
  const template = `seguem todas as listas cadastradas:\n${listName.map((v, i) => { return `\n[${i}] ${v}` })}`.replace(/,/g, "");
  return reply(template);
}
