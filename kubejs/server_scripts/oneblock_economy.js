const ACT_INFO = {
  1:  { name: 'Act I: A Speck of Life', next: 50, mobs: 'None (Safe Zone)', blocks: 'Grass, Dirt, Oak/Birch Logs, Andesite, Clay' },
  2:  { name: 'Act II: The Kinetic Era', next: 125, mobs: 'Sheep, Chicken, Zombie', blocks: 'Stone, Coal, Copper, Zinc, Iron' },
  3:  { name: 'Act III: Harvest, Vinery & Pastures', next: 225, mobs: 'Cow, Pig, Bee, Skeleton', blocks: 'Rich Soil, Clay, Logs, Iron, Copper' },
  4:  { name: 'Act IV: Loyal Companions & Doggy Talents', next: 350, mobs: 'Wolf, Cat, Fox, Parrot, Axolotl', blocks: 'Moss, Oak Logs, Wool, Hay, Bone Blocks' },
  5:  { name: 'Act V: Mekanism & Metallurgy', next: 500, mobs: 'Creeper, Spider', blocks: 'Osmium, Tin, Lead, Fluorite, Uranium' },
  6:  { name: 'Act VI: Brass, Steam & Diesel Power', next: 675, mobs: 'Blaze, Zombified Piglin', blocks: 'Deepslate, Obsidian, Netherrack, Quartz, Scoria' },
  7:  { name: 'Act VII: Digital AE2 & Applied Mekanistics', next: 850, mobs: 'Enderman', blocks: 'Sky Stone, Certus Quartz, Deepslate Diamond' },
  8:  { name: 'Act VIII: Sky-Ships & Waystone Portals', next: 1050, mobs: 'None (Aerospace Build)', blocks: 'Andesite/Brass Casings, Wool, Copper, Obsidian' },
  9:  { name: 'Act IX: Arcane, Relics & Exotic Pets', next: 1275, mobs: 'Allay, Sniffer, Armadillo, Witch', blocks: 'Bookshelves, Sculk, Amethyst, Suspicious Sand' },
  10: { name: 'Act X: Inter-Island Sky-Rails & Trade', next: 1525, mobs: 'Villager, Iron Golem', blocks: 'Railway Casings, Brass Casings, Copper Blocks' },
  11: { name: 'Act XI: Nuclear Fission & End Realms', next: 1800, mobs: 'Shulker', blocks: 'End Stone, Deep Uranium, Crying Obsidian' },
  12: { name: 'Act XII: Cybernetics, Lua & Lasers', next: 2100, mobs: 'Breeze', blocks: 'Redstone/Osmium/Fluix Blocks, Copper Bulbs' },
  13: { name: 'Act XIII: Antimatter & Quantum Forge', next: 2450, mobs: 'Ravager', blocks: 'Diamond/Emerald Blocks, Refined Obsidian' },
  14: { name: 'Act XIV: Biome Terraforming & Wildlife', next: 2850, mobs: 'Panda, Frog, Camel', blocks: 'Moss, Cherry Logs, Podzol, Mycelium, Packed Ice' },
  15: { name: 'Act XV: Chipped Architecture & Megabuilds', next: 3300, mobs: 'Evoker', blocks: 'Brass/Quartz/Emerald/Gold Vaults' },
  16: { name: 'Act XVI: Stellar Fusion & Void Gates', next: 3800, mobs: 'Wither Skeleton', blocks: 'Uranium/Fluorite Blocks, Netherite Blocks' },
  17: { name: 'Act XVII: Abyssal Bedrock Crust', next: 4350, mobs: 'Piglin Brute', blocks: 'Reinforced Deepslate, Ancient Debris, Netherite' },
  18: { name: 'Act XVIII: Chronos & Deep Dark Rift', next: 4950, mobs: 'Warden (DANGER!)', blocks: 'Reinforced Deepslate, Fluix/Osmium Blocks' },
  19: { name: 'Act XIX: Celestial Crucible', next: 5600, mobs: 'Phantom', blocks: 'Diamond/Emerald/Netherite Vaults' },
  20: { name: 'Act XX: Astral Starforge', next: 6300, mobs: 'Elder Guardian', blocks: 'Sea Lanterns, Prismarine, Beacons, Uranium' },
  21: { name: 'Act XXI: Trial Vault & Ominous Core', next: 7050, mobs: 'Ominous Breeze', blocks: 'Heavy Cores, Oxidized Copper Bulbs, Tuff Bricks' },
  22: { name: 'Act XXII: Mythic Beast & Apex Tamer', next: 7850, mobs: 'Mooshroom, Strider, Glow Squid, Llama', blocks: 'Mycelium, Shroomlights, Honeycomb, Gold Blocks' },
  23: { name: 'Act XXIII: Void Sovereign Eclipse', next: 8700, mobs: 'Wither Skeleton', blocks: 'Reinforced Deepslate, Sculk Shriekers, Netherite' },
  24: { name: 'Act XXIV: Infinite Omega Singularity', next: 0, mobs: 'Iron Golem', blocks: 'Ancient Debris, Netherite, Heavy Cores, Beacons' }
}

