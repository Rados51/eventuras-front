import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { EventDto, EventsService } from '@losol/eventuras';
import { EventCard, Layout, Loading } from 'components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import getT from 'next-translate/getT';
import { LocalesType } from 'types';

type IndexProps = {
  events: EventDto[];
  locales: LocalesType;
};

export default function Index(props: IndexProps) {
  const { events, locales } = props;
  const { demoTitleLocale, demoTextLocale } = locales.component;
  const { eventsTitle } = locales.common;
  const { locale } = useRouter();

  return (
    <>
      <Head>
        <title>Eventuras</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main>
          <Box margin="8">
            <Heading as="h2" marginTop="16" marginBottom="4">
              {demoTitleLocale} {locale?.toUpperCase()}
            </Heading>
            <Text>{demoTextLocale}</Text>
          </Box>

          <Box margin="8">
            {!events && <Loading />}
            {events.length !== 0 && (
              <>
                <Heading as="h2" marginTop="16" marginBottom="4">
                  {eventsTitle}
                </Heading>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing="5">
                  {events.map((event: EventDto) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </SimpleGrid>
              </>
            )}
          </Box>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  const events = await EventsService.getV3Events({}).catch(() => {
    return { data: [] };
  });

  // Locales
  const translateComponent = await getT(locale, 'index');
  const demoTitleLocale = translateComponent('demoTitle');
  const demoTextLocale = translateComponent('demoText');

  const translateCommon = await getT(locale, 'common');
  const eventsTitle = translateCommon('events');

  return {
    props: {
      events: events.data,
      locales: {
        component: {
          demoTitleLocale,
          demoTextLocale,
        },
        common: {
          eventsTitle,
        },
      },
    },
    revalidate: 1, // In seconds
  };
}
