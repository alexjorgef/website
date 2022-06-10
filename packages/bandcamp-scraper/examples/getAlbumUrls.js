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

const artistUrl = 'http://musique.coeurdepirate.com/'
bandcamp.getAlbumUrls(artistUrl, function (error, albumUrls) {
  if (error) {
    console.log(error)
  } else {
    console.log(albumUrls)
  }
})

/*
[ 'http://musique.coeurdepirate.com/album/roses',
  'http://musique.coeurdepirate.com/album/carry-on-2',
  'http://musique.coeurdepirate.com/album/oublie-moi-carry-on',
  'http://musique.coeurdepirate.com/album/child-of-light',
  'http://musique.coeurdepirate.com/album/trauma',
  'http://musique.coeurdepirate.com/album/blonde',
  'http://musique.coeurdepirate.com/album/coeur-de-pirate',
  'http://musique.coeurdepirate.com/album/comme-des-enfants-version-originale-et-remix-par-le-matos' ]
*/