function handleManualClick(player, level) {
  let server = level.server
  if (!server) return
  let sb = server.scoreboard
  let countObj = sb.getObjective('ob_count')
  let phaseObj = sb.getObjective('ob_phase')
  let blocks = 0
  let phase = 1

  let px = Math.floor(player.x)
  let pz = Math.floor(player.z)
  let coreX = Math.round(px / 1024) * 1024

  let markers = level.getEntitiesWithin(AABB.of(coreX - 2, 63, -2, coreX + 3, 66, 3))
  markers.forEach(e => {
    if (e.tags.contains('ob_core')) {
      blocks = countObj ? sb.getOrCreatePlayerScore(e, countObj).get() : 0
      let pVal = phaseObj ? sb.getOrCreatePlayerScore(e, phaseObj).get() : 1
      if (pVal > 0) phase = pVal
    }
  })

  let info = ACT_INFO[phase] || ACT_INFO[1]
  let nextInfo = ACT_INFO[phase + 1]

  player.tell(Text.of('=================================================='))
  player.tell(Text.of(`✦ ACT FIELD MANUAL — ${info.name.toUpperCase()} ✦`))
  player.tell(Text.of(`• Core Block Pool: ${info.blocks}`))
  player.tell(Text.of(`• Active Core Mobs: ${info.mobs}`))
  if (nextInfo) {
    player.tell(Text.of(`• Next Milestone (${info.next} blocks): ${nextInfo.name}`))
    player.tell(Text.of(`  └ Unlocks: ${nextInfo.blocks} | Mobs: ${nextInfo.mobs}`))
  } else {
    player.tell(Text.of('• MAX ACT REACHED: Infinite Omega Singularity Active!'))
  }
  let densityTier = phase >= 16 ? 'Tier IV: Abyssal Density' : phase >= 11 ? 'Tier III: Heavy Crust' : phase >= 5 ? 'Tier II: Hardened Ore' : 'Tier I: Soft Surface'
  player.tell(Text.of(`• Act Progress: Mined ${blocks} blocks | Core: ${densityTier}`))
  player.tell(Text.of('=================================================='))
  server.runCommandSilent(`playsound minecraft:item.book.page_turn block ${player.username} ${px} 64 ${pz} 0.8 1.2`)
}

ItemEvents.rightClicked('kubejs:act_manual', event => {
  const { player, level, hand } = event
  if (String(hand).toUpperCase() != 'MAIN_HAND') return
  handleManualClick(player, level)
})

PlayerEvents.loggedIn(event => {
  let { player } = event
  if (!player.stages.has('has_manual')) {
    player.give('kubejs:act_manual')
    player.stages.add('has_manual')
  } else if (!player.inventory.has('kubejs:act_manual')) {
    player.give('kubejs:act_manual')
  }
})

PlayerEvents.respawned(event => {
  let { player } = event
  player.give('kubejs:act_manual')
})
EntityEvents.death('minecraft:player', event => {
  const player = event.entity
  player.inventory.allItems.forEach(item => {
    if (item.id == 'kubejs:act_manual') {
      item.count = 0
    }
  })
})

