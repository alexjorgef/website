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

import * as React from "react"
import { Box, Stack, Flex, Link as ExternalLink, Icon, useColorMode, Divider, Text } from "@chakra-ui/react"
import {
  FaHeart as HeartIcon,
  FaInstagram as InstagramIcon,
  FaGithub as GithubIcon,
  FaGitlab as GitlabIcon,
  FaLinkedin as LinkedinIcon,
  FaRss as RssIcon,
} from "react-icons/fa"
import { SiGatsby as GatsbyIcon } from "react-icons/si"
import { useFooterNavigation } from "../../hooks/use-footer-navigation"
import { Link } from "../link"
import { FullWidthContainer } from "./full-width-container"
import { LangSwitcher } from "./lang-switcher"
import { Toggle } from "./theme-toggle"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export const Footer: React.FC = () => {
  const footerNavigation = useFooterNavigation()
  const { colorMode } = useColorMode()
  const meta = useSiteMetadata()
  const isLight = colorMode === `light`

  return (
    <FullWidthContainer variant="dark">
      <Box as="footer" py={16} role="contentinfo">
        <Stack direction="column" spacing={16}>
          <Flex flexDirection={[`column`, `row`]} flexWrap="wrap" justifyContent="space-between">
            <Flex flexDirection="column" maxWidth="300px">
              <Text fontSize={[`1.125rem`, null, `1.9125rem`]} mb={3}>
                alexjorgef.com
              </Text>
              <Text>
                This is my personal website made with{` `}
                <Icon
                  transition="all 0.4s"
                  color={isLight ? `white` : `textMuted`}
                  _hover={{ color: `#984de2` }}
                  as={GatsbyIcon}
                />
                {` `}
                and{` `}
                <Icon
                  transition="all 0.4s"
                  color={isLight ? `white` : `textMuted`}
                  _hover={{ color: `red` }}
                  as={HeartIcon}
                />
                . Respectfully inspired on{` `}
                <ExternalLink href="https://github.com/LekoArts/portfolio-v2">LekoArts</ExternalLink> code.
              </Text>
              <Flex justifyContent={[`center`, `flex-start`]} mt="16px">
                <LangSwitcher mr={2} />
                <Toggle />
              </Flex>
            </Flex>
            {footerNavigation.map((section) => {
              const { heading } = section
              return (
                <Flex key={heading.name} flexDirection="column" alignItems="flex-start" minWidth="150px" mb={[8, 0]}>
                  {heading.link ? (
                    <Link to={heading.link} p={1} color="white" fontSize={[`1.125rem`, null, `1.3125rem`]}>
                      {heading.name}
                    </Link>
                  ) : (
                    <Box color="white" p={1} fontSize={[`1.125rem`, null, `1.3125rem`]}>
                      {heading.name}
                    </Box>
                  )}
                  <Divider mb={[2, 3]} />
                  <Flex flexDirection={[`row`, `column`]} alignItems="flex-start" flexWrap={[`wrap`, `nowrap`]}>
                    {section.items.map((item) => (
                      <React.Fragment key={item.link}>
                        {item.isExternal ? (
                          <ExternalLink mr={[2, 0]} p={1} href={item.link}>
                            {item.name}
                          </ExternalLink>
                        ) : (
                          <Link mr={[2, 0]} p={1} to={item.link}>
                            {item.name}
                          </Link>
                        )}
                      </React.Fragment>
                    ))}
                  </Flex>
                </Flex>
              )
            })}
          </Flex>
          <Flex flexDirection="column">
            <Divider />
            <Flex
              flexDirection={[`column`, `row`]}
              textAlign="center"
              alignItems="center"
              justifyContent="space-between"
              mt="16px"
              rowGap={2}
            >
              <Box>
                &copy; {new Date().getFullYear()}. <Link to="/privacy-policy">Privacy Policy</Link>.{` `}
                <Link to="/legal-notice">Legal Notice</Link>.
              </Box>
              <Box>
                <ExternalLink href={`https://www.linkedin.com/in/${meta.linkedin}`}>
                  <Icon fontSize="1.45rem" as={LinkedinIcon} />
                </ExternalLink>
                <ExternalLink href={`https://github.com/${meta.github}`} ml="16px">
                  <Icon fontSize="1.45rem" as={GithubIcon} />
                </ExternalLink>
                <ExternalLink href={`https://gitlab.com/${meta.gitlab}`} ml="16px">
                  <Icon fontSize="1.45rem" as={GitlabIcon} />
                </ExternalLink>
                <ExternalLink href={`https://instagram.com/${meta.instagram}`} ml="16px">
                  <Icon fontSize="1.45rem" as={InstagramIcon} />
                </ExternalLink>
                <Link to="/rss.xml" ml="16px">
                  <Icon fontSize="1.45rem" as={RssIcon} />
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </FullWidthContainer>
  )
}
