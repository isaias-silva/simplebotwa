import { Ibot } from "../interfaces/Ibot";
import { data } from "../bot_config/config";

import cliente from "../model/cliente";

export default async function (bot: Ibot, name: string) {
  const { webMessage, reply } = bot;
  if (!name) {
    return reply(`digite o nome da lista junto do comando\n *Exemplo*: ${data.prefix}verLista nome da lista`)
  }
  const result: any = await cliente.consultOne(name)
  if (!result) {
    return reply(`${name} não encontrado em nenhuma lista`)
  }
  if (!result.extraMsg) {
    return reply('mensagens extras não encontradas')
  }
  try {
    let msgExtraMold = JSON.parse(result.extraMsg)
    return reply(`mensagens extras em ordem: \n${msgExtraMold.map((data: any,i:number) => { return `[${i}]  "${data}"\n` })
      } `.replace(/,/g,''))
  }catch(err){
    console.log(err)
    return reply('erro interno contate o desenvolvedor')
  }

  
}