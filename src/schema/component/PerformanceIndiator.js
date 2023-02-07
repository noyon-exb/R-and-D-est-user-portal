import { Box, Button, Flex, Input } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import IndividualIndicator from './IndividualIndicators';

function PerformanceIndiator({ component, setValue }) {
    const [checkOthers, setCheckOthers] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [otherIndicatorKey, setOtherIndicatorKey] = useState();
    const [otherIndicatorValue, setOtherIndicatorValue] = useState();
    console.log(selectedList);

    useEffect(() => {
        setValue(component.id, selectedList);
    }, [selectedList]);

    return (
        <Box>
            {component.indicators.map((indicator, index) => (
                <Flex key={index} direction="row" p="10px">
                    <IndividualIndicator
                        indicator={indicator}
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                    />
                </Flex>
            ))}
            {component.isExtendable ? (
                <>
                    <Button
                        bg="#111111"
                        color="#FFF"
                        onClick={() => {
                            if (checkOthers === true) setCheckOthers(false);
                            else setCheckOthers(true);
                        }}
                    >
                        {component.extendableComponent.title}{' '}
                    </Button>
                </>
            ) : null}

            {checkOthers ? (
                <Flex direction="row" p="10px">
                    <Input
                        onChange={e => setOtherIndicatorKey(e.target.value)}
                    />
                    <Input
                        onChange={e => setOtherIndicatorValue(e.target.value)}
                    />
                    <Button
                        onClick={() => {
                            if (otherIndicatorKey && otherIndicatorValue) {
                                const newSelectedList = [
                                    ...selectedList,
                                    {
                                        id: 3,
                                        key: otherIndicatorKey,
                                        value: otherIndicatorValue,
                                    },
                                ];
                                setSelectedList(newSelectedList);
                            }
                        }}
                    >
                        Add
                    </Button>
                </Flex>
            ) : null}

            <Box pb="30px" />
        </Box>
    );
}

PerformanceIndiator.propTypes = {
    component: PropTypes.object.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default PerformanceIndiator;