ServerEvents.recipes(event => {
  // Stage 1: Superheated Mixing -> Sky-Alloy Blend (Create 6.0.10 native JSON)
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'superheated',
    ingredients: [
      { item: 'create:brass_ingot' },
      { item: 'create:brass_ingot' },
      { item: 'mekanism:ingot_osmium' },
      { item: 'mekanism:ingot_osmium' },
      { item: 'minecraft:obsidian' },
      { item: 'minecraft:diamond' },
      { type: 'neoforge:single', amount: 500, fluid: 'minecraft:lava' }
    ],
    results: [{ id: 'kubejs:sky_alloy_blend' }]
  })

  // Stage 2: Mechanical Pressing -> Pressed Sky-Plate
  event.custom({
    type: 'create:pressing',
    ingredients: [{ item: 'kubejs:sky_alloy_blend' }],
    results: [{ id: 'kubejs:pressed_sky_plate' }]
  })

  // Stage 3: Superheated Basin Compacting -> Compressed Singularity Core
  event.custom({
    type: 'create:compacting',
    heat_requirement: 'superheated',
    ingredients: [
      { item: 'kubejs:pressed_sky_plate' },
      { item: 'kubejs:pressed_sky_plate' },
      { item: 'kubejs:pressed_sky_plate' },
      { item: 'kubejs:pressed_sky_plate' },
      { item: 'create:sturdy_sheet' },
      { item: 'create:sturdy_sheet' },
      { item: 'minecraft:diamond_block' }
    ],
    results: [{ id: 'kubejs:singularity_core' }]
  })

  // Stage 4: 5x5 Mechanical Crafting -> Sky Token
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: false,
    category: 'misc',
    key: {
      S: { item: 'kubejs:pressed_sky_plate' },
      P: { item: 'create:precision_mechanism' },
      B: { item: 'create:brass_block' },
      C: { item: 'create:railway_casing' },
      R: { item: 'create:blaze_cake' },
      D: { item: 'kubejs:singularity_core' }
    },
    pattern: [
      'SSPSS',
      'BCRCB',
      'PRDRP',
      'BCRCB',
      'SSPSS'
    ],
    result: { count: 1, id: 'kubejs:sky_token' },
    show_notification: false
  })

  // Stage 5: Superheated Mixing -> Architect Alloy
  event.custom({
    type: 'create:mixing',
    heat_requirement: 'superheated',
    ingredients: [
      { item: 'kubejs:sky_token' },
      { item: 'kubejs:sky_token' },
      { item: 'create:blaze_cake' },
      { item: 'create:blaze_cake' },
      { item: 'mekanism:ingot_refined_obsidian' },
      { item: 'mekanism:ingot_refined_obsidian' },
      { item: 'minecraft:nether_star' },
      { type: 'neoforge:single', amount: 1000, fluid: 'minecraft:lava' }
    ],
    results: [{ id: 'kubejs:architect_alloy' }]
  })

  // Stage 6: Mechanical Pressing -> Pressed Architect Plate
  event.custom({
    type: 'create:pressing',
    ingredients: [{ item: 'kubejs:architect_alloy' }],
    results: [{ id: 'kubejs:pressed_architect_plate' }]
  })

  // Stage 7: 5x5 Mechanical Crafting -> Master Architect Token
  event.custom({
    type: 'create:mechanical_crafting',
    accept_mirrored: false,
    category: 'misc',
    key: {
      N: { item: 'minecraft:netherite_block' },
      P: { item: 'kubejs:pressed_architect_plate' },
      C: { item: 'kubejs:singularity_core' },
      S: { item: 'create:steam_engine' },
      T: { item: 'kubejs:sky_token' },
      E: { item: 'create:electron_tube' },
      A: { item: 'create:mechanical_arm' },
      M: { item: 'minecraft:nether_star' }
    },
    pattern: [
      'NPCPN',
      'STEAM',
      'TCMCT',
      'MAETS',
      'NPCPN'
    ],
    result: { count: 1, id: 'kubejs:architect_token' },
    show_notification: false
  })

  event.shaped('kubejs:biome_prism', [
    'ASA',
    'GEG',
    'ASA'
  ], {
    A: 'minecraft:amethyst_shard',
    S: '#minecraft:saplings',
    G: 'minecraft:glass',
    E: 'minecraft:emerald'
  })

  event.shaped('kubejs:biome_surveyor', [
    'GCG',
    'CEC',
    'GCG'
  ], {
    C: 'minecraft:compass',
    E: 'minecraft:ender_eye',
    G: 'minecraft:gold_ingot'
  })

  event.shapeless('8x kubejs:sky_token', ['kubejs:architect_token'])
})

BlockEvents.broken(event => {
  const { block, player, level } = event
  if (!player) return
  if (block.y == 64 && block.z == 0 && (block.x % 1024 == 0)) {
    let sb = level.server.scoreboard
    let phaseObj = sb.getObjective('ob_phase')
    let phase = 1
    let markers = level.getEntitiesWithin(AABB.of(block.x - 1, 63, -1, block.x + 2, 66, 2))
    markers.forEach(e => {
      if (e.tags.contains('ob_core') && phaseObj) {
        phase = sb.getOrCreatePlayerScore(e, phaseObj).get()
      }
    })
    if (phase >= 16) {
      player.potionEffects.add('minecraft:mining_fatigue', 50, 2, false, false)
    } else if (phase >= 11) {
      player.potionEffects.add('minecraft:mining_fatigue', 40, 1, false, false)
    } else if (phase >= 5) {
      player.potionEffects.add('minecraft:mining_fatigue', 30, 0, false, false)
    }
  }
})


const BIOME_CYCLE = [
  { id: 'minecraft:cherry_grove', name: 'Cherry Grove' },
  { id: 'minecraft:meadow', name: 'Alpine Meadow' },
  { id: 'minecraft:bamboo_jungle', name: 'Bamboo Jungle' },
  { id: 'minecraft:taiga', name: 'Snowy Pine Taiga' },
  { id: 'minecraft:desert', name: 'Sunlit Desert' },
  { id: 'minecraft:mushroom_fields', name: 'Mycelium Sanctuary' },
  { id: 'minecraft:flower_forest', name: 'Flower Forest' }
]

