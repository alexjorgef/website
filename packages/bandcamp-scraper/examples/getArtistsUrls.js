/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3 of the License.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * Copyright (C) 2022  Lennart Jörgens
 * Copyright (C) 2022  Alexandre Ferreira
 */

const bandcamp = require('../lib/index')

const labelUrl = 'https://randsrecords.bandcamp.com'
bandcamp.getArtistUrls(labelUrl, function (error, artistsUrls) {
  if (error) {
    console.log(error)
  } else {
    console.log(artistsUrls)
  }
})

/*
[
  'https://paulwhite.bandcamp.com/?label=999120622&tab=artists',
  'https://spacedimensioncontroller.bandcamp.com/?label=999120622&tab=artists',
  'https://lone.bandcamp.com/?label=999120622&tab=artists',
  'https://djrum.bandcamp.com/?label=999120622&tab=artists',
  'https://sportinglife.bandcamp.com/?label=999120622&tab=artists',
  'https://maghreban.bandcamp.com/?label=999120622&tab=artists',
  'https://lakker.bandcamp.com/?label=999120622&tab=artists',
  'https://paulatemple.bandcamp.com/?label=999120622&tab=artists',
  'https://talaboman.bandcamp.com/?label=999120622&tab=artists',
  'https://benjamindamage.bandcamp.com/?label=999120622&tab=artists',
  'https://tessela.bandcamp.com/?label=999120622&tab=artists',
  'https://blondes.bandcamp.com/?label=999120622&tab=artists',
  'https://michelemininni.bandcamp.com/?label=999120622&tab=artists',
  'https://alexsmoke.bandcamp.com/?label=999120622&tab=artists',
  'https://unknownarchetype.bandcamp.com/?label=999120622&tab=artists',
  'https://adakaleh.bandcamp.com/?label=999120622&tab=artists',
  'https://slackk.bandcamp.com/?label=999120622&tab=artists',
  'https://moire.bandcamp.com/?label=999120622&tab=artists',
  'https://blawan.bandcamp.com/?label=999120622&tab=artists',
  'https://teengirlfantasy.bandcamp.com/?label=999120622&tab=artists',
  'https://secondstoreyappleblim.bandcamp.com/?label=999120622&tab=artists',
  'https://primitiveworld.bandcamp.com/?label=999120622&tab=artists',
  'https://nonkeen.bandcamp.com/?label=999120622&tab=artists',
  'https://bluedaisy.bandcamp.com/?label=999120622&tab=artists',
  'https://yaksound.bandcamp.com/?label=999120622&tab=artists',
  'https://struction.bandcamp.com/?label=999120622&tab=artists',
  'https://lostsoulsofsaturn.bandcamp.com/?label=999120622&tab=artists',
  'https://afriqua.bandcamp.com/?label=999120622&tab=artists',
  'https://untoldhemlock.bandcamp.com/?label=999120622&tab=artists',
  'https://acidmondays.bandcamp.com/?label=999120622&tab=artists',
  'https://airhead.bandcamp.com/?label=999120622&tab=artists',
  'https://music.maartenvandervleuten.com/?label=999120622&tab=artists',
  'https://taleofus.bandcamp.com/?label=999120622&tab=artists',
  'https://karimsahraoui.bandcamp.com/?label=999120622&tab=artists',
  'https://nicolasjaar.bandcamp.com/?label=999120622&tab=artists',
  'https://marielito.bandcamp.com/?label=999120622&tab=artists',
  'https://hermetics.bandcamp.com/?label=999120622&tab=artists',
  'https://gabriels.bandcamp.com/?label=999120622&tab=artists',
  'https://shcaa.bandcamp.com/?label=999120622&tab=artists',
  'https://benhayes.bandcamp.com/?label=999120622&tab=artists',
  'https://6siss.bandcamp.com/?label=999120622&tab=artists',
  'https://more-time.bandcamp.com/?label=999120622&tab=artists',
  'https://bartaub.bandcamp.com/?label=999120622&tab=artists',
  'https://egyptianhiphop.bandcamp.com/?label=999120622&tab=artists',
  'https://yansima.bandcamp.com/?label=999120622&tab=artists',
  'https://futurebeatalliance.bandcamp.com/?label=999120622&tab=artists',
  'https://architecturalrecs.bandcamp.com/?label=999120622&tab=artists',
  'https://sunelectric.bandcamp.com/?label=999120622&tab=artists',
  'https://robertleiner.bandcamp.com/?label=999120622&tab=artists',
  'https://tournesol-apollo.bandcamp.com/?label=999120622&tab=artists',
  'https://joeybeltram-rs.bandcamp.com/?label=999120622&tab=artists',
  'https://kenishii.bandcamp.com/?label=999120622&tab=artists',
  'https://specialrequest187.bandcamp.com/?label=999120622&tab=artists'
]
*/
