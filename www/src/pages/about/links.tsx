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
import { PageProps } from "gatsby"
import {
  Container,
  Stack,
  Text,
  Grid,
  Divider,
  HStack,
  VStack,
  useColorMode,
  IconButton,
  Link as ExternalLink,
} from "@chakra-ui/react"
import {
  FaGitlab,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaStackOverflow,
  FaTelegram,
  FaKey,
  FaEnvelope,
  FaAddressCard,
} from "react-icons/fa"
import { SiWakatime } from "react-icons/si"
import { Layout } from "../../components/blocks/layout"
import { SkipNavContent } from "../../components/a11y/skip-nav"
import { Heading } from "../../components/typography/heading"
import { Link } from "../../components/link"
import { space } from "../../constants/space"
import { SEO } from "../../components/seo"
import { useSiteMetadata } from "../../hooks/use-site-metadata"

const Links: React.FC<PageProps> = () => {
  const { colorMode } = useColorMode()
  const isLight = colorMode === `light`
  const meta = useSiteMetadata()

  return (
    <Layout>
      <SEO title="Links" breadcrumbListItems={[{ name: `Links`, url: `/links` }]} />
      <SkipNavContent>
        <Container py={space.paddingMedium}>
          <Stack spacing="20" align="left">
            <Stack spacing="3" align="left">
              <Heading as="h1">Links</Heading>
              <Text variant="prominent" textAlign="left">
                Here you can find some links about me.
              </Text>
              <Divider mt={4} orientation="horizontal" />
            </Stack>
            <Grid
              gridTemplateColumns={[`1fr`, null, `repeat(1, 1fr)`]}
              gap={8}
              width={[`100%`, null, null, `calc(100% + 3rem)`]}
            >
              <Container px={0}>
                <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(1, 1fr)" gap={8}>
                  <VStack spacing="16px" align="left">
                    <Container px={0}>
                      <Heading as="h2">Social Media</Heading>
                      <HStack spacing="32px">
                        <ExternalLink ml="8px" href={`https://www.linkedin.com/in/${meta.linkedin}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="LinkedIn"
                            fontSize="48px"
                            size="lg"
                            icon={<FaLinkedin />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`https://github.com/${meta.github}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="GitHub"
                            fontSize="48px"
                            size="lg"
                            icon={<FaGithub />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`https://gitlab.com/${meta.gitlab}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="GitLab"
                            fontSize="48px"
                            size="lg"
                            icon={<FaGitlab />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`https://instagram.com/${meta.instagram}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="Instagram"
                            fontSize="48px"
                            size="lg"
                            icon={<FaInstagram />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`https://stackoverflow.com/users/${meta.stackoverflow}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="StackOverflow"
                            fontSize="48px"
                            size="lg"
                            icon={<FaStackOverflow />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`https://wakatime.com/${meta.wakatime}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="Wakatime"
                            fontSize="48px"
                            size="lg"
                            icon={<SiWakatime />}
                          />
                        </ExternalLink>
                      </HStack>
                    </Container>
                    <Container px={0}>
                      <Heading as="h2" mt="58px">
                        Contact
                      </Heading>
                      <HStack spacing="32px">
                        <ExternalLink ml="8px" href={`https://t.me/${meta.telegram}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="Telegram"
                            fontSize="48px"
                            size="lg"
                            icon={<FaTelegram />}
                          />
                        </ExternalLink>
                        <ExternalLink ml="8px" href={`mailto:${meta.siteAuthorEmail}`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="Email"
                            fontSize="48px"
                            size="lg"
                            icon={<FaEnvelope />}
                          />
                        </ExternalLink>
                        <Link ml="8px" to={`/vcard.vcf`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="Contact Card"
                            fontSize="48px"
                            size="lg"
                            icon={<FaAddressCard />}
                          />
                        </Link>
                        <Link ml="8px" to={`/pgp.asc`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="PGP Key"
                            fontSize="48px"
                            size="lg"
                            icon={<FaKey />}
                          />
                        </Link>
                        <Link ml="8px" to={`/ssh.pub`}>
                          <IconButton
                            variant="ghost"
                            color="textMuted"
                            colorScheme="gray"
                            _hover={{ color: isLight ? `black` : `white` }}
                            aria-label="SSH Key"
                            fontSize="48px"
                            size="lg"
                            icon={<FaKey />}
                          />
                        </Link>
                      </HStack>
                    </Container>
                  </VStack>
                </Grid>
              </Container>
            </Grid>
          </Stack>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Links