// Biome Prism works globally anywhere the player is standing!
ItemEvents.rightClicked('kubejs:biome_prism', event => {
  const { player, item, level } = event
  let pick = BIOME_CYCLE[Math.floor(Math.random() * BIOME_CYCLE.length)]
  let px = Math.floor(player.x)
  let pz = Math.floor(player.z)
  let py = Math.floor(player.y)
  item.count--
  // Fills a 96x384 region centered on player's current X, Z across all Y heights (-64 to 319)
  level.server.runCommandSilent(`fillbiome ${px - 48} -64 ${pz - 48} ${px + 48} 319 ${pz + 48} ${pick.id}`)
  player.tell(Text.of(`[Biome Prism] Globally terraformed 96x96 area around X=${px}, Z=${pz} into ${pick.name}!`))
  level.server.runCommandSilent(`playsound minecraft:block.beacon.activate player ${player.username} ~ ~ ~ 0.7 1.4`)
})

// Biome Surveyor scans nearby blocks and outlines biome borders with particles
ItemEvents.rightClicked('kubejs:biome_surveyor', event => {
  const { player, level } = event
  let px = Math.floor(player.x)
  let py = Math.floor(player.y)
  let pz = Math.floor(player.z)
  
  let currentBiomeKey = level.getBiome(player.blockPosition()).unwrapKey().get().toString()
  player.tell(Text.of(`§a[Biome Surveyor] Current Biome: §e${currentBiomeKey}`))
  
  let bordersFound = 0
  // Scan a 24-block radius around the player for biome transitions
  for (let dx = -24; dx <= 24; dx += 6) {
    for (let dz = -24; dz <= 24; dz += 6) {
      let checkPos = new BlockPos(px + dx, py, pz + dz)
      let bKey = level.getBiome(checkPos).unwrapKey().get().toString()
      if (bKey != currentBiomeKey) {
        bordersFound++
        level.server.runCommandSilent(`particle minecraft:end_rod ${px + dx} ${py + 1} ${pz + dz} 0.1 0.5 0.1 0.02 5`)
      }
    }
  }
  
  if (bordersFound > 0) {
    player.tell(Text.of(`§a[Biome Surveyor] Found and outlined §e${bordersFound}§a biome border points nearby with particles!`))
  } else {
    player.tell(Text.of(`§7[Biome Surveyor] No biome borders detected within 24 blocks. Try moving further out!`))
  }
  level.server.runCommandSilent(`playsound minecraft:block.amethyst_block.chime player ${player.username} ~ ~ ~ 0.8 1.5`)
})

ItemEvents.rightClicked('kubejs:mystery_crate_basic', event => {
  const { player, item, level } = event
  const pool = [
    '8x create:andesite_alloy',
    '4x create:brass_ingot',
    '8x create:track',
    '1x botanypots:terracotta_hopper_botany_pot',
    '2x storagedrawers:oak_full_drawers_2',
    '4x mekanism:ingot_osmium',
    '8x farmersdelight:rich_soil',
    '1x kubejs:biome_prism',
    '1x kubejs:biome_surveyor',
    '8x minecraft:bone',
    '1x minecraft:wolf_armor',
    '16x minecraft:experience_bottle'
  ]
  let pick = pool[Math.floor(Math.random() * pool.length)]
  item.count--
  player.give(pick)
  player.tell(Text.of(`[Supply Crate] You unpacked: ${pick}!`))
  level.server.runCommandSilent(`playsound minecraft:entity.player.levelup player ${player.username} ~ ~ ~ 0.6 1.4`)
})

ItemEvents.rightClicked('kubejs:mystery_crate_tech', event => {
  const { player, item, level } = event
  const pool = [
    '2x create:precision_mechanism',
    '4x mekanism:alloy_atomic',
    '1x ae2:item_storage_cell_16k',
    '2x waystones:waystone',
    '1x mekanism:upgrade_speed',
    '1x mekanism:upgrade_energy',
    '2x minecraft:netherite_ingot',
    '1x minecraft:totem_of_undying',
    '1x kubejs:architect_token'
  ]
  let pick = pool[Math.floor(Math.random() * pool.length)]
  item.count--
  player.give(pick)
  player.tell(Text.of(`[Quantum Crate] You unpacked: ${pick}!`))
  level.server.runCommandSilent(`playsound minecraft:ui.toast.challenge_complete player ${player.username} ~ ~ ~ 0.7 1.3`)
})
