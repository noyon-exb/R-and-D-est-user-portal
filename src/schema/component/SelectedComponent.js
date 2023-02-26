import InputField from './InputField';
import PropTypes from 'prop-types';
import TextArea from './TextArea';

const SelectedComponent = ({ type, component, register }) => {
    switch (type) {
        case 'input':
            return <InputField component={component} register={register} />;
        case 'textarea':
            return <TextArea component={component} register={register} />;
        default:
            return;
    }
};

SelectedComponent.propTypes = {
    type: PropTypes.string.isRequired,
    component: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
};

export default SelectedComponent;
