import { PropTypes } from "prop-types"
import { useLocation } from "react-router-dom";
import Button from './Button'

const Header = ({title, onAdd, showAdd}) => {
    const localization = useLocation()
    
    return (
        <header className="header">
            {/* <h1 style={headingStyle}>{props.title}</h1> */}
            <h1>{title}</h1>
            {localization.pathname == '/' && <Button 
                color={!showAdd ? 'green' : 'grey'} 
                text={!showAdd ? 'Add' : 'Close'}
                onClick={onAdd} />}
        </header>
    )
}

Header.defaultProps = {
    title: 'Task Tracker'
}

Header.propType = {
    title: PropTypes.string.isRequired,
}

const headingStyle = {
    color: 'red',
    backgroundColor: 'black'
}

export default Header