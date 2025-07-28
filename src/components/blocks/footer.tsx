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
import { Box, Stack, Flex, Link as ExternalLink, Icon, Divider } from "@chakra-ui/react"
import {
  FaInstagram as InstagramIcon,
  FaGithub as GithubIcon,
  FaGitlab as GitlabIcon,
  FaLinkedin as LinkedinIcon,
  FaRss as RssIcon,
  FaStackOverflow as StackOverflowIcon,
} from "react-icons/fa"
import { Link } from "../link"
import { FullWidthContainer } from "./full-width-container"
import { LangSwitcher } from "./lang-switcher"
import { Toggle } from "./theme-toggle"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

export const Footer: React.FC = () => {
  const meta = useSiteMetadata()

  return (
    <FullWidthContainer variant="dark">
      <Box as="footer" py={16} role="contentinfo">
        <Stack direction="column">
          <Flex flexDirection="column">
            <Flex
              flexDirection={[`column`, `row`]}
              textAlign="center"
              alignItems="center"
              justifyContent="space-between"
              mt="16px"
              rowGap={2}
            >
              <Box>
                &copy; {new Date().getFullYear()} Alexandre Ferreira. <Link to="/privacy-policy">Privacy Policy</Link>.
                {` `}
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
                <ExternalLink href={`https://stackoverflow.com/users/${meta.stackoverflow}`} ml="16px">
                  <Icon fontSize="1.45rem" as={StackOverflowIcon} />
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
          <Divider />
          <Stack mt="6px" direction="row" spacing="8px">
            <Toggle />
            <LangSwitcher />
          </Stack>
        </Stack>
      </Box>
    </FullWidthContainer>
  )
}
