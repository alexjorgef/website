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
bandcamp.getAlbumProducts(albumUrl, function (error, albumProducts) {
  if (error) {
    console.log(error)
  } else {
    console.log(albumProducts)
  }
})

/*
[ { description: 'Includes unlimited streaming via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.La vente de Blonde comprend le téléchargement immédiat de l\'album, dans le format de votre choix.',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Digital Album',
    name: 'Blonde',
    imageUrls: [ 'http://f4.bcbits.com/img/a1328452291_2.jpg' ],
    priceInCents: 900,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Blonde - Édition régulière comprend le téléchargement gratuit de l\'album digital. Veuillez allouer 3 jours ouvrables pour que la version physique vous soit postée.Pour les commandes hors-Canada, vous devez compter de 2 à 4 semaines pour recevoir votre achat. Includes unlimited streaming of Blonde via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Blonde - CD',
    name: 'Blonde - CD',
    imageUrls: [ 'http://f4.bcbits.com/img/0000167149_38.jpg' ],
    priceInCents: 1200,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'L\'édition vinyle de Blonde comprend les 12 pistes de l\'édition régulière, ainsi qu\'une affichette 12x24 po. L\'achat comprend le téléchargement gratuit de l\'album en version régulière.Veuillez allouer 3 jours ouvrables pour que la version physique vous soit postée. Includes unlimited streaming of Blonde via the free Bandcamp app, plus high-quality download in MP3, FLAC and more.',
    soldOut: false,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Blonde - Vinyle',
    name: 'Blonde - Vinyle',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0001476724_38.jpg',
       'http://f4.bcbits.com/img/0001476738_38.jpg',
       'http://f4.bcbits.com/img/0001476726_38.jpg',
       'http://f4.bcbits.com/img/0001476730_38.jpg',
       'http://f4.bcbits.com/img/0001476765_38.jpg' ],
    priceInCents: 1400,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Partitions pour l\'ensemble des titres de l\'album Blonde',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Partitions - Blonde',
    name: 'Partitions - Blonde',
    imageUrls: [ 'http://f4.bcbits.com/img/0000244631_38.jpg' ],
    priceInCents: 2500,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Un lot de 5 cartes postales en édition limitée pour le lancement de Blonde Design : Catherine D\'amours Sérigraphie : Charmant & Courtois Photos : Clara Palardy',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Lot de 5 cartes postales sérigraphiées',
    name: 'Lot de 5 cartes postales sérigraphiées',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000142079_38.jpg',
       'http://f4.bcbits.com/img/0000111338_38.jpg',
       'http://f4.bcbits.com/img/0000106885_38.jpg',
       'http://f4.bcbits.com/img/0000111171_38.jpg',
       'http://f4.bcbits.com/img/0000117528_38.jpg' ],
    priceInCents: 500,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Sac couleur naturelle en coton American Apparel. 36.5 cm x 35.6 cm',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Sac fourre-tout - Ava',
    name: 'Sac fourre-tout - Ava',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000116769_38.jpg',
       'http://f4.bcbits.com/img/0000144873_38.jpg' ],
    priceInCents: 1500,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Cardigan unisexe noir 100 % coton 6 boutons',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Cardigan - Blonde',
    name: 'Cardigan - Blonde',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000153967_38.jpg',
       'http://f4.bcbits.com/img/0000145954_38.jpg' ],
    priceInCents: 2500,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: 'Kangourou unisexe noir 100% coton',
    soldOut: false,
    nameYourPrice: false,
    offerMore: true,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Kangourou avec fermeture éclair "Blonde"',
    name: 'Kangourou avec fermeture éclair "Blonde"',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000168648_38.jpg',
       'http://f4.bcbits.com/img/0000129047_38.jpg' ],
    priceInCents: 2500,
    currency: 'CAD',
    artist: 'Cœur de pirate' },
  { description: '3 macarons à l\'effigie de l\'album Blonde joliment placés sur un carton.',
    soldOut: true,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Other',
    name: 'Ensemble de 3 macarons',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000118673_38.jpg',
       'http://f4.bcbits.com/img/0000153245_38.jpg' ],
    priceInCents: null,
    currency: null,
    artist: 'Cœur de pirate' },
  { description: 'T-shirt American Apparel 50/50 unisexe noir 50% Polyester / 50% Cotton',
    soldOut: true,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'T-Shirt/Apparel',
    name: 'T-shirt - Noir - Blonde T-Shirt/Apparel',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000106475_38.jpg',
       'http://f4.bcbits.com/img/0000122386_38.jpg' ],
    priceInCents: null,
    currency: null,
    artist: 'Cœur de pirate' },
  { description: 'Sac couleur naturelle en coton American Apparel. 36.5 cm x 35.6 cm',
    soldOut: true,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'Other',
    name: 'Sac fourre-tout - Blonde',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000173665_38.jpg',
       'http://f4.bcbits.com/img/0000109871_38.jpg' ],
    priceInCents: null,
    currency: null,
    artist: 'Cœur de pirate' },
  { description: 'American Apparel Tri-Blend - Unisexe - Gris 50% Polyester / 25% Coton / 25% Rayone',
    soldOut: true,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'T-Shirt/Apparel',
    name: 'T-shirt - Mon beau navire - Gris T-Shirt/Apparel',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000141330_38.jpg',
       'http://f4.bcbits.com/img/0000150936_38.jpg' ],
    priceInCents: null,
    currency: null,
    artist: 'Cœur de pirate' },
  { description: 'American Apparel 50/50 - Femme - Abricot 50% coton, 50% polyester',
    soldOut: true,
    nameYourPrice: false,
    offerMore: false,
    url: 'http://musique.coeurdepirate.com/album/blonde',
    format: 'T-Shirt/Apparel',
    name: 'T-shirt - Mon beau navire - Abricot - Femme T-Shirt/Apparel',
    imageUrls:
     [ 'http://f4.bcbits.com/img/0000119146_38.jpg',
       'http://f4.bcbits.com/img/0000138375_38.jpg' ],
    priceInCents: null,
    currency: null,
    artist: 'Cœur de pirate' } ]
*/
