import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input } from '@chakra-ui/react';

function IndividualIndicator({ indicator, selectedList, setSelectedList }) {
    const [isCheckedIndicators, setCheckedIndicators] = useState(false);

    const onClickHandler = () => {
        if (isCheckedIndicators === false) {
            setCheckedIndicators(true);
            const newSelectedList = [
                ...selectedList,
                {
                    id: indicator.id,
                    key: indicator.key,
                    value: indicator.value,
                },
            ];
            setSelectedList(newSelectedList);
            //console.log(newSelectedList);
        } else if (isCheckedIndicators === true) {
            setCheckedIndicators(false);
            const newSelectedList = selectedList.filter(
                ind => ind.id != indicator.id
            );
            setSelectedList(newSelectedList);
        }
    };
    return (
        <>
            <Checkbox
                isChecked={isCheckedIndicators}
                onChange={onClickHandler}
                mr="20px"
            />
            <Input readOnly defaultValue={indicator.key} w="310px" mr="20px" />
            <Input readOnly defaultValue={indicator.value} w="125px" />
        </>
    );
}

IndividualIndicator.propTypes = {
    indicator: PropTypes.array.isRequired,
    selectedList: PropTypes.array.isRequired,
    setSelectedList: PropTypes.func.isRequired,
};

export default IndividualIndicator;
