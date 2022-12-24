import {
    HStack,
    Link,
    Text,
    useColorModeValue as mode,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const NavLink = ({ icon, isActive, label, lShow, color, ...rest }) => {
    return (
        <Link
            display="block"
            py={3}
            px={{ lg: 5, base: 3 }}
            borderRadius="lg"
            lineHeight="1.5rem"
            fontSize={{ lg: '18px', base: '16px' }}
            letterSpacing={-0.1}
            aria-current={isActive && !color ? 'page' : undefined}
            color={color}
            _hover={
                label.length !== 0
                    ? {
                          bg: '#F3F4F6 !important',
                          color: mode('black', 'white'),
                      }
                    : ''
            }
            _activeLink={{
                bg: '#F3F4F6 !important',
                color: mode('#11192B', 'white'),
            }}
            {...rest}
        >
            <HStack spacing={3}>
                {lShow.length > 0 && isActive ? <Text>{lShow}</Text> : icon}
                {label !== '' && <Text as="span">{label}</Text>}
            </HStack>
        </Link>
    );
};

NavLink.propTypes = {
    icon: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    lShow: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default NavLink;
