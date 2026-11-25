ItemEvents.modifyTooltips(event => {
  event.add('kubejs:sky_token', [
    Text.gray('Earned by completing Quests or forged at great expense.'),
    Text.yellow('Spend in the Quest Book Token Market!')
  ])
  event.add('kubejs:architect_token', [
    Text.gray('Awarded for completing Acts, Synergy Branches, and Masteries.'),
    Text.lightPurple('Unlocks high-tier machines, AE2 cells, and rare artifacts!')
  ])
  event.add('kubejs:mystery_crate_basic', [
    Text.yellow('Right-click to open! ').append(Text.gray('Contains Create, Pet, Storage, or Farming loot.'))
  ])
  event.add('kubejs:mystery_crate_tech', [
    Text.yellow('Right-click to open! ').append(Text.gray('Contains Mekanism, AE2, or rare Artifact loot.'))
  ])
  event.add('kubejs:biome_prism', [
    Text.yellow('Right-click anywhere to terraform your surroundings!'),
    Text.aqua('Works globally across any dimension or location!')
  ])
  event.add('kubejs:biome_surveyor', [
    Text.yellow('Right-click to scan nearby biome borders!'),
    Text.green('Outlines biome edges with particles & tells your current biome.')
  ])
  event.add('kubejs:act_manual', [
    Text.yellow('Right-click to open Act Field Manual & Island Telemetry!'),
    Text.red('Disappears on death and automatically respawns.')
  ])
})
