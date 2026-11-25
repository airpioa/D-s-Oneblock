ServerEvents.recipes(event => {
    event.shapeless('minecraft:lava_bucket', ['minecraft:bucket', '#minecraft:coals', '#minecraft:coals', '#minecraft:coals', '#minecraft:coals'])
    event.shapeless('ae2:certus_quartz_crystal', ['minecraft:quartz', 'minecraft:light_blue_dye'])
})

PlayerEvents.loggedIn(event => {
    event.player.tell(Text.gold("✦ Welcome to D's OneBlock Ultimate! Anti-Void and Tiers Active. ✦").bold(true))
    event.server.runCommandSilent(`particle minecraft:totem_of_undying ${event.player.x} ${event.player.y + 1} ${event.player.z} 0.5 0.5 0.5 0.2 40`)
    event.server.runCommandSilent(`playsound minecraft:block.beacon.activate master @a ${event.player.x} ${event.player.y} ${event.player.z} 1.0 1.2`)
})
