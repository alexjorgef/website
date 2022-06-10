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
import { Formik, Form, Field } from "formik"
import Recaptcha from "react-google-recaptcha"
import * as Yup from "yup"
import {
  Container,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Button,
  Grid,
  Text,
  Textarea,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { useForm } from "@formspree/react"
import { SEO } from "../components/seo"
import { Layout } from "../components/blocks/layout"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { space } from "../constants/space"

type DataProps = {}

const Contact: React.FC<PageProps<DataProps>> = () => {
  const [sendState, handleSubmit] = useForm(process.env.GATSBY_FORMSPREE_ID)
  const captcha = React.useRef<Recaptcha>(null)
  const toast = useToast()

  React.useEffect(() => {
    if (sendState.succeeded) {
      toast({
        title: `Your message has been sent successfully`,
        description: `I will get back to you as soon as possible, thank you!`,
        status: `success`,
        duration: 6000,
        isClosable: false,
      })
    }
  }, [sendState.succeeded, toast])

  interface ContactFormProps {
    name: string
    email: string
    message: string
    "g-recaptcha-response": string
  }

  const contactSchema = Yup.object({
    name: Yup.string().min(2, `Name is too short!`).max(71, `Name is too long!`),
    email: Yup.string().max(255, `Email is too long!`).email(`Invalid email`).required(`Email is required`),
    message: Yup.string()
      .min(2, `Message is too short!`)
      .max(280, `Message is too long!`)
      .required(`Message is required`),
    "g-recaptcha-response": Yup.string().required(`Robots are not welcome yet!`),
  })

  const initialValues: ContactFormProps = {
    name: ``,
    email: ``,
    message: ``,
    "g-recaptcha-response": ``,
  }

  return (
    <Layout>
      <SEO
        title="Contact"
        description=""
        image="/social/digital-garden.png"
        breadcrumbListItems={[{ name: `Contact`, url: `/contact` }]}
      />
      <SkipNavContent>
        <Container py={space.paddingMedium}>
          <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(2, 1fr)`]} gap={6}>
            <Container>
              <Heading as="h1">Together we're stronger</Heading>
              <Text mt={10} fontSize="lg">
                I am constantly looking for challenging projects.
                <br />
                <br />
                Connect with me via this form or just send me a email to{` `}
                <u>hello@alexjorgef.com</u>
                <br />
                <br />I will be available from Monday to Friday from 10:00AM until 10:00PM UTC+0
              </Text>
            </Container>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                try {
                  handleSubmit(values)
                  actions.resetForm()
                  captcha.current?.reset()
                  actions.setSubmitting(false)
                } catch (err) {
                  toast({
                    title: `Message not sended.`,
                    description: `Something went wrong sending message`,
                    status: `error`,
                    duration: 9000,
                    isClosable: true,
                  })
                }
              }}
              validationSchema={contactSchema}
            >
              {({ setFieldValue }) => (
                <Form>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor="name">Your name</FormLabel>
                        <Input {...field} id="name" placeholder="John Doe" variant="outline" size="md" />
                        {form.errors.name && form.touched.name && (
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.email && form.touched.email}>
                        <FormLabel mt={4} htmlFor="email">
                          Your email
                        </FormLabel>
                        <Input {...field} id="email" placeholder="john@awesome.net" size="md" variant="outline" />
                        {form.errors.email && form.touched.email && (
                          <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  <Field name="message">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.message && form.touched.message}>
                        <FormLabel mt={4} htmlFor="email">
                          Message
                        </FormLabel>
                        <Textarea
                          {...field}
                          id="message"
                          size="md"
                          placeholder="Hi..."
                          variant="outline"
                          height={100}
                        />
                        {!(form.errors.message && form.touched.message) ? (
                          <FormHelperText>Enter the message you'd like to send.</FormHelperText>
                        ) : (
                          <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                        )}
                      </FormControl>
                    )}
                  </Field>
                  <Flex mt={4}>
                    <Field name="g-recaptcha-response">
                      {({ field, form }) => (
                        <FormControl isRequired isInvalid={form.errors.recaptcha && form.touched.recaptcha}>
                          <Recaptcha
                            {...field}
                            ref={captcha}
                            sitekey={process.env.GATSBY_RECAPTCHA_V2_SITE_KEY}
                            onChange={(value) => setFieldValue(`g-recaptcha-response`, value)}
                          />
                          {form.errors.recaptcha && form.touched.recaptcha && (
                            <FormErrorMessage>{form.errors.recaptcha}</FormErrorMessage>
                          )}
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Button
                    mt={4}
                    colorScheme="gray"
                    isLoading={sendState.submitting}
                    loadingText="Sending"
                    spinnerPlacement="start"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </Grid>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Contact
