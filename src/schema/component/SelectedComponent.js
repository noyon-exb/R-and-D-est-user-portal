import InputField from './InputField';
import PropTypes from 'prop-types';

const SelectedComponent = ({ type, component, register }) => {
    switch (type) {
        case 'input':
            return <InputField component={component} register={register} />;
    }
};

SelectedComponent.propTypes = {
    type: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
};

export default SelectedComponent;
