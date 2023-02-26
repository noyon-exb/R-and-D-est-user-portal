import { HStack, Link, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

export const NavLink = ({ icon, isActive, label, lShow, color, ...rest }) => {
    return (
        <Link
            display="block"
            py={2}
            //my={2}
            fontWeight={500}
            px={3}
            borderRadius="lg"
            lineHeight="150%"
            fontSize={{ lg: '16px', base: '16px' }}
            letterSpacing={-0.1}
            aria-current={isActive ? 'page' : undefined}
            color={color}
            _hover={
                label.length !== 0
                    ? {
                          bg: '#2E384A !important',
                          color: '#FFFFFF',
                      }
                    : ''
            }
            _activeLink={{
                bg: '#2E384A !important',
                color: '#FFFFFF',
            }}
            {...rest}
        >
            <HStack spacing={3}>
                {lShow.length > 0 && isActive ? <Text>{lShow}</Text> : icon}
                {label !== '' && (
                    <Text as="span" pt="4px">
                        {label}
                    </Text>
                )}
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
