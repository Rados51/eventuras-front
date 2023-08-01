import { Button, ButtonGroup, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { UserMenu } from 'components';
import { formatLanguageName } from 'helpers';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

const Header = () => {
  const { data: session } = useSession();
  const { locale, locales } = useRouter();
  const { t } = useTranslation('common');
  const { asPath } = useRouter(); // Same page but change language

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('gray.600', 'gray.300')}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          Eventuras
        </Heading>
      </Flex>

      <div>
        <ButtonGroup colorScheme="teal" size="sm" mr={2} variant="ghost">
          {locales?.map(lang => (
<<<<<<< HEAD
            <NextLink
=======
            <Button
>>>>>>> 860bece (refactor: lint all files to new standard)
              key={lang}
              href={asPath}
              locale={lang}
              passHref
              legacyBehavior
            >
              <Button bg={lang === locale ? 'teal.100' : ''}>
                {formatLanguageName(lang)}
              </Button>
            </NextLink>
          ))}
        </ButtonGroup>

        {!session && (
          <Button onClick={() => signIn('auth0')} colorScheme="teal" variant="outline">
            {t('header.auth.login')}
          </Button>
        )}
        {session && <UserMenu signOut={signOut} name={session.user?.name} />}
      </div>
    </Flex>
  );
};

export default Header;
