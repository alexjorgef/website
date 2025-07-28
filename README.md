<div align="center">
  <a href="https://alexjorgef.com/">
    <img src="https://gateway.pinata.cloud/ipfs/QmUQFG2KcNY6s7h1CaTM79pz5VKzzF23397MzMwvLWZnZB" alt="logo" width="250" />
  </a>
</div>

---

Source code of my personal website.

## Development

```bash
nvm use
yarn
yarn dev
```

## Testing

Lint:

```bash
yarn lint
```

Unit tests:

```bash
yarn test:ci
```

End-to-end tests:

```bash
yarn playwright:init
yarn e2e:build
```

## License

All code is licensed under the [GPL-3.0-only](https://spdx.org/licenses/GPL-3.0-only.html), see [full license](LICENSE).

```text
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 of the License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
