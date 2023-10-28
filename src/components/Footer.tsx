import { Box, Link, Text, IconButton, HStack } from '@chakra-ui/react';
import { faGithub, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import FontawesomeIcon from './FontawesomeIcon';

function Footer() {
  return (
    <Box
      bg="blue.500"
      color="white"
      p={4}
      position="sticky"
      bottom="0"
      width="100%"
      textAlign="center"
    >
      <HStack flexWrap={'wrap'} spacing={4} justify="center">
        <Link href="https://github.com/ChukwumaKingsley" isExternal>
          <IconButton
            aria-label="GitHub"
            color="white"
            bg="transparent"
            fontSize="24px"
          >
            <FontawesomeIcon icon={faGithub} />
          </IconButton>
        </Link>
        <Link href="https://x.com/Kingsley_Wizard?t=wYfDrm--FhcBMH3vP2TjmQ&s=09" isExternal>
          <IconButton
            aria-label="Twitter"
            color="white"
            bg="transparent"
            fontSize="24px"
          >
            <FontawesomeIcon icon={faTwitter} />
          </IconButton>
        </Link>
        <Link href="https://wa.me/+2348160857249" isExternal>
          <IconButton
            aria-label="WhatsApp"
            color="white"
            bg="transparent"
            fontSize="24px"
          >
            <FontawesomeIcon icon={faWhatsapp} />
          </IconButton>
        </Link>
        <Text>+2348160857249</Text>
        <Link href="mailto:chukwuma.c.kingsley@gmail.com" isExternal>
          <Text>chukwuma.c.kingsley@gmail.com</Text>
        </Link>
      </HStack>
    </Box>
  );
}

export default Footer;
