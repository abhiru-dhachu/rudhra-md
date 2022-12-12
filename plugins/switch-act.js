const { cmd,prh,prh1, getAdmin, tlang, prefix } = require('../lib')
const Config = require('../config')
    //---------------------------------------------------------------------------
cmd({
        pattern: "act",
        desc: "Switches for varios works.",
        category: "group",
        filename: __filename,
    },
    async(Void, citel, text,{ isCreator }) => {
        //-----------------------------------------
        if (!citel.isGroup) return citel.reply(tlang().group);
        const groupAdmins = await getAdmin(Void, citel)
        const botNumber = await Void.decodeJid(Void.user.id)
        const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
        //-----------------------------------------
        if (!citel.isGroup) return citel.reply("This command is only for group")
        if (!text) return citel.reply(`❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-cardgame\n5-bot`)
        if (!isAdmins) return citel.reply("❌ This command is only for admin")
        switch (text.split(" ")[0]) {
            case 'antilink':
                {
                    let checkgroup = await prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, antilink: "true" })
                            .save()
                        return citel.reply(' Antilink Enabled Successfully')
                    } else {
                        if (checkgroup.antilink == "true") return citel.reply("Antilink was alredy  enabled here.")
                        await prh.updateOne({ id: citel.chat }, { antilink: "true" })
                        citel.reply('Enabled antilink in current chat.')
                        return
                    }
                }
                break
          
                      case 'economy':
                {
                    let checkgroup = await prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, economy: "true" })
                            .save()
                        return citel.reply(' Economy Enabled Successfully')
                    } else {
                        if (checkgroup.economy == "true") return citel.reply("Economy was alredy enabled.")
                        await prh.updateOne({ id: citel.chat }, { economy: "true" })
                        citel.reply('Economy enabled in current chat.')
                        return
                    }
                }
                break
            case 'events':
                {
                    let checkgroup = await prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, events: "true" })
                            .save()
                        return citel.reply("Successfully Enabled *Events*")
                    } else {
                        if (checkgroup.events == "true") return citel.reply("*Events* are already enabled")
                        await prh.updateOne({ id: citel.chat }, { events: "true" })
                        return citel.reply("Successfully Enabled *Events*")
                    }
                }
                break
            case 'cardgame':
                {
                    let checkgroup = prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, cardgame: "active" })
                            .save()
                        return citel.reply("Successfully Enabled *Card Game*")
                    } else {
                        if (checkgroup.cardgame == "active") return citel.reply("*Card Game* was already enabled")
                        await prh.updateOne({ id: citel.chat }, { cardgame: "active" })
                        return citel.reply("Successfully Enabled *Card Game.*")
                    }
                }
                break
            case 'bot':
                {
                    let checkgroup = await prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, botenable: "true" })
                            .save()
                        return citel.reply(`Successfully Enabled *${tlang().title}*`)
                    } else {
                        if (checkgroup.botenable == "true") return citel.reply("*Bot* was already enabled")
                        await prh.updateOne({ id: citel.chat }, { botenable: "true" })
                        return citel.reply(`Successfully Enabled *${tlang().title}*`)
                    }
                }
                break
            case 'nsfw':
                {
                    let checkgroup = await prh.findOne({ id: citel.chat })
                    if (!checkgroup) {
                        await new prh({ id: citel.chat, nsfw: "true" })
                            .save()
                        return citel.reply("Successfully Enabled *NSFW*")
                    } else {
                        if (checkgroup.nsfw == "true") return citel.reply("*NSFW* is already enabled")
                        await prh.updateOne({ id: citel.chat }, { nsfw: "true" })
                        citel.reply("Successfully Enabled *NSFW*")
                        return
                    }
                }
                break
            default:
                {
                    citel.reply("Please provide me term like.\n1-events\n2-antilink\n3-nsfw\4-bot\5-economy")
                }
        }
    }
)
