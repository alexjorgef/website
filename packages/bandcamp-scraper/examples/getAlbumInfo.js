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

const albumUrl = 'http://musique.coeurdepirate.com/album/blonde'
bandcamp.getAlbumInfo(albumUrl, function (error, albumInfo) {
  if (error) {
    console.log(error)
  } else {
    console.log(albumInfo)
  }
})

/*
{ artist: 'Cœur de pirate',
  title: 'Blonde',
  imageUrl: 'https://f4.bcbits.com/img/a1328452291_2.jpg',
  tracks:
   [ { name: 'Lève les voiles',
       url: 'http://musique.coeurdepirate.com/track/l-ve-les-voiles',
       duration: '01:12' },
     { name: 'Adieu',
       url: 'http://musique.coeurdepirate.com/track/adieu',
       duration: '02:27' },
     { name: 'Danse et danse',
       url: 'http://musique.coeurdepirate.com/track/danse-et-danse',
       duration: '03:10' },
     { name: 'Golden Baby',
       url: 'http://musique.coeurdepirate.com/track/golden-baby',
       duration: '03:07' },
     { name: 'Ava',
       url: 'http://musique.coeurdepirate.com/track/ava',
       duration: '03:16' },
     { name: 'Loin d\'ici',
       url: 'http://musique.coeurdepirate.com/track/loin-dici',
       duration: '02:43' },
     { name: 'Les amours dévouées',
       url: 'http://musique.coeurdepirate.com/track/les-amours-d-vou-es',
       duration: '02:27' },
     { name: 'Place de la République',
       url: 'http://musique.coeurdepirate.com/track/place-de-la-r-publique',
       duration: '04:11' },
     { name: 'Cap Diamant',
       url: 'http://musique.coeurdepirate.com/track/cap-diamant',
       duration: '02:43' },
     { name: 'Verseau',
       url: 'http://musique.coeurdepirate.com/track/verseau',
       duration: '03:53' },
     { name: 'Saint-Laurent',
       url: 'http://musique.coeurdepirate.com/track/saint-laurent',
       duration: '03:14' },
     { name: 'La petite mort',
       url: 'http://musique.coeurdepirate.com/track/la-petite-mort',
       duration: '03:49' } ],
  raw:
   { current:
      { auto_repriced: null,
        mod_date: '09 Jan 2018 14:59:25 GMT',
        title: 'Blonde',
        purchase_url: null,
        download_desc_id: 2197507589,
        release_date: '07 Nov 2011 00:00:00 GMT',
        purchase_title: null,
        is_set_price: null,
        set_price: 9,
        killed: null,
        featured_track_id: 3647767496,
        upc: '622406642921',
        minimum_price_nonzero: 9,
        require_email: null,
        private: null,
        minimum_price: 9,
        new_date: '19 Sep 2011 15:29:09 GMT',
        id: 838845289,
        credits: 'Réalisation : Howard Bilerman et Béatrice Martin\r\nPrise de son : Howard Bilerman à l’Hôtel2Tango\r\nPrise de son additionnelle : Radwan Moumneh à l’Hôtel2Tango\r\nPrise de son additionnelle pour 4 : François Gueurce au studio Pigalle\r\nPrise de son additionnelle pour 3 : Eric Cheng au studio The Wash ‘N Dry\r\nPrise de son piano : Radwan Moumneh et Martin Léveillé au Studio Revere\r\nPrise de son cordes pour 3, 8 et 12 : Howard Bilerman et Martin Léveillé à l’Hôtel2Tango\r\nMixage :\r\nHoward Bilerman à l’Hôtel2Tango : 1, 6, 7, 9, 11, 12, 13 et 14\r\nEric Cheng au studio The Wash ‘N Dry : 3 et 10\r\nBruno Dejarnac au studio Soyuz : 5 et 8\r\nJulien Delfaud au studio RDPC : 2\r\nPierrick Devin à Good Boy Studio : 4\r\nMatriçage : Marc Thériault – Le Lab Mastering\r\nDirection artistique : Eli Bissonnette\r\nProduction déléguée : Eli Bissonnette, assisté de Jeanne Joly et Laurie Boisvert\r\nPhotographie : Clara Palardy\r\nDesign graphique : Catherine D’Amours',
        require_email_0: null,
        publish_date: '19 Sep 2011 15:29:09 GMT',
        new_desc_format: 1,
        artist: null,
        type: 'album',
        art_id: 1328452291,
        audit: 0,
        selling_band_id: 841522492,
        band_id: 2534369253,
        about: 'Après avoir immortalisé tout un pan de son adolescence dans les chansons pop douces-amères d\'un premier album homonyme, Coeur de pirate s\'attaque aux différentes étapes de la relation amoureuse, d\'où le titre de l\'album, en référence avant tout, à la copine, à l\'amoureuse. L\'album a été enregistré à l\'été 2011 à l\'Hotel2Tango sous la gouverne d\'Howard Bilerman, coréalisateur avec Béatrice Martin.',
        download_pref: 2 },
     is_preorder: null,
     album_is_preorder: null,
     album_release_date: '07 Nov 2011 00:00:00 GMT',
     preorder_count: null,
     hasAudio: true,
     art_id: 1328452291,
     trackinfo:
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ],
     playing_from: 'album page',
     featured_track_id: 3647767496,
     initial_track_num: null,
     packages: [ [Object], [Object] ],
     url: 'http://musique.coeurdepirate.com/album/blonde',
     defaultPrice: 7,
     freeDownloadPage: null,
     FREE: 1,
     PAID: 2,
     artist: 'Cœur de pirate',
     item_type: 'album',
     id: 838845289,
     last_subscription_item: null,
     has_discounts: null,
     is_bonus: null,
     play_cap_data: { streaming_limit: 3, streaming_limits_enabled: true },
     client_id_sig: null,
     is_purchased: null,
     items_purchased: null,
     is_private_stream: null,
     is_band_member: null,
     licensed_version_ids: null,
     tralbum_collect_info: { show_collect: true } },
     url: 'http://musique.coeurdepirate.com/album/blonde'
   }
*/
